import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { Skill } from '../../config/portfolioConfig';

interface SkillTooltipProps {
  skill: Skill;
}

export const SkillTooltip: React.FC<SkillTooltipProps> = ({ skill }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-10 right-6 md:right-12 z-30 max-w-sm w-full pointer-events-none"
    >
      <div className="glass-panel p-6 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-4 h-4 rounded-full shadow-lg"
              style={{ backgroundColor: skill.color }}
            />
            <h3 className="text-xl font-bold text-white tracking-tight">
              {skill.name}
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-white/10 text-[11px] font-semibold text-cyan-300">
            {skill.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 mb-4 leading-relaxed font-normal">
          {skill.description}
        </p>

        {/* Proficiency Bar */}
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-400">Proficiency Mastery</span>
            <span className="text-cyan-400">{skill.proficiency}%</span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full border border-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ duration: 0.6 }}
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
            />
          </div>
        </div>

        {/* Experience & Projects */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-medium text-slate-400">
          <span>Experience: <strong className="text-slate-200">{skill.experience}</strong></span>
          <span className="text-cyan-300 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Used in {skill.projectsUsedIn.length} Projects
          </span>
        </div>
      </div>
    </motion.div>
  );
};
