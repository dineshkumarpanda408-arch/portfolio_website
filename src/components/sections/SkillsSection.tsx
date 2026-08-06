import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolioConfig';
import { Skills3DCanvas } from '../canvas/3d/Skills3DCanvas';
import { soundFx } from '../../utils/soundEffects';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative w-full py-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>Interactive 3D Glass Skill Matrix</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Technical Capabilities & Framework Mastery
        </h2>
        <p className="text-slate-400 text-sm mt-3">
          Explore interactive 3D WebGL glass skill cubes and inspect proficiency metrics, experience duration, and production projects.
        </p>
      </div>

      {/* R3F Interactive 3D Skill Cubes Canvas */}
      <Skills3DCanvas />

      {/* Grid of Interactive Skill Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {portfolioConfig.skills.map((skill) => (
          <motion.div
            key={skill.id}
            whileHover={{ rotateY: 10, rotateX: -5, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="glass-panel p-6 rounded-3xl border border-white/10 shadow-xl bg-[#0c101d]/90 hover:border-cyan-400/40 transition-all cursor-pointer group flex flex-col justify-between h-64"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-lg"
                  style={{ backgroundColor: `${skill.color}33`, borderColor: skill.color, borderWidth: 1 }}
                >
                  <span style={{ color: skill.color }}>{skill.name[0]}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-[11px] font-semibold text-cyan-300">
                  {skill.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {skill.name}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {skill.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Mastery</span>
                <span className="text-cyan-400 font-mono">{skill.proficiency}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${skill.proficiency}%`, backgroundColor: skill.color }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>{skill.experience}</span>
                <span className="text-cyan-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  {skill.projectsUsedIn.length} Projects
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
