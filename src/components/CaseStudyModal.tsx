import React, { useState } from 'react';
import { X, ArrowUpRight, Camera, TrendingUp, CheckCircle, ShieldCheck } from 'lucide-react';
import { CaseStudy } from '../types/index.ts';
import { ProjectGraphic } from './ProjectGraphic.tsx';
import { playSubtleTick } from '../utils/audio.ts';

interface CaseStudyModalProps {
  project: CaseStudy | null;
  onClose: () => void;
  onOpenUpload: (projectId: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenUpload,
}) => {
  const [activeTab, setActiveTab] = useState<'strategy' | 'metrics' | 'deliverables'>('strategy');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-zinc-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono">
              {project.categoryLabel}
            </span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span className="text-xs font-mono text-zinc-400">Archive {project.year}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenUpload(project.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-white/15 rounded transition-colors"
              title="Upload custom image to backend"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Replace Artwork</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable content body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Header Title & Tagline */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Client Commission // {project.client}
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-white text-balance">
              {project.title}
            </h2>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed max-w-3xl">
              {project.tagline}
            </p>
          </div>

          {/* Hero Visual Presentation */}
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black">
            <ProjectGraphic
              id={project.id}
              title={project.title}
              imageUrl={project.imageUrl}
              className="w-full h-full"
              showUploadTrigger
              onUploadClick={() => onOpenUpload(project.id)}
            />
          </div>

          {/* Key Impact Metric Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-zinc-900/40 border border-white/10 rounded-lg">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono">
                  {metric.label}
                </span>
                <span className="font-display text-xl md:text-2xl font-bold text-white tabular-nums block">
                  {metric.value}
                </span>
                {metric.change && (
                  <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-zinc-200" />
                    <span>{metric.change}</span>
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Tabbed Case Study Sections */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <button
                onClick={() => {
                  setActiveTab('strategy');
                  playSubtleTick();
                }}
                className={`px-4 py-2 text-xs font-medium rounded transition-colors ${
                  activeTab === 'strategy'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Strategic Architecture
              </button>
              <button
                onClick={() => {
                  setActiveTab('deliverables');
                  playSubtleTick();
                }}
                className={`px-4 py-2 text-xs font-medium rounded transition-colors ${
                  activeTab === 'deliverables'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Delivered Infrastructure
              </button>
              <button
                onClick={() => {
                  setActiveTab('metrics');
                  playSubtleTick();
                }}
                className={`px-4 py-2 text-xs font-medium rounded transition-colors ${
                  activeTab === 'metrics'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Commercial Outcomes
              </button>
            </div>

            {/* Tab 1: Strategy */}
            {activeTab === 'strategy' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-zinc-900/20 border border-white/10 rounded-lg space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-zinc-300" />
                    The Market Challenge
                  </span>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="p-5 bg-zinc-900/20 border border-white/10 rounded-lg space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-zinc-300" />
                    Strategic Thesis & Execution
                  </span>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                    {project.strategy}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Deliverables */}
            {activeTab === 'deliverables' && (
              <div className="p-6 bg-zinc-900/20 border border-white/10 rounded-lg space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Production Artifacts & Code Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-black border border-white/10 rounded flex items-center gap-3 text-xs text-zinc-200"
                    >
                      <span className="font-mono text-zinc-500">{String(idx + 1).padStart(2, '0')}.</span>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Metrics & Outcome */}
            {activeTab === 'metrics' && (
              <div className="space-y-4">
                <div className="p-6 bg-zinc-900/30 border border-white/10 rounded-lg space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Definitive Business Impact
                  </span>
                  <p className="text-sm text-zinc-200 leading-relaxed">
                    {project.outcome}
                  </p>
                </div>

                {project.testimonial && (
                  <div className="p-6 bg-black border border-white/15 rounded-lg space-y-4">
                    <blockquote className="text-sm md:text-base italic text-zinc-200 leading-relaxed">
                      "{project.testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                      <div className="w-8 h-8 rounded-full border border-white/20 bg-zinc-900 flex items-center justify-center font-display text-xs text-white">
                        {project.testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          {project.testimonial.author}
                        </span>
                        <span className="text-[11px] text-zinc-400 block font-mono">
                          {project.testimonial.role}, {project.testimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal footer CTA */}
        <div className="px-6 py-4 border-t border-white/10 bg-zinc-950 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Close Inspector
          </button>
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-white rounded hover:bg-zinc-200 transition-colors"
          >
            <span>Commission Comparable Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
