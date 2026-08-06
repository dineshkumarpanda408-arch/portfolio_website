import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { soundFx } from '../../utils/soundEffects';

interface FloatingKeyWidgetProps {
  onClick: () => void;
}

export const FloatingKeyWidget: React.FC<FloatingKeyWidgetProps> = ({ onClick }) => {
  return (
    <div
      onClick={() => {
        soundFx.playClick();
        onClick();
      }}
      onMouseEnter={() => soundFx.playHover()}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 cursor-pointer group"
      title="Open Command Palette (Ctrl+K)"
    >
      {/* Glow Backdrop */}
      <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-lg group-hover:bg-cyan-400/40 transition-all" />

      {/* R3F 3D Enter Key Container */}
      <div className="relative w-full h-full glass-panel rounded-2xl border border-cyan-400/40 shadow-xl overflow-hidden">
        <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f2fe" />
          <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
            <group rotation={[0.4, 0.4, 0]}>
              <mesh castShadow>
                <boxGeometry args={[1.5, 0.6, 1.5]} />
                <meshStandardMaterial color="#0f172a" emissive="#0284c7" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
              </mesh>
              <Text position={[0, 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.35} color="#00f2fe" anchorX="center" anchorY="middle">
                ↵
              </Text>
            </group>
          </Float>
        </Canvas>

        {/* Small Tooltip Badge */}
        <div className="absolute bottom-1 right-1 px-1 rounded bg-slate-900/90 text-[9px] font-mono text-cyan-300">
          ⌘K
        </div>
      </div>
    </div>
  );
};
