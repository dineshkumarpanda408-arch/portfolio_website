import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { IslandId } from '../canvas/CameraController';
import { soundFx } from '../../utils/soundEffects';

interface ScrollIndicatorProps {
  activeIsland: IslandId;
  onSelectIsland: (island: IslandId) => void;
}

const ISLAND_ORDER: { id: IslandId; number: string; name: string }[] = [
  { id: 'home', number: '01', name: 'Home' },
  { id: 'projects', number: '02', name: 'Projects' },
  { id: 'skills', number: '03', name: 'Skills' },
  { id: 'achievements', number: '04', name: 'Achievements' },
  { id: 'research', number: '05', name: 'Honors' },
  { id: 'contact', number: '06', name: 'Contact' },
];

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  activeIsland,
  onSelectIsland,
}) => {
  const currentIndex = ISLAND_ORDER.findIndex((item) => item.id === activeIsland);
  const nextIsland = ISLAND_ORDER[currentIndex + 1]?.id || 'home';

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-auto">
      {/* Island Progress Dots / Step Bar */}
      <div className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel border border-white/10 shadow-xl backdrop-blur-xl">
        {ISLAND_ORDER.map((item, idx) => {
          const isActive = item.id === activeIsland;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundFx.playClick();
                onSelectIsland(item.id);
              }}
              className={`group relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              title={`Navigate to ${item.name}`}
            >
              <span className="font-mono text-[10px] opacity-70">{item.number}</span>
              <span className="hidden sm:inline">{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Scroll Down Prompt Button */}
      {currentIndex < ISLAND_ORDER.length - 1 && (
        <button
          onClick={() => {
            soundFx.playClick();
            onSelectIsland(nextIsland);
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-[11px] font-medium transition-all shadow-lg group"
        >
          <span>Scroll or Click Next</span>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
          </motion.div>
        </button>
      )}
    </div>
  );
};
