import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, UploadCloud, Archive } from 'lucide-react';
import { toggleSound, isSoundEnabled, playSubtleTick } from '../utils/audio.ts';

interface NavbarProps {
  onOpenAssetManager: () => void;
  onOpenExportModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAssetManager, onOpenExportModal }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playSubtleTick();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-black/85 backdrop-blur-md">
      {/* Scroll Progress Hairline */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-white transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="font-display text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          MONOLITH
        </a>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
          <a href="#capabilities" className="hover:text-white transition-colors">
            Capabilities
          </a>
          <a href="#showcase" className="hover:text-white transition-colors">
            Showcase
          </a>
          <a href="#metrics" className="hover:text-white transition-colors">
            Performance
          </a>
          <a href="#methodology" className="hover:text-white transition-colors">
            Methodology
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Inquire
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions + functional toggles */}
        <div className="flex items-center gap-2.5">
          {/* Subtle Audio tactile toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-colors"
            title={soundOn ? 'Disable tactile sound' : 'Enable tactile sound'}
            aria-label="Toggle haptic audio"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Backend Image / Media Asset Manager trigger */}
          <button
            onClick={() => {
              playSubtleTick();
              onOpenAssetManager();
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded transition-colors whitespace-nowrap"
            title="Upload and manage custom images on backend"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Media</span>
          </button>

          {/* GoDaddy ZIP Export */}
          {onOpenExportModal && (
            <button
              onClick={() => {
                playSubtleTick();
                onOpenExportModal();
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/30 rounded transition-colors whitespace-nowrap"
              title="Download packaged website ZIP for GoDaddy"
            >
              <Archive className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">GoDaddy ZIP</span>
              <span className="lg:hidden">ZIP</span>
            </button>
          )}

          {/* Primary Action Button */}
          <a
            href="#contact"
            className="px-4 py-2 text-xs font-semibold text-black bg-white rounded hover:bg-zinc-200 transition-colors whitespace-nowrap"
          >
            Initiate Discovery
          </a>
        </div>
      </div>
    </header>
  );
};
