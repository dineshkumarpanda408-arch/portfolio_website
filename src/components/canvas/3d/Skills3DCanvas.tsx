import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioConfig, Skill } from '../../../config/portfolioConfig';
import { soundFx } from '../../../utils/soundEffects';

interface SkillCubeProps {
  skill: Skill;
  position: [number, number, number];
}

const SkillCube: React.FC<SkillCubeProps> = ({ skill, position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const speed = hovered ? 2.5 : 0.8;
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.y += delta * speed * 0.8;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            soundFx.playHover();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            soundFx.playClick();
          }}
          scale={hovered ? 1.25 : 1}
          castShadow
        >
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hovered ? 1.2 : 0.5}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Outer Wireframe Box */}
        <mesh scale={hovered ? 1.4 : 1.15}>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshBasicMaterial color={skill.color} wireframe transparent opacity={0.6} />
        </mesh>

        {/* Skill Label Below Cube */}
        <Text
          position={[0, -1.3, 0]}
          fontSize={0.32}
          color="#ffffff"
          anchorX="center"
          anchorY="top"
        >
          {skill.name}
        </Text>
      </Float>
    </group>
  );
};

export const Skills3DCanvas: React.FC = () => {
  return (
    <div className="w-full h-80 sm:h-96 my-8 rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-2xl relative bg-slate-950/80">
      <div className="absolute top-4 left-6 z-10 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        Interactive 3D WebGL Glass Cubes (Drag / Hover)
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f2fe" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#9d4edd" />

        <group position={[0, 0, 0]}>
          {portfolioConfig.skills.map((skill, idx) => {
            const count = portfolioConfig.skills.length;
            const angle = (idx / count) * Math.PI * 2;
            const radius = 6.2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (idx % 2 === 0 ? 0.6 : -0.6);

            return (
              <SkillCube
                key={skill.id}
                skill={skill}
                position={[x, y, z]}
              />
            );
          })}
        </group>
      </Canvas>
    </div>
  );
};
