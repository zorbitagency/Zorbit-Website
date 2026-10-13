import React from 'react';
import { ArrowUp, UploadCloud } from 'lucide-react';
import { playSubtleTick } from '../utils/audio.ts';

interface FooterProps {
  onOpenAssetManager: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAssetManager }) => {
  const scrollToTop = () => {
    playSubtleTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black py-16 px-6 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-12 border-b border-white/[0.08]">
          <div className="space-y-4 max-w-sm">
            <a href="/" className="font-display text-2xl font-bold tracking-tight text-white block">
              MONOLITH
            </a>
            <p className="text-zinc-400 font-light leading-relaxed">
              Global marketing architecture, high-conviction brand positioning, and algorithmic performance engineering for category leaders.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="font-mono text-zinc-500 uppercase tracking-wider text-[11px] block">
                Navigation
              </span>
              <ul className="space-y-2 text-zinc-400">
                <li><a href="#capabilities" className="hover:text-white transition-colors">Disciplines</a></li>
                <li><a href="#showcase" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#metrics" className="hover:text-white transition-colors">Track Record</a></li>
                <li><a href="#methodology" className="hover:text-white transition-colors">Methodology</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-zinc-500 uppercase tracking-wider text-[11px] block">
                Locations
              </span>
              <ul className="space-y-2 text-zinc-400">
                <li>Zurich (Bahnhofstrasse)</li>
                <li>London (Mayfair)</li>
                <li>New York (SoHo)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-zinc-500 uppercase tracking-wider text-[11px] block">
                Management
              </span>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button
                    onClick={() => {
                      playSubtleTick();
                      onOpenAssetManager();
                    }}
                    className="flex items-center gap-1.5 hover:text-white transition-colors text-left"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Backend Media Portal</span>
                  </button>
                </li>
                <li><a href="mailto:partnerships@monolith.studio" className="hover:text-white transition-colors">Client Concierge</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-zinc-500 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} MONOLITH Marketing Architecture AG. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Confidential & Sovereign</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
