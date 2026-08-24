import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Send, Github, Linkedin, Mail, ChevronDown, Sparkles, Command, Code2, ArrowRight } from 'lucide-react';
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
    <section id="home" className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 md:px-12 overflow-hidden pt-28 pb-12">
      {/* Dynamic Animated Floating Cyber Glow Orbs Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-600/20 rounded-full blur-[130px] opacity-80 animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-gradient-to-r from-purple-600/15 via-emerald-500/15 to-cyan-400/15 rounded-full blur-[140px] opacity-70 animate-float-reverse" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl w-full text-center my-auto flex flex-col items-center">
        
        {/* Availability & Role Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-400/40 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,242,254,0.15)] animate-pulse-glow"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 status-indicator text-emerald-400" />
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Full-Stack MERN & AI Mobile Engineer</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight"
        >
          Hello, I'm{' '}
          <span className="text-gradient hover:brightness-125 transition-all cursor-default">
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

        {/* Animated Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-8"
        >
          <a
            href={portfolioConfig.profile.resumeUrl}
            onClick={() => soundFx.playClick()}
            className="shimmer-button flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:scale-105 transition-all transform"
          >
            <FileText className="w-4 h-4" />
            <span>Download Resume</span>
          </a>

          <button
            onClick={() => {
              soundFx.playClick();
              onNavigate('projects');
            }}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-white/15 hover:border-cyan-400 hover:text-cyan-300 text-slate-200 font-semibold text-xs sm:text-sm shadow-md hover:shadow-cyan-500/20 hover:scale-105 transition-all transform"
          >
            <span>Explore Featured Work</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/35 text-purple-300 font-semibold text-xs sm:text-sm transition-all hover:scale-105 shadow-md shadow-purple-500/10"
            title="Command Palette (Ctrl+K)"
          >
            <Command className="w-4 h-4 text-purple-400" />
            <span>⌘K Command Menu</span>
          </button>
        </motion.div>

        {/* Social Icons Bar with Bounce Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3.5"
        >
          <a
            href={portfolioConfig.profile.socials.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:scale-110 shadow-sm hover:shadow-cyan-500/20 transition-all transform"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={portfolioConfig.profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:scale-110 shadow-sm hover:shadow-cyan-500/20 transition-all transform"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={portfolioConfig.profile.socials.email}
            onClick={() => soundFx.playClick()}
            className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:scale-110 shadow-sm hover:shadow-cyan-500/20 transition-all transform"
            title="Send Direct Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator Prompt */}
      <div className="relative z-10 flex flex-col items-center gap-1 text-slate-400 text-xs font-mono">
        <span>Scroll to Explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-4 h-4 text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
};

