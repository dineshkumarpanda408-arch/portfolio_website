import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Send, Sparkles, Github, Linkedin, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';
import { IslandId } from '../canvas/CameraController';

interface HomeOverlayProps {
  onExplore: (island: IslandId) => void;
}

export const HomeOverlay: React.FC<HomeOverlayProps> = ({ onExplore }) => {
  const [titleIdx, setTitleIdx] = useState(0);

  // Subtitle rotator timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % portfolioConfig.profile.titles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="fixed bottom-20 left-4 right-4 md:left-12 md:right-auto z-20 max-w-lg pointer-events-none"
    >
      <div className="glass-panel p-6 md:p-7 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-auto backdrop-blur-2xl bg-[#0c101d]/85 max-h-[82vh] overflow-y-auto">
        {/* Executive Formal Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Available for High-Impact AI & Engineering Roles</span>
        </div>

        {/* Profile Avatar & Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative shrink-0">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(0,242,254,0.25)]">
              <img
                src={portfolioConfig.profile.photoUrl}
                alt={portfolioConfig.profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              {portfolioConfig.profile.name}
            </h2>
            <div className="h-6 overflow-hidden mt-0.5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={titleIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs md:text-sm font-semibold text-cyan-400 tracking-wide flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {portfolioConfig.profile.titles[titleIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Short Executive Bio */}
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-5 font-normal">
          {portfolioConfig.profile.bio}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          {/* Explore Projects */}
          <button
            onClick={() => {
              soundFx.playClick();
              onExplore('projects');
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Download Resume */}
          <a
            href={portfolioConfig.profile.resumeUrl}
            onClick={() => soundFx.playClick()}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 text-slate-200 font-semibold text-xs transition-all transform hover:-translate-y-0.5"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Download Resume</span>
          </a>

          {/* Contact Me */}
          <button
            onClick={() => {
              soundFx.playClick();
              onExplore('contact');
            }}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/40 text-purple-200 font-semibold text-xs transition-all transform hover:-translate-y-0.5"
          >
            <Send className="w-3.5 h-3.5 text-purple-400" />
            <span>Contact</span>
          </button>
        </div>

        {/* Dedicated Formal Social Links Bar */}
        <div className="flex items-center justify-between pt-3.5 border-t border-white/10 text-slate-400">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            Professional Channels
          </span>
          <div className="flex items-center gap-2">
            <a
              href={portfolioConfig.profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 text-[11px] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={portfolioConfig.profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 text-[11px] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={portfolioConfig.profile.socials.email}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 text-[11px] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
