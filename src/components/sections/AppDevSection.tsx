import React, { useState } from 'react';
import { Smartphone, CheckCircle2, ChevronRight, Wifi, Battery, Signal, Zap } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

export const AppDevSection: React.FC = () => {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const currentApp = portfolioConfig.mobileApps[activeAppIndex];

  return (
    <section id="app-dev" className="relative w-full py-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Smartphone className="w-3.5 h-3.5 text-blue-400" />
          <span>Mobile App Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Mobile Application Engineering
        </h2>
        <p className="text-slate-400 text-sm mt-3">
          Cross-platform Flutter & Dart mobile applications showcasing health metric calculations and intelligent eligibility workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Pure CSS Smartphone Preview Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-sm glass-panel p-6 rounded-[2.5rem] border border-cyan-400/30 shadow-2xl bg-[#0c101d] space-y-6">
            {/* Phone Notch & Status Header */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 px-2 border-b border-white/10 pb-3">
              <span className="font-mono font-bold text-white">9:41 AM</span>
              <div className="w-20 h-4 bg-slate-900 rounded-full border border-white/10 mx-auto" />
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* App Screen Content Preview */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-mono">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>Flutter / Dart Mobile App</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                {currentApp.title}
              </h3>
              <p className="text-xs text-cyan-400 font-mono font-semibold">
                {currentApp.subtitle}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentApp.description}
              </p>
            </div>

            {/* Features Badge Grid */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Mobile App Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentApp.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 text-xs flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-[11px]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive App Switcher & Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4">
            {portfolioConfig.mobileApps.map((app, idx) => {
              const isActive = idx === activeAppIndex;
              return (
                <div
                  key={app.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveAppIndex(idx);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900/90 border-cyan-400/50 shadow-2xl scale-[1.02]'
                      : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>{app.title}</span>
                      {isActive && <ChevronRight className="w-4 h-4 text-cyan-400" />}
                    </h3>
                    <span className="text-xs text-cyan-300 font-mono">{app.subtitle}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {app.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {app.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-white/10 text-slate-300 text-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
