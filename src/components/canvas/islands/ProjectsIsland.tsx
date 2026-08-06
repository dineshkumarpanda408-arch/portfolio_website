import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioConfig, Project } from '../../../config/portfolioConfig';
import { soundFx } from '../../../utils/soundEffects';

interface ProjectsIslandProps {
  onSelect: () => void;
  onProjectClick: (project: Project) => void;
  isActive: boolean;
}

export const ProjectsIsland: React.FC<ProjectsIslandProps> = ({
  onSelect,
  onProjectClick,
  isActive,
}) => {
  const cardsGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (cardsGroupRef.current) {
      cardsGroupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group position={[-18, 2, -15]} onClick={onSelect}>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Main Island Platform */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[6.5, 5, 1.4, 8]} />
          <meshStandardMaterial
            color={isActive ? '#00f2fe' : '#0369a1'}
            roughness={0.5}
            metalness={0.3}
            wireframe={false}
          />
        </mesh>

        {/* Lower Rock Roots */}
        <mesh position={[0, -2, 0]}>
          <coneGeometry args={[5, 4, 8]} />
          <meshStandardMaterial color="#082f49" flatShading />
        </mesh>

        {/* Island Title Badge */}
        <Text
          position={[0, 4.2, 0]}
          fontSize={1.2}
          color="#00f2fe"
          anchorX="center"
          anchorY="middle"
        >
          PROJECTS ARCHIPELAGO
        </Text>

        {/* Floating Interactive 3D Project Stands/Cards */}
        <group ref={cardsGroupRef} position={[0, 1.8, 0]}>
          {portfolioConfig.projects.map((project, idx) => {
            const count = portfolioConfig.projects.length;
            const angle = (idx / count) * Math.PI * 2;
            const radius = 4.2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            return (
              <group
                key={project.id}
                position={[x, 0, z]}
                rotation={[0, -angle + Math.PI / 2, 0]}
              >
                <Float speed={2} floatIntensity={0.3}>
                  <mesh
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playClick();
                      onProjectClick(project);
                    }}
                    onPointerOver={(e) => {
                      e.stopPropagation();
                      soundFx.playHover();
                    }}
                    castShadow
                  >
                    <boxGeometry args={[2.2, 1.4, 0.15]} />
                    <meshStandardMaterial
                      color="#0c4a6e"
                      emissive="#0284c7"
                      emissiveIntensity={0.4}
                      roughness={0.2}
                      metalness={0.8}
                    />
                  </mesh>

                  {/* Project Title Text on Card */}
                  <Text
                    position={[0, 0.2, 0.1]}
                    fontSize={0.22}
                    color="#ffffff"
                    maxWidth={2.0}
                    textAlign="center"
                  >
                    {project.title}
                  </Text>

                  {/* Click to View Label */}
                  <Text
                    position={[0, -0.3, 0.1]}
                    fontSize={0.16}
                    color="#00f2fe"
                  >
                    [ Click to Open ]
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
