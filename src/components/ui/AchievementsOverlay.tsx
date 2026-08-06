import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, X, Award, CheckCircle2 } from 'lucide-react';
import { Achievement, portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

interface AchievementsOverlayProps {
  selectedItem: Achievement | null;
  onClose: () => void;
}

export const AchievementsOverlay: React.FC<AchievementsOverlayProps> = ({
  selectedItem,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-3xl bg-[#0c101d] rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl my-auto max-h-[88vh] flex flex-col"
      >
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 hover:text-white hover:border-amber-400 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5 shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Hall of Achievements & Recognition
            </h2>
            <p className="text-xs text-amber-300 font-medium">
              National Hackathon Victories, Academic Excellence & Certifications
            </p>
          </div>
        </div>

        {/* Selected Achievement Focus */}
        {selectedItem && (
          <div className="mb-5 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                {selectedItem.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {selectedItem.date}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {selectedItem.title}
            </h3>
            <p className="text-xs text-slate-400 mb-1.5 font-medium">{selectedItem.issuer}</p>
            <p className="text-xs text-slate-200 leading-relaxed">
              {selectedItem.description}
            </p>
          </div>
        )}

        {/* Grid List of Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto flex-1 pr-1">
          {portfolioConfig.achievements.map((item) => (
            <div
              key={item.id}
              onClick={() => soundFx.playClick()}
              className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300">
                  {item.badge}
                </span>
                <span className="text-[11px] text-slate-400">{item.date}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{item.title}</h4>
              <p className="text-[11px] text-slate-400 mb-1.5 font-medium">{item.issuer}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
