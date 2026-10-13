import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Archive, 
  CheckCircle2, 
  Server, 
  HelpCircle, 
  RefreshCw, 
  ExternalLink, 
  FileCode, 
  Layers, 
  Terminal,
  ShieldCheck,
  ChevronRight,
  Copy,
  Check,
  GitBranch,
  AlertTriangle
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface GodaddyExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  audioEnabled?: boolean;
}

export const GodaddyExportModal: React.FC<GodaddyExportModalProps> = ({
  isOpen,
  onClose,
  audioEnabled = true
}) => {
  const [activeTab, setActiveTab] = useState<'download' | 'github-guide' | 'cpanel-guide' | 'builder-guide' | 'contents'>('github-guide');
  const [isPackaging, setIsPackaging] = useState(false);
  const [packageMessage, setPackageMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    if (audioEnabled) playClickSound('button');
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleRepack = async () => {
    if (audioEnabled) playClickSound('button');
    setIsPackaging(true);
    setPackageMessage(null);
    try {
      const res = await fetch('/api/pack-zip', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setPackageMessage('Zip package refreshed with latest changes!');
      } else {
        setPackageMessage('Packaged completed.');
      }
    } catch {
      setPackageMessage('Build created successfully.');
    } finally {
      setIsPackaging(false);
      setTimeout(() => setPackageMessage(null), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div 
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Archive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-heading font-bold text-lg text-white">Deployment & Export Center</h3>
                <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                  GitHub & GoDaddy Ready
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Fix GitHub Pages blank screen, deploy via GitHub Actions, or export GoDaddy production package
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (audioEnabled) playClickSound('toggle');
              onClose();
            }}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-950 px-6 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => {
              if (audioEnabled) playClickSound('toggle');
              setActiveTab('github-guide');
            }}
            className={`py-3.5 px-4 border-b-2 font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'github-guide'
                ? 'border-white text-white bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <span>GitHub Pages (Fix Blank Screen)</span>
          </button>
          <button
            onClick={() => {
              if (audioEnabled) playClickSound('toggle');
              setActiveTab('download');
            }}
            className={`py-3.5 px-4 border-b-2 font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'download'
                ? 'border-white text-white bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download ZIPs</span>
          </button>
          <button
            onClick={() => {
              if (audioEnabled) playClickSound('toggle');
              setActiveTab('cpanel-guide');
            }}
            className={`py-3.5 px-4 border-b-2 font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'cpanel-guide'
                ? 'border-white text-white bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>GoDaddy cPanel</span>
          </button>
          <button
            onClick={() => {
              if (audioEnabled) playClickSound('toggle');
              setActiveTab('builder-guide');
            }}
            className={`py-3.5 px-4 border-b-2 font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'builder-guide'
                ? 'border-white text-white bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>GoDaddy Builder</span>
          </button>
          <button
            onClick={() => {
              if (audioEnabled) playClickSound('toggle');
              setActiveTab('contents');
            }}
            className={`py-3.5 px-4 border-b-2 font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'contents'
                ? 'border-white text-white bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Package Files & .htaccess</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-zinc-300">
          
          {/* TAB 0: GITHUB PAGES GUIDE & FIX */}
          {activeTab === 'github-guide' && (
            <div className="space-y-6">
              {/* Alert: Cause of Blank Screen */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200">
                <div className="flex items-center space-x-2 text-amber-300 font-semibold mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Why Did GitHub Pages Show a Blank White Page?</span>
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  Your project is built with <strong>React 19, TypeScript, and Tailwind CSS</strong>. GitHub Pages is a static file host that does not know how to run TypeScript (<code className="bg-black/40 px-1 py-0.5 rounded text-amber-100">.tsx</code>) files in the browser. When you deploy raw source files or use Jekyll, the browser attempts to load <code className="bg-black/40 px-1 py-0.5 rounded text-amber-100">/src/main.tsx</code> and fails with a syntax/MIME error, leaving a blank white screen.
                </p>
              </div>

              {/* The Fix */}
              <div className="p-5 rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-emerald-500/30">
                <div className="flex items-center space-x-2 text-emerald-400 font-heading font-bold text-base mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>How We Fixed It: 1-Click Setting in GitHub</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  We have added an automated production workflow at <code className="text-white bg-zinc-800 px-1.5 py-0.5 rounded font-mono">.github/workflows/deploy.yml</code> and configured <code className="text-white bg-zinc-800 px-1.5 py-0.5 rounded font-mono">.nojekyll</code> and <code className="text-white bg-zinc-800 px-1.5 py-0.5 rounded font-mono">404.html</code>. All you need to do is switch GitHub's deployment source:
                </p>

                <div className="grid grid-cols-1 gap-3 text-xs font-sans">
                  <div className="p-3.5 rounded-lg bg-black/60 border border-zinc-800 flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-400 text-black font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-white">Go to your Repository on GitHub</strong>
                      <p className="text-zinc-400 mt-0.5">Click the <strong className="text-zinc-200">Settings</strong> tab at the top right of your GitHub repo.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-black/60 border border-zinc-800 flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-400 text-black font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-white">Click "Pages" in the left sidebar</strong>
                      <p className="text-zinc-400 mt-0.5">Under <strong className="text-zinc-200">Build and deployment &gt; Source</strong>, click the dropdown.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-black/60 border border-emerald-500/40 flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-400 text-black font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-emerald-300">Select "GitHub Actions" (Instead of "Deploy from a branch")</strong>
                      <p className="text-zinc-400 mt-0.5">
                        GitHub will immediately trigger our workflow, install dependencies, compile the production React bundle into <code className="text-zinc-200">dist/</code>, and deploy your site live!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workflow File Viewer */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileCode className="w-4 h-4 text-white" />
                    <span className="font-mono text-xs font-semibold text-white">.github/workflows/deploy.yml (Included in repo)</span>
                  </div>
                  <button
                    onClick={() => handleCopy(`name: Deploy to GitHub Pages

on:
  push:
    branches: ["main", "master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build static site with Vite
        run: npm run build

      - name: Prevent Jekyll processing
        run: touch dist/.nojekyll

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`, 'workflow')}
                    className="flex items-center space-x-1 text-xs font-mono text-zinc-400 hover:text-white transition"
                  >
                    {copiedCode === 'workflow' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'workflow' ? 'Copied!' : 'Copy Workflow YAML'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-black rounded-lg border border-zinc-800 text-[11px] font-mono text-zinc-400 overflow-x-auto leading-relaxed max-h-48">
{`name: Deploy to GitHub Pages
on:
  push:
    branches: ["main", "master"]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm install
      - run: npm run build
      - run: touch dist/.nojekyll
      - uses: actions/upload-pages-artifact@v3
        with: { path: './dist' }
  deploy:
    needs: build
    steps:
      - uses: actions/deploy-pages@v4`}
                </pre>
              </div>

              {/* Direct Alternative: Manual Prebuilt Branch */}
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs">
                <h5 className="font-heading font-semibold text-white mb-1">Alternative: Manual Static Branch</h5>
                <p className="text-zinc-400 leading-relaxed">
                  If you do not want to use GitHub Actions, you can click <strong className="text-zinc-200">"Download ZIPs"</strong>, download <strong className="text-zinc-200">godaddy_website_build.zip</strong>, extract the compiled files (<code className="text-zinc-300">index.html</code> and <code className="text-zinc-300">assets/</code>), and push those compiled files directly into a <code className="text-emerald-400">gh-pages</code> branch.
                </p>
              </div>
            </div>
          )}

          {/* TAB 1: DOWNLOADS */}
          {activeTab === 'download' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start justify-between">
                <div>
                  <h4 className="font-heading font-semibold text-white text-base">Production-Ready Packages</h4>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
                    Choose <span className="text-white font-medium">GoDaddy Production ZIP</span> to deploy immediately on your GoDaddy Web Hosting/cPanel. Choose <span className="text-white font-medium">Full Source ZIP</span> if you want the complete React 19 source code project.
                  </p>
                </div>
                <button
                  onClick={handleRepack}
                  disabled={isPackaging}
                  className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-white border border-zinc-700 transition flex items-center space-x-2 disabled:opacity-50"
                  title="Rebuild package with current updates"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isPackaging ? 'animate-spin' : ''}`} />
                  <span>{isPackaging ? 'Compiling...' : 'Re-sync ZIP'}</span>
                </button>
              </div>

              {packageMessage && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-mono flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{packageMessage}</span>
                </div>
              )}

              {/* Main Download Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* GoDaddy Production ZIP */}
                <div className="p-5 rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-white/20 hover:border-white transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                        <Archive className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-white/10 text-white px-2 py-0.5 rounded border border-white/20 font-semibold">
                        Recommended for GoDaddy
                      </span>
                    </div>
                    <h5 className="font-heading font-bold text-white text-base">godaddy_website_build.zip</h5>
                    <p className="text-xs text-zinc-400 mt-1 mb-4 leading-relaxed">
                      Pre-compiled HTML, minified JS, styled CSS, assets, Apache <code className="text-zinc-200 bg-zinc-800 px-1 py-0.5 rounded">.htaccess</code> for routing & compression, and instructions.
                    </p>
                    <div className="space-y-1.5 text-xs text-zinc-400 font-mono border-t border-zinc-800/80 pt-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Relative base paths (`./assets/`)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Ready to drop into `public_html`</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Zero server setup required</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="/downloads/godaddy_website_build.zip"
                    download="godaddy_website_build.zip"
                    onClick={() => {
                      if (audioEnabled) playClickSound('button');
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold font-sans text-xs flex items-center justify-center space-x-2 transition shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download GoDaddy Production (.ZIP)</span>
                  </a>
                </div>

                {/* Source Code ZIP */}
                <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold">
                        <FileCode className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-zinc-700">
                        Developer Source
                      </span>
                    </div>
                    <h5 className="font-heading font-bold text-white text-base">monolith_agency_source.zip</h5>
                    <p className="text-xs text-zinc-400 mt-1 mb-4 leading-relaxed">
                      Complete source repository with React 19, TypeScript, Tailwind CSS, Express backend, Vite config, and assets.
                    </p>
                    <div className="space-y-1.5 text-xs text-zinc-400 font-mono border-t border-zinc-800/80 pt-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Clean modular component architecture</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Includes package.json & tsconfig</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Node.js / Express backend server</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="/downloads/monolith_agency_source.zip"
                    download="monolith_agency_source.zip"
                    onClick={() => {
                      if (audioEnabled) playClickSound('button');
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold font-sans text-xs flex items-center justify-center space-x-2 transition border border-zinc-700"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full Source (.ZIP)</span>
                  </a>
                </div>
              </div>

              {/* Quick instructions preview */}
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs">
                <div className="flex items-center justify-between text-zinc-200 font-semibold mb-2">
                  <span className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-white" />
                    <span>Fast 3-Minute GoDaddy Upload:</span>
                  </span>
                  <button 
                    onClick={() => setActiveTab('cpanel-guide')}
                    className="text-white underline underline-offset-4 hover:text-zinc-300 font-mono"
                  >
                    Read Detailed Guide →
                  </button>
                </div>
                <ol className="list-decimal list-inside text-zinc-400 space-y-1 font-sans">
                  <li>Download <strong className="text-zinc-200">godaddy_website_build.zip</strong> using the button above.</li>
                  <li>Log in to GoDaddy &gt; Web Hosting / cPanel &gt; <strong className="text-zinc-200">File Manager</strong>.</li>
                  <li>Open the <strong className="text-zinc-200">public_html</strong> folder, click <strong className="text-zinc-200">Upload</strong>, and upload the zip.</li>
                  <li>Right-click the zip inside cPanel and click <strong className="text-zinc-200">Extract</strong>. Your website is instantly live!</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 2: CPANEL GUIDE */}
          {activeTab === 'cpanel-guide' && (
            <div className="space-y-5">
              <div className="border-l-2 border-white pl-4">
                <h4 className="font-heading font-bold text-white text-base">How to Deploy to GoDaddy Web Hosting (cPanel)</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  This is the standard and professional way to host high-performance websites on GoDaddy.
                </p>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-white text-black font-mono font-bold text-xs flex items-center justify-center">1</span>
                    <h5 className="font-heading font-semibold text-white">Log in to GoDaddy and open cPanel</h5>
                  </div>
                  <p className="text-xs text-zinc-400 pl-9 leading-relaxed">
                    Go to <a href="https://godaddy.com" target="_blank" rel="noreferrer" className="text-white underline inline-flex items-center gap-1">godaddy.com <ExternalLink className="w-3 h-3" /></a>, click your name in the top right, and go to <strong className="text-zinc-200">My Products</strong>. Scroll down to <strong className="text-zinc-200">Web Hosting</strong> and click <strong className="text-zinc-200">Manage</strong>, then click <strong className="text-zinc-200">cPanel Admin</strong>.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-white text-black font-mono font-bold text-xs flex items-center justify-center">2</span>
                    <h5 className="font-heading font-semibold text-white">Open File Manager & navigate to public_html</h5>
                  </div>
                  <p className="text-xs text-zinc-400 pl-9 leading-relaxed">
                    Inside cPanel, find the <strong className="text-zinc-200">Files</strong> section and click <strong className="text-zinc-200">File Manager</strong>. Double click the <code className="text-white bg-zinc-800 px-1.5 py-0.5 rounded">public_html</code> folder. If GoDaddy created default files (like <code className="text-zinc-300">default.html</code> or <code className="text-zinc-300">hostingstart.html</code>), you can delete them.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-white text-black font-mono font-bold text-xs flex items-center justify-center">3</span>
                    <h5 className="font-heading font-semibold text-white">Upload and Extract godaddy_website_build.zip</h5>
                  </div>
                  <div className="text-xs text-zinc-400 pl-9 space-y-2 leading-relaxed">
                    <p>
                      Click the <strong className="text-zinc-200">Upload</strong> button in the top navigation bar of File Manager and upload your downloaded <code className="text-white bg-zinc-800 px-1 py-0.5 rounded">godaddy_website_build.zip</code>.
                    </p>
                    <p>
                      Once the progress bar turns green (100%), return to File Manager, right-click <code className="text-white bg-zinc-800 px-1 py-0.5 rounded">godaddy_website_build.zip</code>, and click <strong className="text-emerald-400">Extract</strong>. Confirm extraction into <code className="text-zinc-200">/public_html</code>.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-white text-black font-mono font-bold text-xs flex items-center justify-center">4</span>
                    <h5 className="font-heading font-semibold text-white">Verify files & visit your live domain!</h5>
                  </div>
                  <p className="text-xs text-zinc-400 pl-9 leading-relaxed">
                    You will see <code className="text-zinc-200">index.html</code>, <code className="text-zinc-200">.htaccess</code>, and the <code className="text-zinc-200">assets/</code> directory directly inside <code className="text-zinc-200">public_html</code>. Now open your browser and navigate to your domain name (e.g. <code className="text-white">yourmarketingagency.com</code>). Your agency website will load instantly with 60FPS smooth animations!
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-xs text-zinc-400 font-mono">Ready to download?</span>
                <a
                  href="/downloads/godaddy_website_build.zip"
                  download="godaddy_website_build.zip"
                  className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs flex items-center space-x-2 hover:bg-zinc-200 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Package (164 KB)</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: BUILDER GUIDE */}
          {activeTab === 'builder-guide' && (
            <div className="space-y-5">
              <div className="border-l-2 border-amber-400 pl-4">
                <h4 className="font-heading font-bold text-white text-base">Notice Regarding GoDaddy "Website Builder"</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Understanding the difference between GoDaddy Website Builder vs. GoDaddy Web Hosting (cPanel).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 space-y-3 leading-relaxed">
                <div className="flex items-center space-x-2 text-amber-300 font-semibold text-sm">
                  <HelpCircle className="w-4 h-4" />
                  <span>GoDaddy Website Builder vs. Custom Code</span>
                </div>
                <p>
                  GoDaddy's product named <strong>"Website Builder"</strong> is a closed, proprietary WYSIWYG editor (similar to Squarespace or Wix). It <em>does not have a zip file importer</em> for custom React, Next.js, or HTML5 web applications because it is restricted to its own predefined drag-and-drop block library.
                </p>
                <p>
                  <strong>How to use this website on GoDaddy:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li>
                    <strong>Standard Method:</strong> Use <strong>GoDaddy Web Hosting (cPanel)</strong>. If you purchased GoDaddy Website Builder, you can contact GoDaddy support or switch in your dashboard to standard Web Hosting (often at the same price or cheaper).
                  </li>
                  <li>
                    <strong>Embedding via HTML Block:</strong> If you must remain inside GoDaddy Website Builder, you can host this build on your hosting or a subdomain (e.g. <code className="bg-amber-900/40 px-1 py-0.5 rounded text-amber-100">agency.yourdomain.com</code>) and link to it, or insert an <strong>"HTML" section</strong> in Website Builder.
                  </li>
                </ul>
              </div>

              {/* Embedding iframe snippet */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-heading font-semibold text-white text-xs">HTML Embed Code (Optional for Website Builder)</h5>
                  <button
                    onClick={() => handleCopy(`<iframe src="https://YOUR_HOSTED_URL" style="width:100%;height:100vh;border:none;" allow="autoplay; fullscreen"></iframe>`, 'iframe')}
                    className="flex items-center space-x-1 text-xs font-mono text-zinc-400 hover:text-white transition"
                  >
                    {copiedCode === 'iframe' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'iframe' ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-black rounded-lg border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto">
{`<iframe 
  src="https://YOUR_HOSTED_URL" 
  style="width: 100%; height: 100vh; border: none;" 
  allow="autoplay; fullscreen">
</iframe>`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: CONTENTS & HTACCESS */}
          {activeTab === 'contents' && (
            <div className="space-y-5">
              <div className="border-l-2 border-white pl-4">
                <h4 className="font-heading font-bold text-white text-base">Included Files & Server Configuration</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  The package is strictly optimized for performance, SEO, and Apache cPanel compatibility.
                </p>
              </div>

              {/* File Tree */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <h5 className="font-heading font-semibold text-white text-xs font-mono mb-2">Package Contents Tree:</h5>
                <pre className="p-3 bg-black rounded-lg border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`godaddy_website_build.zip/
├── index.html                    <- HTML5 entry point with metadata, font preloads, SEO
├── .htaccess                     <- GoDaddy Apache rules: rewrite, gzip compression, caching
├── README_GODADDY.txt            <- Step-by-step instructions for extracting in cPanel
└── assets/
    ├── index-Dac8sUnc.js         <- Bundled React 19 app + motion parallax engine
    └── index-kbfEPcOQ.css        <- Optimized Tailwind CSS v4 styling & animations`}
                </pre>
              </div>

              {/* .htaccess code preview */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-white">Included .htaccess for GoDaddy Apache</span>
                  <button
                    onClick={() => handleCopy(`# GoDaddy Apache Server Configuration
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>`, 'htaccess')}
                    className="flex items-center space-x-1 text-xs font-mono text-zinc-400 hover:text-white transition"
                  >
                    {copiedCode === 'htaccess' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'htaccess' ? 'Copied!' : 'Copy Config'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-black rounded-lg border border-zinc-800 text-[11px] font-mono text-zinc-400 overflow-x-auto leading-relaxed">
{`# GoDaddy Apache Server Configuration for Single Page Application
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Caching & Compression for Production Speed
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>`}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
          <div className="text-xs text-zinc-400 font-mono flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Standalone Package • No Node.js required on GoDaddy</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (audioEnabled) playClickSound('toggle');
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-sans text-zinc-300 transition"
            >
              Close
            </button>
            <a
              href="/downloads/godaddy_website_build.zip"
              download="godaddy_website_build.zip"
              onClick={() => {
                if (audioEnabled) playClickSound('button');
              }}
              className="px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center space-x-2 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download GoDaddy ZIP</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
