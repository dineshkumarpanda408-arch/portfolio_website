import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { AppDevSection } from './components/sections/AppDevSection';
import { WebDevSection } from './components/sections/WebDevSection';
import { AnimationSection } from './components/sections/AnimationSection';
import { ResearchSection } from './components/sections/ResearchSection';
import { ContactSection } from './components/sections/ContactSection';
import { BackgroundParticleCanvas } from './components/canvas/BackgroundParticleCanvas';
import { FloatingKeyWidget } from './components/canvas/FloatingKeyWidget';
import { CommandPalette } from './components/ui/CommandPalette';
import { ProjectModal } from './components/ui/ProjectModal';
import { ResearchModal } from './components/ui/ResearchModal';
import { AchievementsOverlay } from './components/ui/AchievementsOverlay';
import { Footer } from './components/ui/Footer';
import { Project, ResearchPaper, Achievement } from './config/portfolioConfig';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'app-dev', 'web-dev', 'animations', 'research', 'contact'];

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isNight, setIsNight] = useState(true);

  // Modals
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Toggle Theme Mode (Dark Mood vs Bright Mood)
  const toggleTheme = () => {
    setIsNight((prev) => !prev);
  };

  useEffect(() => {
    if (isNight) {
      document.documentElement.classList.remove('theme-bright');
      document.documentElement.classList.add('theme-dark');
      document.body.classList.remove('theme-bright');
      document.body.classList.add('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-bright');
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-bright');
    }
  }, [isNight]);

  // Smooth Section Navigation with Header Offset
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Scroll Progress & Scroll Spy Listener using requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min(Math.max(window.scrollY / Math.max(totalHeight, 1), 0), 1);
          setScrollProgress(progress);

          // Section Scroll Spy
          const scrollPos = window.scrollY + 220;
          for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
            const secId = SECTION_IDS[i];
            const el = document.getElementById(secId);
            if (el && el.offsetTop <= scrollPos) {
              setActiveSection((prev) => (prev !== secId ? secId : prev));
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Keyboard Ctrl+K Shortcut for Command Palette
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050816] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      {/* Background Interactive Particle Mesh */}
      <BackgroundParticleCanvas />

      {/* Top Fixed Glassmorphism Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigateSection={scrollToSection}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isNight={isNight}
        onToggleTheme={toggleTheme}
      />

      {/* Main Page Sections */}
      <main className="relative z-10 space-y-12">
        <HeroSection
          scrollProgress={scrollProgress}
          onNavigate={scrollToSection}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection onSelectProject={(proj) => setSelectedProject(proj)} />

        <AppDevSection />

        <WebDevSection />

        <AnimationSection />

        <ResearchSection
          onSelectPaper={(paper) => setSelectedPaper(paper)}
          onSelectAchievement={(ach) => setSelectedAchievement(ach)}
        />

        <ContactSection />
      </main>

      {/* Floating 3D Enter Key Widget */}
      <FloatingKeyWidget onClick={() => setCommandPaletteOpen(true)} />

      {/* Command Palette Modal (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigateSection={scrollToSection}
      />

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Research Paper Modal */}
      <AnimatePresence>
        {selectedPaper && (
          <ResearchModal
            paper={selectedPaper}
            onClose={() => setSelectedPaper(null)}
          />
        )}
      </AnimatePresence>

      {/* Achievement Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementsOverlay
            selectedItem={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
