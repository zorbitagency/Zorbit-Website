import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Ensure uploads and data directories exist
const UPLOADS_DIR = path.resolve(__dirname, 'public', 'uploads');
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// JSON body parser with 50MB limit for high-res base64 image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static uploads and downloads
app.use('/uploads', express.static(UPLOADS_DIR));
const DOWNLOADS_DIR = path.resolve(__dirname, 'public', 'downloads');
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}
app.use('/downloads', express.static(DOWNLOADS_DIR));

// Helper for persisted uploads metadata
const UPLOADS_JSON = path.join(DATA_DIR, 'uploads.json');
const getUploadsList = (): Array<{ id: string; url: string; filename: string; size: number; createdAt: string; title: string }> => {
  try {
    if (fs.existsSync(UPLOADS_JSON)) {
      const data = fs.readFileSync(UPLOADS_JSON, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading uploads.json:', err);
  }
  return [];
};

const saveUploadsList = (list: any[]) => {
  try {
    fs.writeFileSync(UPLOADS_JSON, JSON.stringify(list, null, 2));
  } catch (err) {
    console.error('Error writing uploads.json:', err);
  }
};

// Agency settings file
const SETTINGS_JSON = path.join(DATA_DIR, 'settings.json');
const getAgencySettings = () => {
  try {
    if (fs.existsSync(SETTINGS_JSON)) {
      return JSON.parse(fs.readFileSync(SETTINGS_JSON, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading settings.json:', err);
  }
  return {
    heroImage: '',
    agencyName: 'MONOLITH',
    tagline: 'Marketing Architecture & Exponential Performance',
    contactEmail: 'partnerships@monolith.studio'
  };
};

// API: Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API: Get uploaded images
app.get('/api/uploads', (req: Request, res: Response) => {
  const uploads = getUploadsList();
  res.json({ success: true, count: uploads.length, uploads });
});

// API: Upload an image (base64 data URL or raw binary buffer)
app.post('/api/upload', (req: Request, res: Response) => {
  try {
    const { filename, data, title } = req.body;
    if (!data) {
      return res.status(400).json({ success: false, error: 'No image data provided' });
    }

    // Match data URL prefix (e.g. data:image/png;base64,...)
    const matches = data.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    let extension = 'png';
    let buffer: Buffer;

    if (matches && matches.length === 3) {
      extension = matches[1].toLowerCase() === 'jpeg' ? 'jpg' : matches[1].toLowerCase();
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      // Direct raw base64 string
      buffer = Buffer.from(data, 'base64');
    }

    const cleanBase = (filename || 'asset').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
    const uniqueName = `${cleanBase}_${Date.now()}.${extension}`;
    const targetPath = path.join(UPLOADS_DIR, uniqueName);

    fs.writeFileSync(targetPath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;
    const newEntry = {
      id: `img_${Date.now()}`,
      url: publicUrl,
      filename: uniqueName,
      title: title || cleanBase,
      size: buffer.length,
      createdAt: new Date().toISOString(),
    };

    const currentList = getUploadsList();
    currentList.unshift(newEntry);
    saveUploadsList(currentList);

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully to server backend',
      asset: newEntry,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Failed to upload image' });
  }
});

// API: Delete an uploaded image
app.delete('/api/uploads/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentList = getUploadsList();
    const itemIndex = currentList.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, error: 'Asset not found' });
    }

    const [removed] = currentList.splice(itemIndex, 1);
    const filePath = path.join(UPLOADS_DIR, removed.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    saveUploadsList(currentList);

    return res.json({ success: true, message: 'Asset removed successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get and update agency settings
app.get('/api/settings', (req: Request, res: Response) => {
  res.json({ success: true, settings: getAgencySettings() });
});

app.post('/api/settings', (req: Request, res: Response) => {
  try {
    const settings = { ...getAgencySettings(), ...req.body };
    fs.writeFileSync(SETTINGS_JSON, JSON.stringify(settings, null, 2));
    res.json({ success: true, settings });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Trigger packaging into GoDaddy zip
app.post('/api/pack-zip', async (req: Request, res: Response) => {
  try {
    const { exec } = await import('child_process');
    const scriptPath = path.resolve(__dirname, 'scripts', 'pack_godaddy.py');
    exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Packaging error:', stderr || error.message);
        return res.status(500).json({ success: false, error: stderr || error.message });
      }
      return res.json({
        success: true,
        message: 'Successfully generated GoDaddy zip and Source zip',
        godaddyZipUrl: '/downloads/godaddy_website_build.zip',
        sourceZipUrl: '/downloads/monolith_agency_source.zip',
        timestamp: new Date().toISOString()
      });
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// API: Download GoDaddy Build Zip
app.get('/api/download/godaddy-zip', (req: Request, res: Response) => {
  const zipPath = path.join(DOWNLOADS_DIR, 'godaddy_website_build.zip');
  if (!fs.existsSync(zipPath)) {
    return res.status(404).json({ success: false, error: 'Package not generated yet. Please run packaging first.' });
  }
  res.download(zipPath, 'godaddy_website_build.zip');
});

// API: Download Source Code Zip
app.get('/api/download/source-zip', (req: Request, res: Response) => {
  const zipPath = path.join(DOWNLOADS_DIR, 'monolith_agency_source.zip');
  if (!fs.existsSync(zipPath)) {
    return res.status(404).json({ success: false, error: 'Source zip not found.' });
  }
  res.download(zipPath, 'monolith_agency_source.zip');
});

// Start server with Vite dev server middleware in development
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MONOLITH Agency server listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
