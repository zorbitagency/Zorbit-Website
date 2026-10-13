import React from 'react';
import { Shield, Compass, TrendingUp, Lock } from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const phases = [
    {
      step: '01',
      title: 'Forensic Audit & Unit Economics',
      icon: Compass,
      description: 'We deconstruct your customer acquisition cost (CAC), lifetime value (LTV) cohorts, and competitive whitespace before writing a single line of copy.',
      details: 'Deep analysis of historical ad spend, margin thresholds, customer churn curves, and brand pricing power.',
    },
    {
      step: '02',
      title: 'Architectural Sprint & Assets',
      icon: Shield,
      description: 'Within 21 days, we engineer the core identity tokens, 3D interactive web experiences, and high-conviction campaign collateral.',
      details: 'Rapid deployment of design systems, WebGL configurators, and conversion-optimized landing environments.',
    },
    {
      step: '03',
      title: 'Algorithmic Capital Deployment',
      icon: TrendingUp,
      description: 'We orchestrate multi-channel media buying across Meta, Google Search, high-net-worth programmatic, and influencer seeding.',
      details: 'Rigorous daily creative variation testing, server-side attribution telemetry, and automated audience bid optimization.',
    },
    {
      step: '04',
      title: 'Valuation & Liquidity Moat',
      icon: Lock,
      description: 'We convert initial transactional velocity into persistent brand equity, private allocation communities, and enduring market dominance.',
      details: 'VIP waitlist engines, automated collector concierges, and post-purchase customer retention flywheels.',
    },
  ];

  return (
    <section id="methodology" className="py-20 md:py-28 px-6 bg-black border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Operational Framework
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
              THE 4-PHASE GROWTH SPRINT
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-light">
            A battle-tested deployment cycle engineered to compress six months of traditional agency turnaround into a single high-velocity quarter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.step}
                className="p-6 bg-zinc-950 border border-white/[0.08] hover:border-white/20 rounded-xl space-y-5 flex flex-col justify-between transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-zinc-500 font-bold">
                      {phase.step}
                    </span>
                    <Icon className="w-5 h-5 text-zinc-400" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-white tracking-wide">
                    {phase.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {phase.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] text-[11px] font-mono text-zinc-400">
                  {phase.details}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
