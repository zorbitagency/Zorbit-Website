import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface ProjectGraphicProps {
  id: string;
  title: string;
  imageUrl?: string;
  className?: string;
  onUploadClick?: () => void;
  showUploadTrigger?: boolean;
}

export const ProjectGraphic: React.FC<ProjectGraphicProps> = ({
  id,
  title,
  imageUrl,
  className = '',
  onUploadClick,
  showUploadTrigger = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // If a valid image URL is provided and has not errored
  if (imageUrl && !imageError) {
    return (
      <div className={`relative overflow-hidden bg-zinc-950 group ${className}`}>
        <img
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover grayscale contrast-125 brightness-95 transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
        
        {showUploadTrigger && onUploadClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUploadClick();
            }}
            className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-300 bg-black/70 hover:bg-black hover:text-white border border-white/10 rounded backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
            title="Replace with custom uploaded image"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Replace Image</span>
          </button>
        )}
      </div>
    );
  }

  // Bespoke procedural monochrome architectural artwork per project
  return (
    <div className={`relative overflow-hidden bg-[#0d0d10] border border-white/[0.07] group ${className}`}>
      {/* Dynamic graphic based on ID */}
      {id === 'aethel-audio' && (
        <svg
          viewBox="0 0 600 360"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="audioGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#27272a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
            </radialGradient>
            <linearGradient id="metalRing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#52525b" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <rect width="600" height="360" fill="url(#audioGlow)" />
          {/* Concentric acoustic rings */}
          {[140, 115, 90, 65, 45, 25].map((r, i) => (
            <circle
              key={i}
              cx="300"
              cy="180"
              r={r}
              fill="none"
              stroke="url(#metalRing)"
              strokeWidth={i === 2 ? '2' : '1'}
              strokeDasharray={i % 2 === 0 ? '4 8' : 'none'}
              opacity={0.3 + (i * 0.1)}
            />
          ))}
          {/* Spatial acoustic axes */}
          <line x1="100" y1="180" x2="500" y2="180" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
          <line x1="300" y1="40" x2="300" y2="320" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
          {/* Core acoustic driver focal */}
          <circle cx="300" cy="180" r="14" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="300" cy="180" r="4" fill="#ffffff" />
          {/* Frequency bar indicators */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const x1 = 300 + Math.cos(angle) * 155;
            const y1 = 180 + Math.sin(angle) * 155;
            const x2 = 300 + Math.cos(angle) * (162 + (i % 4) * 5);
            const y2 = 180 + Math.sin(angle) * (162 + (i % 4) * 5);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.2" />
            );
          })}
        </svg>
      )}

      {id === 'chronos-black' && (
        <svg
          viewBox="0 0 600 360"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="chronosGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="600" height="360" fill="url(#chronosGlow)" />
          {/* Chronograph bezel and indices */}
          <circle cx="300" cy="180" r="130" fill="none" stroke="#52525b" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="300" cy="180" r="122" fill="#121214" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 300 + Math.cos(angle) * 105;
            const y1 = 180 + Math.sin(angle) * 105;
            const x2 = 300 + Math.cos(angle) * 118;
            const y2 = 180 + Math.sin(angle) * 118;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff" strokeWidth={i % 3 === 0 ? '2.5' : '1'} strokeOpacity={i % 3 === 0 ? '0.85' : '0.4'} />
            );
          })}
          {/* Subdial 1: 60s */}
          <circle cx="300" cy="135" r="32" fill="none" stroke="#71717a" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="300" y1="135" x2="318" y2="128" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8" />
          {/* Hands */}
          <line x1="300" y1="180" x2="370" y2="140" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="300" y1="180" x2="240" y2="215" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" />
          <circle cx="300" cy="180" r="5" fill="#ffffff" />
          {/* Monolith Geneve inscription mark */}
          <text x="300" y="240" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="Syne, sans-serif" letterSpacing="3">CALIBRE 01 / TITANIUM</text>
        </svg>
      )}

      {id === 'hyperion-dynamics' && (
        <svg
          viewBox="0 0 600 360"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hyperGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#09090b" />
              <stop offset="50%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
          </defs>
          <rect width="600" height="360" fill="url(#hyperGrad)" />
          {/* Wind tunnel aerodynamic flow lines */}
          {[70, 110, 150, 190, 230, 270].map((y, i) => (
            <path
              key={i}
              d={`M 40 ${y} Q 180 ${y - 30 + i * 8}, 320 ${y + 15} T 560 ${y - 10}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth={i === 2 ? '2' : '1'}
              strokeOpacity={0.12 + (i * 0.05)}
              strokeDasharray={i % 2 === 0 ? '6 4' : 'none'}
            />
          ))}
          {/* Hypercar sculpted silhouette contour */}
          <path
            d="M 120 230 C 180 230, 220 180, 290 170 C 360 160, 420 185, 480 230 Z"
            fill="#18181b"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <path
            d="M 230 180 C 270 172, 330 172, 360 185 Z"
            fill="#27272a"
            stroke="#ffffff"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          {/* Telemetry data vector nodes */}
          <circle cx="290" cy="170" r="3" fill="#ffffff" />
          <circle cx="360" cy="185" r="3" fill="#ffffff" />
          <line x1="290" y1="170" x2="290" y2="110" stroke="#ffffff" strokeOpacity="0.3" strokeDasharray="2 2" />
          <text x="290" y="100" fill="#a1a1aa" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1">CD: 0.194 // TELEMETRY</text>
        </svg>
      )}

      {id === 'khor-textiles' && (
        <svg
          viewBox="0 0 600 360"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dyneemaWeave" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.08" />
              <path d="M 0 0 L 20 20 M 20 0 L 0 20" stroke="#ffffff" strokeWidth="0.3" strokeOpacity="0.04" />
            </pattern>
          </defs>
          <rect width="600" height="360" fill="#0c0c0e" />
          <rect width="600" height="360" fill="url(#dyneemaWeave)" />
          {/* Topographical technical garment seams */}
          <path d="M 80 80 L 240 280 L 400 80 L 520 280" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3" />
          <polygon points="240,280 320,160 400,280" fill="#18181b" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="320" cy="160" r="4" fill="#ffffff" />
          {/* Coordinate data typography */}
          <text x="60" y="320" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">DYNEEMA 2.4oz // RIPSTOP MATRIX</text>
          <text x="540" y="320" textAnchor="end" fill="#ffffff" fontSize="10" fontFamily="JetBrains Mono, monospace" opacity="0.6">N 46° 31' 22''</text>
        </svg>
      )}

      {id === 'strata-systems' && (
        <svg
          viewBox="0 0 600 360"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="600" height="360" fill="#09090b" />
          {/* Isometric compute matrix */}
          {Array.from({ length: 6 }).map((_, col) =>
            Array.from({ length: 4 }).map((_, row) => {
              const x = 120 + col * 65;
              const y = 80 + row * 55;
              const height = 18 + ((col * 3 + row * 5) % 24);
              return (
                <g key={`${col}-${row}`} opacity={0.3 + ((col + row) * 0.08)}>
                  <rect x={x} y={y} width="40" height={height} fill="#18181b" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
                  <rect x={x + 4} y={y + 4} width="32" height="2" fill="#ffffff" opacity="0.5" />
                </g>
              );
            })
          )}
          {/* Interconnect pipelines */}
          <line x1="80" y1="180" x2="520" y2="180" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 4" />
          <text x="300" y="320" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="3">0.42ms LATENCY MESH // 100K NODES</text>
        </svg>
      )}

      {/* Default fallback for custom or new items */}
      {!['aethel-audio', 'chronos-black', 'hyperion-dynamics', 'khor-textiles', 'strata-systems'].includes(id) && (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-zinc-950">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-3">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="font-display text-sm tracking-wider text-white uppercase">{title}</span>
          <span className="text-xs text-zinc-500 mt-1 font-mono">Custom Visual Asset</span>
        </div>
      )}

      {/* Scrim overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

      {/* Upload trigger button on hover */}
      {showUploadTrigger && onUploadClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUploadClick();
          }}
          className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-300 bg-black/80 hover:bg-black hover:text-white border border-white/20 rounded backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
          title="Upload custom image from backend"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Upload Image</span>
        </button>
      )}
    </div>
  );
};
