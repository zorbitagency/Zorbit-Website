import React, { useState, useRef } from 'react';
import { ArrowUpRight, Camera, Grid, Layers, Sparkles } from 'lucide-react';
import { CaseStudy, ProjectCategory } from '../types/index.ts';
import { ProjectGraphic } from './ProjectGraphic.tsx';
import { playSubtleTick } from '../utils/audio.ts';

interface ProjectShowcaseProps {
  projects: CaseStudy[];
  onSelectProject: (project: CaseStudy) => void;
  onOpenUpload: (projectId: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  onSelectProject,
  onOpenUpload,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'deck'>('grid');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'brand-architecture', label: 'Brand Architecture' },
    { id: 'performance-growth', label: 'Performance & Growth' },
    { id: '3d-spatial', label: '3D & Spatial Web' },
    { id: 'creative-direction', label: 'Creative Direction' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="showcase" className="py-20 md:py-32 px-6 bg-black border-b border-white/[0.08] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-zinc-800/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>Selected Works & Archives</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
              COMMERCIAL IMPACT PORTFOLIO
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* View Mode Toggle: Grid vs Sticky Parallax Deck */}
            <div className="flex items-center gap-1 p-1 bg-zinc-950 border border-white/10 rounded-lg">
              <button
                onClick={() => {
                  setViewMode('grid');
                  playSubtleTick();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Grid presentation"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('deck');
                  playSubtleTick();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  viewMode === 'deck'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Parallax stacked deck view"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Parallax Deck</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Bar (Buttons / Functional segmented controls per Section 1A) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                playSubtleTick();
              }}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GRID VIEW MODE */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onSelect={() => {
                  playSubtleTick();
                  onSelectProject(project);
                }}
                onOpenUpload={() => onOpenUpload(project.id)}
              />
            ))}
          </div>
        )}

        {/* PARALLAX STACKED DECK VIEW MODE */}
        {viewMode === 'deck' && (
          <div className="space-y-16 py-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="sticky top-28 bg-zinc-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
                style={{
                  top: `${110 + idx * 24}px`,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Column: Visual Canvas */}
                  <div className="lg:col-span-7 aspect-[16/10] bg-black relative">
                    <ProjectGraphic
                      id={project.id}
                      title={project.title}
                      imageUrl={project.imageUrl}
                      className="w-full h-full"
                      showUploadTrigger
                      onUploadClick={() => onOpenUpload(project.id)}
                    />
                  </div>

                  {/* Right Column: Case Details & Metrics */}
                  <div className="lg:col-span-5 p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-zinc-950">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                        <span>{project.categoryLabel}</span>
                        <span>0{idx + 1} / 0{filteredProjects.length}</span>
                      </div>

                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Primary metric highlight */}
                      <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-lg space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">
                          Headline Commercial Proof
                        </span>
                        <div className="flex items-baseline gap-3">
                          <span className="font-display text-2xl font-bold text-white tabular-nums">
                            {project.metrics[0]?.value}
                          </span>
                          <span className="text-xs text-zinc-400 font-mono">
                            {project.metrics[0]?.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
                      <button
                        onClick={() => onOpenUpload(project.id)}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 rounded transition-colors"
                        title="Upload project photo"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Upload Artwork</span>
                      </button>

                      <button
                        onClick={() => {
                          playSubtleTick();
                          onSelectProject(project);
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-white hover:bg-zinc-200 rounded transition-colors shadow-md"
                      >
                        <span>Inspect Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// 3D Tilt Interactive Project Card Component
const ProjectCard: React.FC<{
  project: CaseStudy;
  index: number;
  onSelect: () => void;
  onOpenUpload: () => void;
}> = ({ project, index, onSelect, onOpenUpload }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Moderate tilt angles for sophistication
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative cursor-pointer bg-zinc-950 border border-white/[0.08] hover:border-white/30 rounded-xl overflow-hidden transition-colors flex flex-col justify-between"
    >
      {/* Visual media container */}
      <div className="relative aspect-[16/10] w-full bg-black overflow-hidden">
        <ProjectGraphic
          id={project.id}
          title={project.title}
          imageUrl={project.imageUrl}
          className="w-full h-full"
          showUploadTrigger
          onUploadClick={onOpenUpload}
        />

        {/* Top bar over visual */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-300 bg-black/60 px-2.5 py-1 rounded backdrop-blur-md border border-white/10">
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Card Content & Metrics */}
      <div className="p-6 md:p-7 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
            {project.client}
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed line-clamp-2">
            {project.tagline}
          </p>
        </div>

        {/* Metric banner */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
              {project.metrics[0]?.label}
            </span>
            <span className="font-display text-lg font-bold text-white tabular-nums">
              {project.metrics[0]?.value}
            </span>
          </div>

          <div className="text-right space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
              {project.metrics[1]?.label}
            </span>
            <span className="font-display text-lg font-bold text-white tabular-nums">
              {project.metrics[1]?.value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
