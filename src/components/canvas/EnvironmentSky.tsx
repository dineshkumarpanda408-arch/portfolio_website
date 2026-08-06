import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface EnvironmentSkyProps {
  isNight: boolean;
}

export const EnvironmentSky: React.FC<EnvironmentSkyProps> = ({ isNight }) => {
  const cloudsRef = useRef<THREE.Group>(null);
  const birdsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.015;
    }
    if (birdsRef.current) {
      birdsRef.current.children.forEach((bird, idx) => {
        bird.position.x += Math.sin(Date.now() * 0.001 + idx) * 0.02;
        bird.position.y += Math.cos(Date.now() * 0.0015 + idx) * 0.01;
      });
    }
  });

  return (
    <>
      {/* Background Color & Fog */}
      <color attach="background" args={[isNight ? '#050711' : '#0b132b']} />
      <fog attach="fog" args={[isNight ? '#070a1a' : '#1c2541', 20, 95]} />

      {/* Ambient & Directional Lights */}
      <ambientLight intensity={isNight ? 0.35 : 0.75} color={isNight ? '#6c5ce7' : '#e0e7ff'} />
      
      {/* Main Directional Sun / Moon Light */}
      <directionalLight
        position={[25, 45, 20]}
        intensity={isNight ? 0.6 : 1.6}
        color={isNight ? '#a29bfe' : '#ffffff'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Soft Cyan & Purple Accent Rim Lights */}
      <pointLight position={[-30, 20, -20]} intensity={1.5} color="#00f2fe" distance={70} />
      <pointLight position={[30, -10, 20]} intensity={1.2} color="#9d4edd" distance={60} />

      {/* Night Stars */}
      {isNight && <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1.5} />}

      {/* Floating Sparkles / Sunlight Dust Particles */}
      <Sparkles
        count={250}
        scale={[80, 40, 80]}
        size={4}
        speed={0.4}
        opacity={isNight ? 0.7 : 0.5}
        color={isNight ? '#9d4edd' : '#00f2fe'}
      />

      {/* Volumetric Moving Cloud Puff Layer */}
      <group ref={cloudsRef} position={[0, -8, 0]}>
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i / 18) * Math.PI * 2;
          const radius = 35 + Math.random() * 20;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = -5 + (i % 5) * 2;
          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[4 + (i % 3) * 2, 16, 16]} />
              <meshStandardMaterial
                color={isNight ? '#1e1b4b' : '#38bdf8'}
                transparent
                opacity={0.25}
                roughness={0.9}
              />
            </mesh>
          );
        })}
      </group>

      {/* Distant Flying Bird Silhouettes */}
      <group ref={birdsRef} position={[0, 15, -30]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[(i - 3) * 8, (i % 2) * 3, -i * 4]}>
            <coneGeometry args={[0.3, 1.2, 3]} />
            <meshBasicMaterial color="#38bdf8" wireframe opacity={0.6} transparent />
          </mesh>
        ))}
      </group>
    </>
  );
};
