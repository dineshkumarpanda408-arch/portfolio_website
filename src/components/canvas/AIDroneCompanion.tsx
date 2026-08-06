import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { IslandId } from './CameraController';
import { portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

interface AIDroneCompanionProps {
  activeIsland: IslandId;
  onOpenChat: () => void;
  greetingMessage: string;
}

const ISLAND_DRONE_POSITIONS: Record<IslandId, [number, number, number]> = {
  home: [3.5, 3.2, 2],
  projects: [-14.5, 5, -13],
  skills: [14.5, 5.5, -13],
  achievements: [18.5, 3.5, 16],
  research: [-18.5, 4.5, 16],
  contact: [3.5, 2.5, 28],
};

export const AIDroneCompanion: React.FC<AIDroneCompanionProps> = ({
  activeIsland,
  onOpenChat,
  greetingMessage,
}) => {
  const droneRef = useRef<THREE.Group>(null);
  const targetPos = useRef(new THREE.Vector3(...ISLAND_DRONE_POSITIONS.home));
  const eyeLightRef = useRef<THREE.PointLight>(null);

  // Update target position based on island
  React.useEffect(() => {
    const pos = ISLAND_DRONE_POSITIONS[activeIsland] || ISLAND_DRONE_POSITIONS.home;
    targetPos.current.set(...pos);
  }, [activeIsland]);

  useFrame((_, delta) => {
    if (droneRef.current) {
      // Smoothly drift towards active island drone position
      droneRef.current.position.lerp(targetPos.current, delta * 2);
      droneRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group ref={droneRef} position={ISLAND_DRONE_POSITIONS.home}>
      <Float speed={3} rotationIntensity={0.4} floatIntensity={0.8}>
        <group
          onClick={(e) => {
            e.stopPropagation();
            soundFx.playClick();
            onOpenChat();
          }}
          onPointerOver={() => soundFx.playHover()}
        >
          {/* Drone Head Body */}
          <mesh castShadow>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#00f2fe"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Holographic Glowing Visor / Eye */}
          <mesh position={[0, 0, 0.38]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="#00f2fe" />
          </mesh>

          {/* Eye Light */}
          <pointLight ref={eyeLightRef} color="#00f2fe" intensity={2} distance={4} />

          {/* Holographic Orbital Outer Ring */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.7, 0.03, 16, 32]} />
            <meshStandardMaterial color="#9d4edd" emissive="#9d4edd" emissiveIntensity={1} />
          </mesh>

          {/* Speech Bubble Greeting */}
          <Html position={[0, 0.9, 0]} center distanceFactor={15}>
            <div
              onClick={onOpenChat}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 shadow-lg text-cyan-300 text-xs font-medium whitespace-nowrap cursor-pointer hover:border-cyan-400 transition-all transform hover:scale-105 flex items-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{greetingMessage || portfolioConfig.aiAssistant.greetings[0]}</span>
              <span className="text-[10px] text-purple-300 opacity-75 group-hover:opacity-100">
                [Ask AI]
              </span>
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
};
