/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ParallaxTicker } from './components/ParallaxTicker.tsx';
import { Capabilities } from './components/Capabilities.tsx';
import { ProjectShowcase } from './components/ProjectShowcase.tsx';
import { ProofSection } from './components/ProofSection.tsx';
import { MethodologySection } from './components/MethodologySection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { CaseStudyModal } from './components/CaseStudyModal.tsx';
import { AssetManagerModal } from './components/AssetManagerModal.tsx';
import { GodaddyExportModal } from './components/GodaddyExportModal.tsx';
import { INITIAL_PROJECTS } from './data/projectsData.ts';
import { CaseStudy } from './types/index.ts';
import { UploadCloud, Archive } from 'lucide-react';
import { playSubtleTick } from './utils/audio.ts';

export default function App() {
  const [projects, setProjects] = useState<CaseStudy[]>(() => {
    // Check localStorage for persisted customized projects
    const saved = localStorage.getItem('monolith_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PROJECTS;
      }
    }
    return INITIAL_PROJECTS;
  });

  const [heroImage, setHeroImage] = useState<string>(() => {
    return localStorage.getItem('monolith_hero_image') || '';
  });

  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [assetManagerOpen, setAssetManagerOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [preselectedUploadProjectId, setPreselectedUploadProjectId] = useState<string | undefined>(undefined);

  // Synchronize projects state to localStorage
  useEffect(() => {
    localStorage.setItem('monolith_projects', JSON.stringify(projects));
  }, [projects]);

  // Synchronize hero image to localStorage and backend settings
  useEffect(() => {
    if (heroImage) {
      localStorage.setItem('monolith_hero_image', heroImage);
    }
  }, [heroImage]);

  // Listen for keyboard shortcut (Cmd+U or Ctrl+U) to open media asset manager
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        playSubtleTick();
        setPreselectedUploadProjectId(undefined);
        setAssetManagerOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handler to assign uploaded image to a specific project
  const handleAssignToProject = (projectId: string, imageUrl: string) => {
    setProjects((prev) =>
      prev.map((item) =>
        item.id === projectId
          ? { ...item, imageUrl }
          : item
      )
    );

    // If active modal is open for this project, update it too
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject((prev) => (prev ? { ...prev, imageUrl } : null));
    }
  };

  // Handler to assign uploaded image to hero
  const handleAssignToHero = (imageUrl: string) => {
    setHeroImage(imageUrl);
  };

  // Open asset manager specifically targeting a project
  const handleOpenUploadForProject = (projectId: string) => {
    setPreselectedUploadProjectId(projectId);
    setAssetManagerOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black">
      {/* Navigation Top Bar */}
      <Navbar 
        onOpenAssetManager={() => {
          setPreselectedUploadProjectId(undefined);
          setAssetManagerOpen(true);
        }} 
        onOpenExportModal={() => setExportModalOpen(true)}
      />

      {/* Hero Section with Parallax */}
      <Hero
        heroImage={heroImage}
        onOpenUploadHero={() => {
          setPreselectedUploadProjectId('HERO_BANNER');
          setAssetManagerOpen(true);
        }}
      />

      {/* Infinite Parallax Brand Ticker */}
      <ParallaxTicker />

      {/* Core Disciplines & Asymmetric Bento */}
      <Capabilities />

      {/* Interactive Project Showcases (Grid & Parallax Deck) */}
      <ProjectShowcase
        projects={projects}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onOpenUpload={handleOpenUploadForProject}
      />

      {/* Validated Commercial Track Record & Attributable Proof */}
      <ProofSection />

      {/* 4-Phase Growth Sprint Methodology */}
      <MethodologySection />

      {/* Interactive Partnership Inquiry / Lead Intake */}
      <ContactSection />

      {/* Quiet Editorial Footer */}
      <Footer onOpenAssetManager={() => {
        setPreselectedUploadProjectId(undefined);
        setAssetManagerOpen(true);
      }} />

      {/* Interactive Full Case Study Inspector Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenUpload={(projId) => {
            setPreselectedUploadProjectId(projId);
            setAssetManagerOpen(true);
          }}
        />
      )}

      {/* Backend Media Asset Manager & Upload Modal */}
      <AssetManagerModal
        isOpen={assetManagerOpen}
        onClose={() => setAssetManagerOpen(false)}
        projects={projects}
        onAssignToProject={handleAssignToProject}
        onAssignToHero={handleAssignToHero}
        activeHeroImage={heroImage}
        preselectedProjectId={preselectedUploadProjectId}
      />

      {/* GoDaddy Deployment & Export Modal */}
      <GodaddyExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />

      {/* Floating Action Controls */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
        <button
          onClick={() => {
            playSubtleTick();
            setExportModalOpen(true);
          }}
          className="group flex items-center gap-2 px-3.5 py-2.5 bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-500/60 rounded-full shadow-2xl backdrop-blur-md transition-all text-xs font-medium font-mono"
          title="Export website as GoDaddy ZIP"
        >
          <Archive className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">GoDaddy ZIP</span>
        </button>

        <button
          onClick={() => {
            playSubtleTick();
            setPreselectedUploadProjectId(undefined);
            setAssetManagerOpen(true);
          }}
          className="group flex items-center gap-2 px-3.5 py-2.5 bg-zinc-950/90 hover:bg-black text-zinc-300 hover:text-white border border-white/15 hover:border-white/30 rounded-full shadow-2xl backdrop-blur-md transition-all text-xs font-medium"
          title="Open Backend Image & Media Manager (Ctrl+U)"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
          <UploadCloud className="w-4 h-4 text-zinc-300 group-hover:text-white" />
          <span className="hidden sm:inline">Backend Media Uploader</span>
          <kbd className="hidden lg:inline text-[10px] text-zinc-500 font-mono bg-zinc-900 px-1.5 py-0.5 rounded border border-white/10">
            Ctrl+U
          </kbd>
        </button>
      </aside>
    </div>
  );
}
