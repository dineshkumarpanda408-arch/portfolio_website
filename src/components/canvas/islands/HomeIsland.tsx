import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { soundFx } from '../../../utils/soundEffects';

interface HomeIslandProps {
  onSelect: () => void;
  isActive: boolean;
}

export const HomeIsland: React.FC<HomeIslandProps> = ({ onSelect, isActive }) => {
  const crystalRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const treesRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.8;
      crystalRef.current.rotation.x += delta * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.6;
      ringRef.current.rotation.y += delta * 0.4;
    }
    if (treesRef.current) {
      treesRef.current.children.forEach((tree, idx) => {
        tree.rotation.z = Math.sin(Date.now() * 0.002 + idx) * 0.05;
      });
    }
  });

  const handleCrystalClick = (e: any) => {
    e.stopPropagation();
    soundFx.playCrystalPulse();
    onSelect();
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Main Floating Landmass */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Top Grass Surface */}
        <mesh position={[0, 0, 0]} receiveShadow onClick={onSelect}>
          <cylinderGeometry args={[5.5, 4.5, 1.2, 8]} />
          <meshStandardMaterial
            color={isActive ? '#0f3854' : '#0a233c'}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>

        {/* Lower Rock Roots */}
        <mesh position={[0, -1.8, 0]} receiveShadow>
          <coneGeometry args={[4.5, 3.5, 8]} />
          <meshStandardMaterial color="#0c1829" roughness={0.9} flatShading />
        </mesh>

        {/* Outer Glowing Energy Rim */}
        <mesh position={[0, 0.61, 0]}>
          <ringGeometry args={[5.2, 5.5, 32]} />
          <meshBasicMaterial color="#00f2fe" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>

        {/* Central Rotating Futuristic AI Crystal */}
        <group position={[0, 2.2, 0]}>
          <Float speed={3} rotationIntensity={0.5} floatIntensity={0.6}>
            <mesh
              ref={crystalRef}
              onClick={handleCrystalClick}
              onPointerOver={() => soundFx.playHover()}
              castShadow
            >
              <octahedronGeometry args={[1.2, 0]} />
              <meshStandardMaterial
                color="#00f2fe"
                emissive="#00f2fe"
                emissiveIntensity={0.8}
                roughness={0.1}
                metalness={0.9}
                wireframe={false}
              />
            </mesh>

            {/* Orbital Holographic Ring */}
            <mesh ref={ringRef}>
              <torusGeometry args={[1.8, 0.04, 16, 32]} />
              <meshStandardMaterial color="#9d4edd" emissive="#9d4edd" emissiveIntensity={1} />
            </mesh>

            {/* Crystal Core Point Light */}
            <pointLight color="#00f2fe" intensity={3} distance={12} />
          </Float>
        </group>

        {/* Stylized Low-Poly Wind-Blowing Trees */}
        <group ref={treesRef}>
          {/* Tree 1 */}
          <group position={[-3.2, 1.2, -2]}>
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.15, 0.25, 1.2, 6]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0.6, 0]}>
              <coneGeometry args={[1, 2, 6]} />
              <meshStandardMaterial color="#0284c7" roughness={0.4} flatShading />
            </mesh>
          </group>

          {/* Tree 2 */}
          <group position={[3.5, 1.2, 1.8]}>
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.15, 0.25, 1.2, 6]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0.6, 0]}>
              <coneGeometry args={[1.2, 2.2, 6]} />
              <meshStandardMaterial color="#7c3aed" roughness={0.4} flatShading />
            </mesh>
          </group>

          {/* Tree 3 */}
          <group position={[-2.8, 1.2, 2.8]}>
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.12, 0.2, 1, 6]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
              <coneGeometry args={[0.9, 1.8, 6]} />
              <meshStandardMaterial color="#06b6d4" roughness={0.4} flatShading />
            </mesh>
          </group>
        </group>

        {/* Floating Mini Debris Rocks */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 7.5, -2 - (i % 2), Math.sin(angle) * 7.5]}>
              <dodecahedronGeometry args={[0.4 + (i % 2) * 0.2, 0]} />
              <meshStandardMaterial color="#0f172a" flatShading />
            </mesh>
          );
        })}
      </Float>
    </group>
  );
};
