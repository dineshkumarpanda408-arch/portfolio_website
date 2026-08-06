import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioConfig, Achievement } from '../../../config/portfolioConfig';
import { soundFx } from '../../../utils/soundEffects';

interface ResearchIslandProps {
  onSelect: () => void;
  onPaperClick?: (paper: any) => void;
  isActive: boolean;
}

export const ResearchIsland: React.FC<ResearchIslandProps> = ({
  onSelect,
  isActive,
}) => {
  const bookRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (bookRef.current) {
      bookRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group position={[-22, 1, 14]} onClick={onSelect}>
      <Float speed={1.9} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Island Platform */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[6, 4.8, 1.4, 8]} />
          <meshStandardMaterial
            color={isActive ? '#10b981' : '#047857'}
            roughness={0.5}
            metalness={0.4}
          />
        </mesh>

        {/* Lower Rock Roots */}
        <mesh position={[0, -2, 0]}>
          <coneGeometry args={[4.8, 4, 8]} />
          <meshStandardMaterial color="#064e3b" flatShading />
        </mesh>

        {/* Island Title */}
        <Text
          position={[0, 4.6, 0]}
          fontSize={1.2}
          color="#34d399"
          anchorX="center"
          anchorY="middle"
        >
          ACADEMIC HONORS
        </Text>

        {/* Central Holographic Open Book Structure */}
        <group ref={bookRef} position={[0, 2, 0]}>
          <Float speed={2.2} floatIntensity={0.5}>
            {/* Book Spine & Cover */}
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[2.4, 0.2, 1.6]} />
              <meshStandardMaterial
                color="#059669"
                emissive="#10b981"
                emissiveIntensity={0.6}
              />
            </mesh>
            {/* Left Page Wing */}
            <mesh position={[-0.6, 0.3, 0]} rotation={[0, 0, 0.2]}>
              <boxGeometry args={[1.1, 0.05, 1.4]} />
              <meshStandardMaterial color="#ecfdf5" roughness={0.2} />
            </mesh>
            {/* Right Page Wing */}
            <mesh position={[0.6, 0.3, 0]} rotation={[0, 0, -0.2]}>
              <boxGeometry args={[1.1, 0.05, 1.4]} />
              <meshStandardMaterial color="#ecfdf5" roughness={0.2} />
            </mesh>
          </Float>
        </group>

        {/* Floating Achievement Nodes */}
        <group position={[0, 1.5, 0]}>
          {portfolioConfig.achievements.map((item, idx) => {
            const count = portfolioConfig.achievements.length;
            const angle = (idx / count) * Math.PI * 2 + Math.PI / 4;
            const radius = 3.6;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            return (
              <group key={item.id} position={[x, 0.4, z]}>
                <Float speed={2} floatIntensity={0.3}>
                  <mesh>
                    <boxGeometry args={[1.8, 1.2, 0.1]} />
                    <meshStandardMaterial
                      color="#065f46"
                      emissive="#10b981"
                      emissiveIntensity={0.5}
                    />
                  </mesh>
                  <Text
                    position={[0, 0.1, 0.08]}
                    fontSize={0.18}
                    color="#ffffff"
                    maxWidth={1.6}
                    textAlign="center"
                  >
                    {item.title}
                  </Text>
                  <Text
                    position={[0, -0.3, 0.08]}
                    fontSize={0.14}
                    color="#34d399"
                  >
                    {item.badge}
                  </Text>
                </Float>
              </group>
            );
          })}
        </group>
      </Float>
    </group>
  );
};
