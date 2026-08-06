import React from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-3 right-6 z-10 hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-slate-400 text-xs">
      <span>© 2026 Dinesh Kumar Panda</span>
      <span className="text-slate-600">•</span>
      <div className="flex items-center gap-2">
        <a
          href={portfolioConfig.profile.socials.github}
          target="_blank"
          rel="noreferrer"
          onClick={() => soundFx.playClick()}
          className="hover:text-cyan-400 transition-colors"
          title="GitHub"
        >
          <Github className="w-3.5 h-3.5" />
        </a>
        <a
          href={portfolioConfig.profile.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          onClick={() => soundFx.playClick()}
          className="hover:text-cyan-400 transition-colors"
          title="LinkedIn"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </a>
        <a
          href={portfolioConfig.profile.socials.email}
          onClick={() => soundFx.playClick()}
          className="hover:text-cyan-400 transition-colors"
          title="Email"
        >
          <Mail className="w-3.5 h-3.5" />
        </a>
        <a
          href={portfolioConfig.profile.resumeUrl}
          onClick={() => soundFx.playClick()}
          className="hover:text-cyan-400 transition-colors"
          title="Resume"
        >
          <FileText className="w-3.5 h-3.5" />
        </a>
      </div>
    </footer>
  );
};
