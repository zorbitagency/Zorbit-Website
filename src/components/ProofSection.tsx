import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { playSubtleTick } from '../utils/audio.ts';

export const ProofSection: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        'MONOLITH engineered an aura of technical reverence around AETHEL that legacy agencies could not comprehend. Our pre-orders exceeded our five-year manufacturing forecast in under forty-eight hours.',
      author: 'Henrik Vane',
      role: 'Chief Design Officer',
      company: 'Aethel Sound Labs',
      metric: '$14.2M pre-orders generated',
    },
    {
      quote:
        'The precision and commercial velocity MONOLITH delivered was unlike any creative agency we have engaged. They think like quantitative capital partners focused strictly on margin and enterprise valuation.',
      author: 'Elena Rostova',
      role: 'VP Global Commercial Operations',
      company: 'Hyperion Dynamics Group',
      metric: '$62M reservation capital secured',
    },
    {
      quote:
        'MONOLITH understood the uncompromising restraint required in modern luxury horology. They did not simply redesign our website; they permanently elevated our secondary market liquidity.',
      author: 'Marc-André Laurent',
      role: 'Managing Director',
      company: 'Chronos Haute Horlogerie Geneve',
      metric: '+42% secondary market premium',
    },
  ];

  const handlePrev = () => {
    playSubtleTick();
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playSubtleTick();
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeTestimonial];

  return (
    <section id="metrics" className="py-20 md:py-28 px-6 bg-zinc-950 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Validated Enterprise Proof
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
            COMMERCIAL RIGOR & ACCOUNTABILITY
          </h2>
        </div>

        {/* Quantified Track Record Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-black border border-white/[0.08] rounded-xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
              Direct Attributed Revenue
            </span>
            <div className="font-display text-4xl md:text-5xl font-bold text-white tabular-nums">
              $142,400,000+
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Audited gross merchandise volume, enterprise contract values, and direct pre-order capitalization directly tracked across active client engagements.
            </p>
          </div>

          <div className="p-8 bg-black border border-white/[0.08] rounded-xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
              Portfolio Blended ROAS
            </span>
            <div className="font-display text-4xl md:text-5xl font-bold text-white tabular-nums">
              3.82x
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Weighted cross-platform performance across Meta, Google Ads, programmatic DSPs, and high-intent search networks over the trailing 18 months.
            </p>
          </div>

          <div className="p-8 bg-black border border-white/[0.08] rounded-xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
              Product Drop Success Rate
            </span>
            <div className="font-display text-4xl md:text-5xl font-bold text-white tabular-nums">
              100%
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Zero unsold capsule inventory across 14 consecutive global limited release campaigns managed with custom bot-protection architecture.
            </p>
          </div>
        </div>

        {/* Attributable Testimonial Carousel */}
        <div className="p-8 md:p-12 bg-black border border-white/[0.08] rounded-2xl relative overflow-hidden">
          <Quote className="w-12 h-12 text-white/[0.06] absolute top-8 right-8 pointer-events-none" />

          <div className="max-w-4xl space-y-8 relative z-10">
            <div className="inline-block px-3 py-1 bg-zinc-900 border border-white/10 rounded text-[11px] font-mono text-zinc-300">
              Verified Client Statement · {current.metric}
            </div>

            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl text-white font-medium leading-relaxed">
              "{current.quote}"
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/[0.08]">
              <div>
                <h4 className="font-display text-base font-bold text-white tracking-wide">
                  {current.author}
                </h4>
                <p className="text-xs text-zinc-400 font-mono">
                  {current.role} · {current.company}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400 mr-2">
                  0{activeTestimonial + 1} / 0{testimonials.length}
                </span>
                <button
                  onClick={handlePrev}
                  className="p-2 rounded bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
                  aria-label="Next quote"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
