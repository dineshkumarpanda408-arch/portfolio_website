import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, ExternalLink, Github, Globe, Terminal, Code2 } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

export const WebDevSection: React.FC = () => {
  const primaryWeb = portfolioConfig.webDevShowcases[0];

  return (
    <section id="web-dev" className="relative w-full py-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Monitor className="w-3.5 h-3.5 text-cyan-400" />
          <span>Full-Stack Web Engineering</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Web Systems & Interactive Applications
        </h2>
        <p className="text-slate-400 text-sm mt-3">
          High-performance web applications built with React, MERN stack, TypeScript, and Tailwind CSS.
        </p>
      </div>

      {/* Grid of Web Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {portfolioConfig.webDevShowcases.map((web) => (
          <motion.div
            key={web.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel rounded-3xl border border-white/15 shadow-2xl overflow-hidden bg-[#0c101d] group hover:border-cyan-400/40 transition-all"
          >
            {/* macOS Browser Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 text-slate-300 text-[11px] font-mono border border-white/5 max-w-[240px] truncate">
                <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">{web.url}</span>
              </div>
            </div>

            {/* Browser Content Header Box */}
            <div className="p-6 bg-gradient-to-br from-slate-900/90 to-slate-950 border-b border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  Live Web Application
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
                  Production Ready
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {web.title}
              </h3>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {web.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {web.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300 text-[11px] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                {web.liveUrl ? (
                  <a
                    href={web.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch Live Site</span>
                  </a>
                ) : <span className="text-xs text-slate-500 font-mono">Source Repository</span>}
                <a
                  href={web.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
