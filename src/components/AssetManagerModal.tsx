import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Check, Trash2, Link as LinkIcon, Image as ImageIcon, Copy, ArrowRight, Server, RefreshCw } from 'lucide-react';
import { UploadedAsset, CaseStudy } from '../types/index.ts';
import { playSubtleTick } from '../utils/audio.ts';

interface AssetManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: CaseStudy[];
  onAssignToProject: (projectId: string, imageUrl: string) => void;
  onAssignToHero: (imageUrl: string) => void;
  activeHeroImage?: string;
  preselectedProjectId?: string;
}

export const AssetManagerModal: React.FC<AssetManagerModalProps> = ({
  isOpen,
  onClose,
  projects,
  onAssignToProject,
  onAssignToHero,
  activeHeroImage,
  preselectedProjectId,
}) => {
  const [uploads, setUploads] = useState<UploadedAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [targetProject, setTargetProject] = useState<string>(preselectedProjectId || projects[0]?.id || '');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [manualUrlInput, setManualUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (preselectedProjectId) {
      setTargetProject(preselectedProjectId);
    }
  }, [preselectedProjectId]);

  // Fetch current uploaded images from backend
  const fetchUploads = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/uploads');
      if (res.ok) {
        const data = await res.json();
        if (data.uploads) {
          setUploads(data.uploads);
        }
      }
    } catch (err) {
      console.warn('Could not connect to backend upload list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUploads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle file upload to backend
  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      setStatusMessage({ text: `Processing ${file.name}...`, type: 'info' });

      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;

        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name,
              data: base64Data,
              title: file.name.replace(/\.[^/.]+$/, ''),
            }),
          });

          const json = await res.json();
          if (res.ok && json.success) {
            setStatusMessage({ text: `Uploaded successfully: ${json.asset.filename}`, type: 'success' });
            playSubtleTick();
            // Automatically refresh list
            fetchUploads();

            // If a preselected project exists, offer auto-assign
            if (targetProject) {
              onAssignToProject(targetProject, json.asset.url);
            }
          } else {
            // Fallback for standalone preview
            const fallbackAsset: UploadedAsset = {
              id: `local_${Date.now()}`,
              url: base64Data,
              filename: file.name,
              title: file.name,
              size: file.size,
              createdAt: new Date().toISOString(),
            };
            setUploads((prev) => [fallbackAsset, ...prev]);
            setStatusMessage({ text: 'Loaded image locally (Backend fallback)', type: 'success' });
            if (targetProject) {
              onAssignToProject(targetProject, base64Data);
            }
          }
        } catch (err: any) {
          // If server call fails, still allow local base64 fallback so user is never blocked
          const fallbackAsset: UploadedAsset = {
            id: `local_${Date.now()}`,
            url: base64Data,
            filename: file.name,
            title: file.name,
            size: file.size,
            createdAt: new Date().toISOString(),
          };
          setUploads((prev) => [fallbackAsset, ...prev]);
          setStatusMessage({ text: 'Using client-side image storage', type: 'info' });
          if (targetProject) {
            onAssignToProject(targetProject, base64Data);
          }
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploading(false);
      setStatusMessage({ text: err.message || 'Upload failed', type: 'error' });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const handleDeleteAsset = async (id: string) => {
    try {
      playSubtleTick();
      if (!id.startsWith('local_')) {
        await fetch(`/api/uploads/${id}`, { method: 'DELETE' });
      }
      setUploads((prev) => prev.filter((item) => item.id !== id));
      setStatusMessage({ text: 'Asset removed from media registry', type: 'info' });
    } catch (err) {
      setUploads((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    playSubtleTick();
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleAddDirectUrl = () => {
    if (!manualUrlInput.trim()) return;
    const directAsset: UploadedAsset = {
      id: `url_${Date.now()}`,
      url: manualUrlInput.trim(),
      filename: 'external_source',
      title: 'Linked Image Asset',
      size: 0,
      createdAt: new Date().toISOString(),
    };
    setUploads((prev) => [directAsset, ...prev]);
    if (targetProject) {
      onAssignToProject(targetProject, directAsset.url);
    }
    setManualUrlInput('');
    setStatusMessage({ text: 'Direct image link registered', type: 'success' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-zinc-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-white/20 flex items-center justify-center bg-black">
              <Server className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-white tracking-wide">
                Backend Media Asset Manager
              </h3>
              <p className="text-xs text-zinc-400">
                Upload images to server storage (<code className="text-zinc-300 font-mono">/uploads</code>) and bind to projects or hero
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchUploads}
              title="Refresh upload registry"
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status notification */}
        {statusMessage && (
          <div
            className={`px-6 py-2 text-xs flex items-center justify-between border-b ${
              statusMessage.type === 'error'
                ? 'bg-rose-950/40 text-rose-300 border-rose-900/40'
                : 'bg-zinc-900 text-zinc-200 border-white/10'
            }`}
          >
            <span>{statusMessage.text}</span>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-zinc-400 hover:text-white ml-2 text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Target project selector */}
          <div className="p-4 bg-zinc-900/40 border border-white/10 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                Active Target Destination
              </span>
              <p className="text-xs text-zinc-400">
                Uploaded images will be assigned to this showcase entry or hero section.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={targetProject}
                onChange={(e) => setTargetProject(e.target.value)}
                className="bg-black border border-white/20 text-white text-xs rounded px-3 py-2 focus:outline-none focus:border-white transition-colors"
              >
                <option value="">-- No Auto-Assign (Store in Registry) --</option>
                <option value="HERO_BANNER">⭐ Hero Section Main Visual</option>
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    Case Study: {proj.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Upload Dropzone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-white bg-white/5 scale-[0.99]'
                : 'border-white/15 bg-zinc-900/20 hover:border-white/30 hover:bg-zinc-900/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-12 h-12 rounded-full border border-white/20 mx-auto flex items-center justify-center mb-3 bg-black">
              <Upload className={`w-5 h-5 text-zinc-300 ${uploading ? 'animate-bounce' : ''}`} />
            </div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wide">
              {uploading ? 'Uploading to Server Backend...' : 'Drop image file here or click to browse'}
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Supports PNG, JPG, WEBP, SVG up to 50MB. Saved to persistent server storage.
            </p>
          </div>

          {/* URL input fallback */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Or paste direct image URL (https://...)"
                value={manualUrlInput}
                onChange={(e) => setManualUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddDirectUrl()}
                className="w-full bg-black border border-white/15 rounded text-xs pl-9 pr-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40"
              />
            </div>
            <button
              onClick={handleAddDirectUrl}
              className="px-4 py-2 text-xs font-medium text-black bg-white rounded hover:bg-zinc-200 transition-colors whitespace-nowrap"
            >
              Add Link
            </button>
          </div>

          {/* Gallery of Uploaded Assets */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Uploaded Media Registry ({uploads.length})
              </h4>
              <span className="text-xs text-zinc-500 font-mono">
                Storage: /public/uploads/
              </span>
            </div>

            {uploads.length === 0 ? (
              <div className="p-8 text-center border border-white/10 rounded-lg bg-zinc-900/20 text-zinc-400 text-xs">
                No custom images uploaded yet. Upload your first photograph or campaign asset above to customize any project!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {uploads.map((asset) => (
                  <div
                    key={asset.id}
                    className="group relative bg-zinc-900/60 border border-white/10 rounded-lg overflow-hidden flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="h-32 bg-black relative overflow-hidden">
                      <img
                        src={asset.url}
                        alt={asset.title}
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-300 bg-black/60 px-1.5 py-0.5 rounded border border-white/10">
                        {asset.size ? `${(asset.size / 1024).toFixed(0)} KB` : 'External'}
                      </span>
                    </div>

                    {/* Meta & actions */}
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-white truncate block" title={asset.filename}>
                          {asset.filename}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono block">
                          {new Date(asset.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-white/10">
                        {/* Quick action buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              if (targetProject === 'HERO_BANNER') {
                                onAssignToHero(asset.url);
                                setStatusMessage({ text: 'Bound to Hero Section visual', type: 'success' });
                              } else if (targetProject) {
                                onAssignToProject(targetProject, asset.url);
                                setStatusMessage({ text: `Bound to project: ${targetProject}`, type: 'success' });
                              } else {
                                onAssignToHero(asset.url);
                                setStatusMessage({ text: 'Bound to Hero Section visual', type: 'success' });
                              }
                              playSubtleTick();
                            }}
                            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-white text-black hover:bg-zinc-200 rounded text-[11px] font-medium transition-colors"
                          >
                            <span>Apply to Selected</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => handleCopy(asset.url)}
                            className="p-1.5 bg-black border border-white/15 text-zinc-300 hover:text-white rounded text-[11px] transition-colors"
                            title="Copy URL"
                          >
                            {copiedUrl === asset.url ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="p-1.5 bg-black border border-white/15 text-zinc-400 hover:text-rose-400 rounded text-[11px] transition-colors"
                            title="Delete file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-white/10 bg-zinc-950 flex items-center justify-between text-xs text-zinc-500">
          <span>Server storage route: <code className="text-zinc-400">/public/uploads/*</code></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded transition-colors text-xs font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
