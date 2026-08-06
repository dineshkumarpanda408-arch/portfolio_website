import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { soundFx } from '../../../utils/soundEffects';

interface ContactIslandProps {
  onSelect: () => void;
  isActive: boolean;
}

export const ContactIsland: React.FC<ContactIslandProps> = ({ onSelect, isActive }) => {
  const boatRef = useRef<THREE.Group>(null);
  const waterfallParticlesRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (boatRef.current) {
      boatRef.current.position.x = Math.sin(Date.now() * 0.001) * 0.8;
      boatRef.current.rotation.z = Math.sin(Date.now() * 0.0015) * 0.08;
    }
    if (waterfallParticlesRef.current) {
      waterfallParticlesRef.current.children.forEach((drop) => {
        drop.position.y -= delta * 3;
        if (drop.position.y < -3.5) {
          drop.position.y = 0.5;
        }
      });
    }
  });

  return (
    <group position={[0, -2, 26]} onClick={onSelect}>
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.35}>
        {/* Main Base Island Platform */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[6.5, 5, 1.4, 8]} />
          <meshStandardMaterial
            color={isActive ? '#38bdf8' : '#0284c7'}
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>

        {/* Lower Rock Roots */}
        <mesh position={[0, -2, 0]}>
          <coneGeometry args={[5, 4, 8]} />
          <meshStandardMaterial color="#0c4a6e" flatShading />
        </mesh>

        {/* Island Title */}
        <Text
          position={[0, 4.8, 0]}
          fontSize={1.2}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
        >
          CONTACT HAVEN
        </Text>

        {/* Low-Poly Water Pond */}
        <mesh position={[0, 0.71, 1]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.5, 16]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#38bdf8"
            emissiveIntensity={0.5}
            roughness={0.1}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Stylized Floating Boat */}
        <group ref={boatRef} position={[0, 0.85, 1]}>
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.5, 1.4, 4]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          {/* Sail */}
          <mesh position={[0, 0.6, 0]}>
            <coneGeometry args={[0.3, 0.9, 3]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>

        {/* Waterfall Particle Streams */}
        <group ref={waterfallParticlesRef} position={[3.2, 0, 0]}>
          {Array.from({ length: 15 }).map((_, i) => (
            <mesh key={i} position={[(i % 3) * 0.2 - 0.2, - (i % 5) * 0.6, Math.random() * 0.4]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
            </mesh>
          ))}
        </group>

        {/* Glowing Contact Beacon */}
        <group position={[-2.8, 1.8, -1.8]}>
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playCrystalPulse();
              onSelect();
            }}
            onPointerOver={() => soundFx.playHover()}
          >
            <octahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
          </mesh>
          <pointLight color="#38bdf8" intensity={2.5} distance={10} />
        </group>
      </Float>
    </group>
  );
};
