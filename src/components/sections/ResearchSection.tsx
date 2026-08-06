import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Calendar, Trophy, MapPin, CheckCircle2 } from 'lucide-react';
import { portfolioConfig, Achievement } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

interface ResearchSectionProps {
  onSelectPaper?: (paper: any) => void;
  onSelectAchievement: (achievement: Achievement) => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({
  onSelectAchievement,
}) => {
  return (
    <section id="research" className="relative w-full py-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Academic Foundation & Honors</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Education & Hall of Achievements
        </h2>
        <p className="text-slate-400 text-sm mt-3">
          Academic excellence at NIST University, production software deployments, and educational distinction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Academic Education */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <span>Academic Education</span>
          </h3>

          <div className="space-y-4">
            {portfolioConfig.education.map((edu) => (
              <motion.div
                key={edu.id}
                whileHover={{ y: -2 }}
                className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-emerald-400/40 transition-all bg-[#0c101d] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300">
                    {edu.period}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {edu.location}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white leading-snug">
                  {edu.degree}
                </h4>

                <p className="text-xs text-slate-400 font-mono">
                  {edu.institution}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-white/10">
                  {edu.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Achievements & Awards Timeline */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Honors & Deployments</span>
          </h3>

          <div className="space-y-4">
            {portfolioConfig.achievements.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectAchievement(item);
                }}
                className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer bg-[#0c101d]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300">
                    {item.badge}
                  </span>
                  <span className="text-[11px] text-slate-400">{item.date}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                <p className="text-[11px] text-slate-400 mb-1.5">{item.issuer}</p>
                <p className="text-xs text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
