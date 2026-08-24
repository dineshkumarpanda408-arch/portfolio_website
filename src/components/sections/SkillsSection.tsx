import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { portfolioConfig, Skill } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

const CATEGORIES = ['All', 'Language', 'Frontend', 'Backend', 'AI/ML', 'Database', 'Tools'] as const;

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSkills = selectedCategory === 'All'
    ? portfolioConfig.skills
    : portfolioConfig.skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="relative w-full py-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Cpu className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>Technical Capability & Stack Matrix</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Technical Capabilities & Stack Mastery
        </h2>
        <p className="text-slate-400 text-sm mt-3">
          Explore core programming proficiency, production project experience, and framework depth across the MERN & AI stack.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat);
              }}
              className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 scale-105'
                  : 'bg-slate-900/80 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400/40'
              }`}
            >
              <span>{cat}</span>
              {isActive && (
                <motion.div
                  layoutId="skillsTabActive"
                  className="absolute -bottom-1 left-2 right-2 h-0.5 bg-cyan-400 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Grid of Interactive Skill Cards */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={skill.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => soundFx.playClick()}
              className="glass-panel p-6 rounded-3xl border border-white/10 shadow-xl bg-[#0c101d]/90 hover:border-cyan-400/50 hover:shadow-[0_12px_35px_-8px_rgba(0,242,254,0.25)] transition-all cursor-pointer group flex flex-col justify-between h-64 relative overflow-hidden"
            >
              {/* Subtle Corner Ambient Color Accent */}
              <div
                className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ backgroundColor: skill.color }}
              />

              <div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-lg transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${skill.color}33`, borderColor: skill.color, borderWidth: 1 }}
                  >
                    <span style={{ color: skill.color }}>{skill.name[0]}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-[11px] font-semibold text-cyan-300">
                    {skill.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors relative z-10">
                  {skill.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed relative z-10">
                  {skill.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 relative z-10">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Mastery</span>
                  <span className="text-cyan-400 font-mono">{skill.proficiency}%</span>
                </div>
                
                {/* Glowing Progress Bar */}
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="h-full rounded-full relative shadow-[0_0_10px_rgba(0,242,254,0.5)]"
                    style={{ backgroundColor: skill.color }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full opacity-80 animate-pulse" />
                  </motion.div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>{skill.experience}</span>
                  <span className="text-cyan-300 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    {skill.projectsUsedIn.length} Projects
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

