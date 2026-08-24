import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const spotlightX = (x / rect.width) * 100;
    const spotlightY = (y / rect.height) * 100;
    setSpotlightPos({ x: spotlightX, y: spotlightY });

    // Calculate subtle 3D tilt (range -5 to +5 deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 5;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-1000">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        whileHover={{ y: -6, scale: 1.01 }}
        className={`relative glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-[#0c101d]/90 hover:border-cyan-400/50 hover:shadow-[0_20px_50px_-10px_rgba(0,242,254,0.25)] transition-all cursor-pointer ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Spotlight Radial Light Follow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(0, 242, 254, 0.18), transparent 45%)`,
          }}
        />

        <div className="relative z-20 h-full">{children}</div>
      </motion.div>
    </div>
  );
};


