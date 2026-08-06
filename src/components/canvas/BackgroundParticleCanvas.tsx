import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

const ParticleMesh: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group>
      <Sparkles
        count={200}
        scale={[40, 40, 40]}
        size={4}
        speed={0.6}
        color="#00f2fe"
        opacity={0.4}
      />
      <Sparkles
        count={150}
        scale={[30, 30, 30]}
        size={3}
        speed={0.4}
        color="#9d4edd"
        opacity={0.35}
      />
    </group>
  );
};

export const BackgroundParticleCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <ParticleMesh />
        </Float>
      </Canvas>
    </div>
  );
};
