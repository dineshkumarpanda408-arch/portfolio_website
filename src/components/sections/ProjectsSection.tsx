import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Github, TrendingUp, ArrowUpRight } from 'lucide-react';
import { portfolioConfig, Project } from '../../config/portfolioConfig';
import { Interactive3DCard } from '../ui/Interactive3DCard';
import { soundFx } from '../../utils/soundEffects';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  return (
    <section id="projects" className="relative w-full py-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Apple Bento Grid Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Featured Engineering Projects
        </h2>
        <p className="text-slate-400 text-sm mt-3">
          Explore high-throughput systems, AI platforms, and real-time telemetry dashboards.
        </p>
      </div>

      {/* Grid of 3D Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioConfig.projects.map((project) => (
          <Interactive3DCard
            key={project.id}
            onClick={() => {
              soundFx.playClick();
              onSelectProject(project);
            }}
            className="group flex flex-col justify-between"
          >
            {/* Image Preview Container */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c101d] via-[#0c101d]/30 to-transparent" />
              
              {project.metrics && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-400/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{project.metrics}</span>
                </div>
              )}

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4">
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                {project.shortDesc}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300 text-[11px] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Quick Action Links */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold">
                <span className="text-cyan-400 group-hover:underline">
                  Click to Expand Technical Specs →
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playClick();
                    }}
                    className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400"
                    title="Source Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                      }}
                      className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Interactive3DCard>
        ))}
      </div>
    </section>
  );
};
