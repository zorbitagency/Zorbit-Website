import React, { useState } from 'react';
import { ArrowUpRight, Check, Send, Sparkles } from 'lucide-react';
import { playSubtleTick, playImpactThud } from '../utils/audio.ts';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    discipline: 'brand-architecture',
    budget: '$50k - $100k',
    brief: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Corporate email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.company.trim()) errs.company = 'Company name or URL is required';
    if (!formData.brief.trim()) errs.brief = 'Please outline your commercial objective or timeline';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      playSubtleTick();
      return;
    }

    setSubmitting(true);
    playImpactThud();

    // Simulate reliable dispatch
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-6 bg-zinc-950 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Partnership Briefing */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Direct Principal Access
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                INITIATE COMMERCIAL ENGAGEMENT.
              </h2>
            </div>

            <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
              We accept a maximum of four concurrent flagship accounts per quarter to guarantee senior partner immersion across every strategic touchpoint.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block">
                  Studio Headquarters
                </span>
                <span className="text-xs text-zinc-300 block">
                  Zurich · London · New York
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:partnerships@monolith.studio"
                  className="text-xs text-white hover:underline font-mono"
                >
                  partnerships@monolith.studio
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block">
                  Response SLA
                </span>
                <span className="text-xs text-zinc-400 block font-mono">
                  Guaranteed confidential review within 24 business hours
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Intake Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 bg-black border border-white/[0.08] rounded-2xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Brief Received & Encrypted.
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                    A managing partner will review your commercial parameters and deliver an initial scope architecture to <span className="text-white font-mono">{formData.email}</span> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        discipline: 'brand-architecture',
                        budget: '$50k - $100k',
                        brief: '',
                      });
                    }}
                    className="mt-4 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white border border-white/15 rounded transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="Alexander Vance"
                        className={`w-full bg-zinc-950 border ${
                          errors.name ? 'border-rose-500' : 'border-white/15'
                        } rounded px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-rose-400 font-mono block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="vance@enterprise.com"
                        className={`w-full bg-zinc-950 border ${
                          errors.email ? 'border-rose-500' : 'border-white/15'
                        } rounded px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-rose-400 font-mono block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                        Brand / Company *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => {
                          setFormData({ ...formData, company: e.target.value });
                          if (errors.company) setErrors({ ...errors, company: '' });
                        }}
                        placeholder="Aethel Dynamics or url.com"
                        className={`w-full bg-zinc-950 border ${
                          errors.company ? 'border-rose-500' : 'border-white/15'
                        } rounded px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors`}
                      />
                      {errors.company && (
                        <span className="text-[11px] text-rose-400 font-mono block">
                          {errors.company}
                        </span>
                      )}
                    </div>

                    {/* Budget Bracket */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                        Target Capital Allocation
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/15 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                      >
                        <option value="$35k - $50k">$35,000 – $50,000 (Sprint Minimum)</option>
                        <option value="$50k - $100k">$50,000 – $100,000 (Quarterly Retainer)</option>
                        <option value="$100k - $250k">$100,000 – $250,000 (Flagship Rollout)</option>
                        <option value="$250k+">$250,000+ (Full Enterprise Re-platform)</option>
                      </select>
                    </div>
                  </div>

                  {/* Primary Focus Discipline */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                      Primary Strategic Focus
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'brand-architecture', label: 'Brand Architecture' },
                        { id: 'performance-growth', label: 'Performance Media' },
                        { id: '3d-spatial', label: '3D Web Experience' },
                        { id: 'creative-direction', label: 'Launch Drop' },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => {
                            setFormData({ ...formData, discipline: item.id });
                            playSubtleTick();
                          }}
                          className={`p-2.5 text-[11px] font-medium rounded text-center transition-colors border ${
                            formData.discipline === item.id
                              ? 'bg-white text-black border-white'
                              : 'bg-zinc-950 text-zinc-400 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Brief */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                      Commercial Objective & Target Launch Date *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.brief}
                      onChange={(e) => {
                        setFormData({ ...formData, brief: e.target.value });
                        if (errors.brief) setErrors({ ...errors, brief: '' });
                      }}
                      placeholder="Outline your immediate growth bottlenecks, target revenue timeline, or product release date..."
                      className={`w-full bg-zinc-950 border ${
                        errors.brief ? 'border-rose-500' : 'border-white/15'
                      } rounded px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors resize-none`}
                    />
                    {errors.brief && (
                      <span className="text-[11px] text-rose-400 font-mono block">
                        {errors.brief}
                      </span>
                    )}
                  </div>

                  {/* Action submit */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500 font-mono">
                      NDA automatically applied to all submissions.
                    </span>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-black bg-white hover:bg-zinc-200 rounded transition-colors whitespace-nowrap shadow"
                    >
                      <span>{submitting ? 'Transmitting Brief...' : 'Schedule Discovery Call'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
