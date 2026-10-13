import React, { useEffect, useState, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight, Camera } from 'lucide-react';
import { playSubtleTick } from '../utils/audio.ts';

interface HeroProps {
  heroImage?: string;
  onOpenUploadHero: () => void;
}

export const Hero: React.FC<HeroProps> = ({ heroImage, onOpenUploadHero }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-black px-6 py-12 md:py-20 border-b border-white/[0.08]"
    >
      {/* Parallax Background Layer 1: Geometric Grid & Noise */}
      <div
        className="absolute inset-0 bg-grain opacity-40 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />

      {/* Parallax Background Layer 2: Subtle Radial Light Drift */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-white/[0.07] via-zinc-800/[0.03] to-transparent rounded-full blur-3xl pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15 + scrollY * 0.25}px)`,
        }}
      />

      {/* Optional custom uploaded hero background */}
      {heroImage && (
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{ transform: `scale(1.05) translateY(${scrollY * 0.2}px)` }}
        >
          <img
            src={heroImage}
            alt="Agency Hero Visual"
            className="w-full h-full object-cover grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>
      )}

      {/* Top Editorial Kicker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>EST. 2021 // MONOLITH GLOBAL MARKETING ARCHITECTURE</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>HIGH-CONVICTION GROWTH</span>
          <span aria-hidden="true">·</span>
          <span>CREATIVE & PERFORMANCE</span>
        </div>
      </div>

      {/* Main Hero Headline Section */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 md:py-16">
        <div className="space-y-6 max-w-5xl">
          <h1
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.04] text-balance"
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          >
            WE ARCHITECT DEMAND & ENGINEER EXPONENTIAL MARKET SHARE.
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed text-balance"
            style={{
              transform: `translateY(${scrollY * -0.02}px)`,
            }}
          >
            We merge brutalist brand narrative with algorithmic acquisition infrastructure for category leaders, high-growth technology ventures, and modern luxury houses.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              onClick={playSubtleTick}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold text-black bg-white rounded hover:bg-zinc-200 transition-all duration-200 shadow-lg whitespace-nowrap"
            >
              <span>Schedule Discovery Call</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <a
              href="#showcase"
              onClick={playSubtleTick}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 rounded transition-all duration-200 whitespace-nowrap"
            >
              <span>Explore Selected Works</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenUploadHero}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-3 text-xs text-zinc-400 hover:text-white transition-colors"
              title="Upload custom hero artwork to backend"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Customize Hero Visual</span>
            </button>
          </div>
        </div>
      </div>

      {/* Adjoining Proof Bar (Claim-to-Proof Adjacency) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/[0.08]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <span className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums block">
              $142M+
            </span>
            <span className="text-xs text-zinc-400 mt-1 block">
              Direct Client Revenue Scaled
            </span>
          </div>

          <div>
            <span className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums block">
              3.8x
            </span>
            <span className="text-xs text-zinc-400 mt-1 block">
              Average Blended Portfolio ROAS
            </span>
          </div>

          <div>
            <span className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums block">
              18
            </span>
            <span className="text-xs text-zinc-400 mt-1 block">
              Awwwards & Agency of Year Awards
            </span>
          </div>

          <div>
            <span className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums block">
              &lt; 21 Days
            </span>
            <span className="text-xs text-zinc-400 mt-1 block">
              Average Sprint-to-Launch Velocity
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
