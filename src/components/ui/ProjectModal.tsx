import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, TrendingUp, Cpu } from 'lucide-react';
import { Project } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl bg-[#0c101d] rounded-3xl border border-white/15 shadow-2xl overflow-hidden my-auto max-h-[88vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Project High-Tech Banner Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#0f172a] to-[#0c101d] border-b border-white/10 shrink-0">
          <div className="absolute top-0 right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[11px] font-semibold uppercase tracking-wider mb-2 inline-block">
            System Architecture & Technical Specs
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Key Metric Badge */}
          {project.metrics && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Verified Impact: {project.metrics}</span>
            </div>
          )}

          {/* Full Description */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              System Architecture & Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {project.fullDesc}
            </p>
          </div>

          {/* Key Highlights */}
          {project.achievements && project.achievements.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Key Accomplishments & Deliverables
              </h3>
              <ul className="space-y-2">
                {project.achievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300 text-xs font-medium flex items-center gap-1"
                >
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Live Application</span>
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 hover:border-cyan-400 text-slate-200 font-semibold text-xs transition-all transform hover:-translate-y-0.5"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>Inspect Source Repository</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
