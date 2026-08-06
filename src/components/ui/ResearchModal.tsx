import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, X, FileText, Bookmark, Share2 } from 'lucide-react';
import { ResearchPaper } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

interface ResearchModalProps {
  paper: ResearchPaper;
  onClose: () => void;
}

export const ResearchModal: React.FC<ResearchModalProps> = ({ paper, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, rotateY: -90, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        exit={{ opacity: 0, rotateY: 90, scale: 0.9 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl my-8 overflow-hidden"
      >
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Paper Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {paper.status} • {paper.conference}
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              {paper.title}
            </h2>
          </div>
        </div>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400 py-3 border-y border-white/10 mb-6">
          <span>Date: <strong className="text-slate-200">{paper.date}</strong></span>
          {paper.citations !== undefined && (
            <span className="text-emerald-300 flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5" />
              {paper.citations} Citations
            </span>
          )}
        </div>

        {/* Abstract */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Abstract
          </h3>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-normal bg-slate-900/40 p-4 rounded-2xl border border-white/5">
            "{paper.abstract}"
          </p>
        </div>

        {/* Research Topics */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Research Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {paper.topics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* PDF Link Button */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <a
            href={paper.pdfUrl || '#'}
            onClick={() => soundFx.playClick()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4" />
            <span>Read Publication PDF</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
