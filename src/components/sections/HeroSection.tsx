import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Send, Github, Linkedin, Mail, ChevronDown, Sparkles, Command } from 'lucide-react';
import { HeroKeyboardCanvas } from '../canvas/HeroKeyboardCanvas';
import { portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

interface HeroSectionProps {
  scrollProgress: number;
  onNavigate: (sectionId: string) => void;
  onOpenCommandPalette: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollProgress,
  onNavigate,
  onOpenCommandPalette,
}) => {
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTypewriterIndex((prev) => (prev + 1) % portfolioConfig.profile.typewriterPhrases.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-between items-center px-4 md:px-12 overflow-hidden pt-24 pb-8">
      {/* 3D Commercial Mechanical Keyboard Canvas Background */}
      <HeroKeyboardCanvas scrollProgress={scrollProgress} />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-4xl w-full text-center my-auto flex flex-col items-center">
        {/* Top Developer Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-medium tracking-wider uppercase mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Interactive 3D Mechanical Keyboard Commercial Showcase</span>
        </motion.div>

        {/* Name Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
        >
          Hello, I'm{' '}
          <span className="text-gradient">
            {portfolioConfig.profile.name}
          </span>
        </motion.h1>

        {/* Typewriter Subtitle Rotator */}
        <div className="h-10 sm:h-12 overflow-hidden mb-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={typewriterIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 font-mono flex items-center gap-2"
            >
              <span>{portfolioConfig.profile.typewriterPhrases[typewriterIndex]}</span>
              <span className="w-2 h-6 sm:h-8 bg-cyan-400 animate-pulse inline-block" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl text-slate-300 text-sm sm:text-base leading-relaxed mb-8 font-normal"
        >
          "{portfolioConfig.profile.bio}"
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <a
            href={portfolioConfig.profile.resumeUrl}
            onClick={() => soundFx.playClick()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4" />
            <span>Download Resume</span>
          </a>

          <button
            onClick={() => {
              soundFx.playClick();
              onNavigate('projects');
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 border border-white/15 hover:border-cyan-400 text-slate-200 font-semibold text-xs sm:text-sm transition-all transform hover:-translate-y-0.5"
          >
            <span>Explore Work</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/40 text-purple-300 font-semibold text-xs sm:text-sm transition-all"
            title="Command Palette (Ctrl+K)"
          >
            <Command className="w-4 h-4" />
            <span>⌘K Command Menu</span>
          </button>
        </motion.div>

        {/* Social Icons Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <a
            href={portfolioConfig.profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={portfolioConfig.profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={portfolioConfig.profile.socials.email}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Prompt */}
      <div className="relative z-10 flex flex-col items-center gap-1 text-slate-400 text-xs font-mono">
        <span>Scroll to Explore</span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-4 h-4 text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
};
