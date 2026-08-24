import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, X, ExternalLink, Maximize2 } from 'lucide-react';
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
  const [activeItem, setActiveItem] = useState<Achievement | null>(
    selectedItem || (portfolioConfig.achievements.length > 0 ? portfolioConfig.achievements[0] : null)
  );
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl bg-[#0c101d] rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl my-auto max-h-[90vh] flex flex-col"
      >
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 hover:text-white hover:border-amber-400 transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5 shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Hall of Achievements & Certifications
            </h2>
            <p className="text-xs text-amber-300 font-medium">
              Verified Certificates, Academic Excellence & Technical Honors
            </p>
          </div>
        </div>

        {/* Selected Achievement Focus Card */}
        {activeItem && (
          <div className="mb-5 p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 shrink-0 flex flex-col md:flex-row gap-5 items-stretch">
            {activeItem.imageUrl && (
              <div
                onClick={() => {
                  soundFx.playClick();
                  setLightboxImage(activeItem.imageUrl!);
                }}
                className="group relative w-full md:w-56 h-40 md:h-auto rounded-xl overflow-hidden bg-slate-900 border border-amber-400/30 shrink-0 cursor-pointer shadow-lg"
              >
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                  <Maximize2 className="w-4 h-4 text-amber-300" />
                  <span>Expand Certificate</span>
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30">
                    {activeItem.badge}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {activeItem.date}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-amber-300/90 mb-2 font-medium">{activeItem.issuer}</p>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              {activeItem.imageUrl && (
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setLightboxImage(activeItem.imageUrl!);
                  }}
                  className="mt-3 self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-semibold transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Original Certificate</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Grid List of Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto flex-1 pr-1">
          {portfolioConfig.achievements.map((item) => {
            const isSelected = activeItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveItem(item);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3.5 items-center ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-400 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/80 border-white/10 hover:border-amber-400/40 hover:bg-slate-900'
                }`}
              >
                {item.imageUrl ? (
                  <div className="w-16 h-14 rounded-lg overflow-hidden bg-slate-950 border border-white/10 shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 font-bold text-xs">
                    🏆
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 truncate">
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">{item.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{item.issuer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-white/20 text-white hover:bg-red-500/20 hover:border-red-400 transition-all z-50"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxImage}
              alt="Certificate Fullscreen View"
              className="max-w-full max-h-[90vh] object-contain rounded-xl border border-white/20 shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

