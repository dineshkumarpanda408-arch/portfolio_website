import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, MousePointer, Layers, Cpu } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

export const AnimationSection: React.FC = () => {
  return (
    <section id="animations" className="relative w-full py-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Interactive UI & Motion Engineering</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Micro-Interactions & Motion Engineering
        </h2>
        <p className="text-slate-400 text-sm mt-3">
          Demonstrating high-performance 60FPS UI transitions, physics-based micro-interactions, responsive spring vectors, and modern web design dynamics.
        </p>
      </div>

      {/* Interactive Micro-Interactions Showcase Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {portfolioConfig.animationItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="glass-panel p-6 rounded-3xl border border-white/10 shadow-xl bg-[#0c101d] hover:border-purple-400/50 transition-all cursor-pointer flex flex-col justify-between h-72"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-400">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-white/10 text-[10px] font-semibold text-purple-300">
                  {item.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-purple-300 font-semibold">
              <span className="flex items-center gap-1">
                <MousePointer className="w-3.5 h-3.5 text-purple-400" />
                Interactive Physics
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-600/20 text-purple-300 text-[11px]">
                Test / Hover
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
