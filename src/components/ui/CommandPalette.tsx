import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Compass, Cpu, FolderGit2, Smartphone, Monitor, Sparkles, BookOpen, GraduationCap, Send, FileText, Github, Linkedin, Copy, Check } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Quick Action' | 'Social Channels';
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
}) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const commands: CommandItem[] = [
    {
      id: 'nav-home',
      title: 'Go to Home (3D Keyboard Hero)',
      category: 'Navigation',
      icon: Compass,
      action: () => onNavigateSection('home'),
    },
    {
      id: 'nav-about',
      title: 'Go to About Me',
      category: 'Navigation',
      icon: Compass,
      action: () => onNavigateSection('about'),
    },
    {
      id: 'nav-skills',
      title: 'Go to Skills Showcase',
      category: 'Navigation',
      icon: Cpu,
      action: () => onNavigateSection('skills'),
    },
    {
      id: 'nav-projects',
      title: 'Go to Featured Projects',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => onNavigateSection('projects'),
    },
    {
      id: 'nav-appdev',
      title: 'Go to App Development (Mobile Mockups)',
      category: 'Navigation',
      icon: Smartphone,
      action: () => onNavigateSection('app-dev'),
    },
    {
      id: 'nav-webdev',
      title: 'Go to Web Development Showcase',
      category: 'Navigation',
      icon: Monitor,
      action: () => onNavigateSection('web-dev'),
    },
    {
      id: 'nav-animations',
      title: 'Go to Animation Showcase',
      category: 'Navigation',
      icon: Sparkles,
      action: () => onNavigateSection('animations'),
    },
    {
      id: 'nav-research',
      title: 'Go to Honors & Education',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => onNavigateSection('research'),
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact Section',
      category: 'Navigation',
      icon: Send,
      action: () => onNavigateSection('contact'),
    },
    {
      id: 'action-resume',
      title: 'Download Resume (PDF)',
      category: 'Quick Action',
      icon: FileText,
      action: () => window.open(portfolioConfig.profile.resumeUrl, '_blank'),
    },
    {
      id: 'action-copy-email',
      title: 'Copy Dinesh Email Address',
      category: 'Quick Action',
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(portfolioConfig.contact.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: 'social-github',
      title: 'Open GitHub Profile',
      category: 'Social Channels',
      icon: Github,
      action: () => window.open(portfolioConfig.profile.socials.github, '_blank'),
    },
    {
      id: 'social-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'Social Channels',
      icon: Linkedin,
      action: () => window.open(portfolioConfig.profile.socials.linkedin, '_blank'),
    },
  ];

  const filteredCommands = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleExec = (cmd: CommandItem) => {
    soundFx.playClick();
    cmd.action();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-xl bg-[#0c101d] rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[500px]"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3 bg-slate-900/90">
            <Search className="w-4 h-4 text-cyan-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command or search section (e.g. Projects, Resume)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-slate-100 text-xs focus:outline-none placeholder:text-slate-500 font-mono"
            />
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filtered Command List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 font-mono text-xs">
            {filteredCommands.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                No matching commands found.
              </div>
            ) : (
              filteredCommands.map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => handleExec(cmd)}
                    onMouseEnter={() => soundFx.playHover()}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-cyan-500/15 hover:border-cyan-400/30 border border-transparent text-slate-200 hover:text-cyan-300 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>{cmd.title}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-white/5">
                      {cmd.category}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>VS Code Command Palette</span>
            <span>ESC to Close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
