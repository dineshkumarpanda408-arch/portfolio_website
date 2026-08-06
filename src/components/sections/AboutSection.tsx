import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Code, Award, GraduationCap, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolioConfig';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full py-24 px-4 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Floating Code Snippet Particles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 text-cyan-400 font-mono text-sm">
          {"const student = new DineshPanda({ university: 'NIST', major: 'CSE' });"}
        </div>
        <div className="absolute bottom-10 right-10 text-purple-400 font-mono text-sm">
          {"await student.buildMERNApp({ target: 'Render Live Production' });"}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: 3D Pop-Out Photo Card */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            whileHover={{ rotateY: 8, rotateX: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-full max-w-sm glass-panel p-4 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#0c101d]/90 group"
          >
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-cyan-400/40">
              <img
                src={portfolioConfig.profile.photoUrl}
                alt={portfolioConfig.profile.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c101d] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {portfolioConfig.profile.location}
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  {portfolioConfig.profile.name}
                </h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Executive Summary */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Candidate Summary & Profile</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Computer Science Student (B.Tech, NIST University)
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            {portfolioConfig.profile.summary}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="glass-card p-4 rounded-2xl border border-white/10 text-center">
              <GraduationCap className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <div className="text-lg font-extrabold text-white font-mono">2024–2028</div>
              <div className="text-[11px] text-slate-400 font-medium">NIST University</div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/10 text-center">
              <Code className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <div className="text-lg font-extrabold text-white font-mono">MERN + AI</div>
              <div className="text-[11px] text-slate-400 font-medium">Stack Focus</div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/10 text-center">
              <Award className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <div className="text-lg font-extrabold text-white font-mono">Render</div>
              <div className="text-[11px] text-slate-400 font-medium">Live Deployed</div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/10 text-center">
              <Sparkles className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <div className="text-lg font-extrabold text-white font-mono">8+</div>
              <div className="text-[11px] text-slate-400 font-medium">Core Languages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Timeline */}
      <div className="pt-8 border-t border-white/10 space-y-6">
        <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-cyan-400" />
          <span>Educational Background</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioConfig.education.map((edu) => (
            <div
              key={edu.id}
              className="glass-panel p-6 rounded-3xl border border-white/10 bg-[#0c101d] space-y-3"
            >
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
                {edu.period}
              </span>
              <h4 className="text-base font-bold text-white leading-snug">
                {edu.degree}
              </h4>
              <p className="text-xs text-slate-400 font-semibold">{edu.institution}, {edu.location}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{edu.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
