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
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;
    
    setRotateX(rotX);
    setRotateY(rotY);

    const spotlightX = (x / rect.width) * 100;
    const spotlightY = (y / rect.height) * 100;
    setSpotlightPos({ x: spotlightX, y: spotlightY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-[#0c101d]/90 hover:border-cyan-400/50 transition-all ${className}`}
    >
      {/* Spotlight Radial Light Follow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(0, 242, 254, 0.15), transparent 40%)`,
        }}
      />
      
      <div className="relative z-20 h-full">{children}</div>
    </motion.div>
  );
};
