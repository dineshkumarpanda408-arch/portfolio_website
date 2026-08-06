import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioConfig, Skill } from '../../../config/portfolioConfig';
import { soundFx } from '../../../utils/soundEffects';

interface SkillsIslandProps {
  onSelect: () => void;
  onSkillHover: (skill: Skill | null) => void;
  selectedSkill: Skill | null;
  isActive: boolean;
}

export const SkillsIsland: React.FC<SkillsIslandProps> = ({
  onSelect,
  onSkillHover,
  selectedSkill,
  isActive,
}) => {
  const groupOrbsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupOrbsRef.current) {
      groupOrbsRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group position={[18, 3, -15]} onClick={onSelect}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Main Base Island Platform */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[6, 4.8, 1.4, 8]} />
          <meshStandardMaterial
            color={isActive ? '#9d4edd' : '#4c1d95'}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>

        {/* Lower Rock Structure */}
        <mesh position={[0, -2, 0]}>
          <coneGeometry args={[4.8, 4, 8]} />
          <meshStandardMaterial color="#2e1065" flatShading />
        </mesh>

        {/* Island Title */}
        <Text
          position={[0, 4.5, 0]}
          fontSize={1.2}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
        >
          SKILLS MATRIX
        </Text>

        {/* Floating Glowing 3D Skill Spheres */}
        <group ref={groupOrbsRef} position={[0, 1.8, 0]}>
          {portfolioConfig.skills.map((skill, idx) => {
            const total = portfolioConfig.skills.length;
            const angle = (idx / total) * Math.PI * 2;
            const layer = idx % 2 === 0 ? 3.8 : 5.2;
            const yOffset = (idx % 3) * 0.8 - 0.8;
            const x = Math.cos(angle) * layer;
            const z = Math.sin(angle) * layer;

            const isHovered = selectedSkill?.id === skill.id;
            const orbScale = isHovered ? 0.9 : 0.65;

            return (
              <group key={skill.id} position={[x, yOffset, z]}>
                <Float speed={2.5} floatIntensity={0.4}>
                  <mesh
                    scale={orbScale}
                    onPointerOver={(e) => {
                      e.stopPropagation();
                      soundFx.playHover();
                      onSkillHover(skill);
                    }}
                    onPointerOut={() => onSkillHover(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playClick();
                      onSkillHover(skill);
                    }}
                  >
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                      color={skill.color}
                      emissive={skill.color}
                      emissiveIntensity={isHovered ? 1.2 : 0.6}
                      roughness={0.1}
                      metalness={0.8}
                    />
                  </mesh>

                  {/* Text Label on Orb */}
                  <Text
                    position={[0, -0.9, 0]}
                    fontSize={0.28}
                    color="#ffffff"
                    anchorX="center"
                  >
                    {skill.name}
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
