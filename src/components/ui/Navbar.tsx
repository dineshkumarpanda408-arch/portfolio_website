import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  User,
  Cpu,
  FolderGit2,
  Smartphone,
  Monitor,
  Sparkles,
  BookOpen,
  GraduationCap,
  Send,
  Volume2,
  VolumeX,
  FileText,
  Command,
  Menu,
  X,
} from 'lucide-react';
import { portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

interface NavbarProps {
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenCommandPalette: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Compass },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'app-dev', label: 'App Dev', icon: Smartphone },
  { id: 'web-dev', label: 'Web Dev', icon: Monitor },
  { id: 'animations', label: 'Animations', icon: Sparkles },
  { id: 'research', label: 'Honors', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Send },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigateSection,
  onOpenCommandPalette,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    soundFx.playClick();
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-2xl px-4 py-2.5 border border-white/10 shadow-2xl bg-[#0c101d]/85 backdrop-blur-2xl">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400 font-extrabold text-base">
              D
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
              Dinesh Kumar Panda
            </h1>
            <p className="text-[10px] text-cyan-400 font-medium tracking-wider">
              PORTFOLIO
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links (Scroll Spy) */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-white/5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => soundFx.playHover()}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 rounded-lg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 z-10" />
                <span className="z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls & Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono hover:border-cyan-400 transition-all"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">⌘K</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-slate-900/90 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Resume Download CTA */}
          <a
            href={portfolioConfig.profile.resumeUrl}
            onClick={() => soundFx.playClick()}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-900/90 border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden mt-3 max-w-7xl mx-auto glass-panel rounded-2xl p-4 border border-white/10 flex flex-col gap-1.5 bg-[#0c101d]/95 backdrop-blur-2xl"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
