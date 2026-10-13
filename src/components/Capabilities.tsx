import React from 'react';
import { ArrowUpRight, Layers, Cpu, Box, Flame } from 'lucide-react';
import { playSubtleTick } from '../utils/audio.ts';

export const Capabilities: React.FC = () => {
  const capabilities = [
    {
      index: '01',
      title: 'Brand Architecture & Narrative Positioning',
      icon: Layers,
      span: 'md:col-span-2 lg:col-span-2',
      summary: 'We reconstruct market perceptions by engineering uncompromising editorial identities, high-conviction copywriting, and design language systems that unlock price inelasticity.',
      deliverables: [
        'Comprehensive Visual Identity & Token Architecture',
        'Narrative Thesis & Category-Defining Manifestos',
        'Investor & Boardroom Strategic Pitch Decks',
        'Physical Print Monographs & Premium Packaging',
      ],
      metric: 'Average +48% pricing power increase within 180 days',
    },
    {
      index: '02',
      title: 'Algorithmic Acquisition & Funnel Engineering',
      icon: Cpu,
      span: 'md:col-span-1 lg:col-span-1',
      summary: 'We build proprietary customer acquisition pipelines spanning high-intent search, programmatic audience targeting, and real-time conversion rate testing.',
      deliverables: [
        'Multi-Tier Paid Media Infrastructure',
        'Custom Conversion Rate Optimization (CRO)',
        'Predictive LTV/CAC Cohort Modeling',
        'Server-Side Conversion Tracking & CAPI',
      ],
      metric: '3.8x blended return on ad spend across client portfolio',
    },
    {
      index: '03',
      title: 'Interactive 3D Web & Spatial Digital Flagships',
      icon: Box,
      span: 'md:col-span-1 lg:col-span-1',
      summary: 'We develop bespoke WebGL, Three.js, and spatial web experiences that turn standard e-commerce visits into immersive interactive product demonstrations.',
      deliverables: [
        'Custom Real-Time WebGL Product Configurators',
        'Interactive Physics & Fluid Audio Haptics',
        'Ultra-Low Latency Mobile 60FPS Optimization',
        'Headless Commerce & Custom Shopify/Next.js Stacks',
      ],
      metric: '4.6x average session dwell time vs industry benchmarks',
    },
    {
      index: '04',
      title: 'Creative Direction & Scarcity Launch Engines',
      icon: Flame,
      span: 'md:col-span-2 lg:col-span-2',
      summary: 'We orchestrate synchronized product drops and documentary-grade campaigns that generate organic media velocity and sell out inventory in hours.',
      deliverables: [
        'High-Impact 35mm & Medium Format Campaign Production',
        'Cryptographic Bot-Proof Drop & Waitlist Engines',
        'Guerilla Out-of-Home & Street Poster Syndication',
        'Earned Media & Influential Cultural Seeding',
      ],
      metric: '100% sell-out rate across all managed limited capsule drops',
    },
  ];

  return (
    <section id="capabilities" className="py-20 md:py-28 px-6 bg-black border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Agency Core Architecture
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
              DISCIPLINES & CAPABILITIES
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-light">
            We do not offer fragmented services. Every partnership deploys our full multi-disciplinary engine from positioning to scalable revenue acquisition.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.index}
                onMouseEnter={playSubtleTick}
                className={`${item.span} group relative bg-zinc-950 border border-white/[0.08] hover:border-white/25 rounded-xl p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                {/* Subtle hover gradient highlight */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/[0.04] to-transparent pointer-events-none rounded-bl-full transition-opacity opacity-50 group-hover:opacity-100" />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500 tracking-wider">
                      {item.index}.
                    </span>
                    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight group-hover:translate-x-0.5 transition-transform">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed font-light">
                    {item.summary}
                  </p>

                  {/* Clean unboxed deliverables */}
                  <div className="pt-4 border-t border-white/[0.08] space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Deliverable Scope
                    </span>
                    <ul className="space-y-1.5">
                      {item.deliverables.map((deliv, dIdx) => (
                        <li key={dIdx} className="text-xs text-zinc-300 flex items-center gap-2">
                          <span className="w-1 h-1 bg-zinc-500 rounded-full" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400 relative z-10">
                  <span className="font-mono text-zinc-300">{item.metric}</span>
                  <a
                    href="#contact"
                    className="p-1 text-zinc-500 hover:text-white transition-colors"
                    title="Inquire about this capability"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
