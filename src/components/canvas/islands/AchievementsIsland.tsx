import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioConfig, Achievement } from '../../../config/portfolioConfig';
import { soundFx } from '../../../utils/soundEffects';

interface AchievementsIslandProps {
  onSelect: () => void;
  onAchievementClick: (item: Achievement) => void;
  isActive: boolean;
}

export const AchievementsIsland: React.FC<AchievementsIslandProps> = ({
  onSelect,
  onAchievementClick,
  isActive,
}) => {
  const obeliskRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (obeliskRef.current) {
      obeliskRef.current.rotation.y += delta * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group position={[22, -1, 14]} onClick={onSelect}>
      <Float speed={1.7} rotationIntensity={0.15} floatIntensity={0.4}>
        {/* Main Base Platform */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[6, 5, 1.4, 8]} />
          <meshStandardMaterial
            color={isActive ? '#fbbf24' : '#b45309'}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>

        {/* Lower Rock Roots */}
        <mesh position={[0, -2, 0]}>
          <coneGeometry args={[5, 4, 8]} />
          <meshStandardMaterial color="#78350f" flatShading />
        </mesh>

        {/* Island Title */}
        <Text
          position={[0, 5, 0]}
          fontSize={1.2}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          HALL OF ACHIEVEMENTS
        </Text>

        {/* Central Futuristic Obelisk Monument */}
        <mesh ref={obeliskRef} position={[0, 2.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.8, 3.5, 6]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#fbbf24"
            emissiveIntensity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Floating Illuminated Achievement Nodes */}
        <group ref={ringRef} position={[0, 1.6, 0]}>
          {portfolioConfig.achievements.map((item, idx) => {
            const count = portfolioConfig.achievements.length;
            const angle = (idx / count) * Math.PI * 2;
            const radius = 3.8;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            return (
              <group key={item.id} position={[x, 0, z]}>
                <Float speed={2} floatIntensity={0.4}>
                  <mesh
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playClick();
                      onAchievementClick(item);
                    }}
                    onPointerOver={(e) => {
                      e.stopPropagation();
                      soundFx.playHover();
                    }}
                    scale={0.6}
                  >
                    <octahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial
                      color="#f59e0b"
                      emissive="#fbbf24"
                      emissiveIntensity={0.8}
                    />
                  </mesh>
                  <Text
                    position={[0, -0.8, 0]}
                    fontSize={0.25}
                    color="#ffffff"
                    anchorX="center"
                    maxWidth={2.2}
                    textAlign="center"
                  >
                    {item.title}
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
