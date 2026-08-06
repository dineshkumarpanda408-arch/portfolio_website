import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LOADING_STEPS = [
  "Sculpting Floating Islands...",
  "Igniting AI Crystal Core...",
  "Generating Atmospheric Clouds...",
  "Launching Dinesh's Portfolio Universe..."
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            soundFx.playCrystalPulse();
            onComplete();
          }, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const currentStep = Math.min(
          Math.floor((next / 100) * LOADING_STEPS.length),
          LOADING_STEPS.length - 1
        );
        setStepIndex(currentStep);
        return Math.min(next, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070913] text-white overflow-hidden"
    >
      {/* Background Glowing Orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* Animated Compass Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 mb-6 rounded-2xl bg-slate-900/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(0,242,254,0.3)]"
        >
          <Compass className="w-8 h-8" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-gradient">
          Dinesh Kumar Panda
        </h1>
        <p className="text-sm text-cyan-400 font-medium tracking-widest uppercase mb-8">
          3D Floating Archipelago Portfolio
        </p>

        {/* Progress Bar Container */}
        <div className="w-full h-2.5 bg-slate-900 rounded-full border border-slate-800 p-0.5 overflow-hidden mb-4 shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>

        {/* Step Status & Percentage */}
        <div className="flex items-center justify-between w-full text-xs font-medium text-slate-400">
          <AnimatePresence mode="wait">
            <motion.span
              key={stepIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-1.5 text-cyan-300"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              {LOADING_STEPS[stepIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="font-mono text-cyan-400">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};
