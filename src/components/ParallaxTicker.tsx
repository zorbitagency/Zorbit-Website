import React from 'react';

export const ParallaxTicker: React.FC = () => {
  const brands = [
    'AETHEL SOUND LABS',
    'CHRONOS GENEVE',
    'HYPERION DYNAMICS',
    'KHOR HEAVY TEXTILES',
    'STRATA DISTRIBUTED COMPUTE',
    'VANGUARD VENTURE CAPITAL',
    '032C ARCHIVE',
    'MERIDIAN SPATIAL LABS',
  ];

  return (
    <div className="relative w-full overflow-hidden border-b border-white/[0.08] bg-zinc-950 py-4">
      {/* Subtle edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

      <div className="flex w-max animate-marquee space-x-12 items-center text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
        {[...brands, ...brands].map((brand, idx) => (
          <div key={idx} className="flex items-center space-x-12 shrink-0">
            <span className="hover:text-white transition-colors cursor-default">
              {brand}
            </span>
            <span className="text-zinc-600 select-none">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};
