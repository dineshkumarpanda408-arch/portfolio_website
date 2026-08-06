import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { soundFx } from '../../utils/soundEffects';

export type IslandId = 'home' | 'projects' | 'skills' | 'achievements' | 'research' | 'contact';

interface CameraControllerProps {
  activeIsland: IslandId;
  isIntro: boolean;
  onIntroComplete?: () => void;
}

interface IslandCamTransform {
  pos: [number, number, number];
  target: [number, number, number];
}

const ISLAND_CAMERA_CONFIGS: Record<IslandId, IslandCamTransform> = {
  home: { pos: [0, 4.5, 14], target: [0, 0, 0] },
  projects: { pos: [-18, 6.5, -2], target: [-18, 2, -15] },
  skills: { pos: [18, 7.5, -2], target: [18, 3, -15] },
  achievements: { pos: [22, 4.5, 26], target: [22, -1, 14] },
  research: { pos: [-22, 5.5, 26], target: [-22, 1, 14] },
  contact: { pos: [0, 3.5, 38], target: [0, -2, 26] },
};

export const CameraController: React.FC<CameraControllerProps> = ({
  activeIsland,
  isIntro,
  onIntroComplete,
}) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 45, 60));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));
  const mouse = useRef({ x: 0, y: 0 });

  // Update mouse position for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Set initial camera state
  useEffect(() => {
    if (isIntro) {
      camera.position.set(0, 45, 60);
      currentLook.current.set(0, 0, 0);
      camera.lookAt(currentLook.current);
    }
  }, [isIntro, camera]);

  // Handle active island transition
  useEffect(() => {
    if (!isIntro) {
      const config = ISLAND_CAMERA_CONFIGS[activeIsland] || ISLAND_CAMERA_CONFIGS.home;
      targetPos.current.set(...config.pos);
      targetLook.current.set(...config.target);
      soundFx.playSwoosh();
    }
  }, [activeIsland, isIntro]);

  useFrame((_, delta) => {
    // Lerp factor
    const lerpSpeed = isIntro ? 1.5 : 2.5;
    const factor = Math.min(delta * lerpSpeed, 1);

    // Parallax mouse offsets
    const parallaxX = mouse.current.x * 0.8;
    const parallaxY = -mouse.current.y * 0.5;

    const desiredCamPos = new THREE.Vector3(
      targetPos.current.x + parallaxX,
      targetPos.current.y + parallaxY,
      targetPos.current.z
    );

    // Smoothly position camera
    camera.position.lerp(desiredCamPos, factor);

    // Smoothly update camera lookAt
    currentLook.current.lerp(targetLook.current, factor);
    camera.lookAt(currentLook.current);

    // Check intro completion distance
    if (isIntro && camera.position.distanceTo(targetPos.current) < 2) {
      if (onIntroComplete) onIntroComplete();
    }
  });

  return null;
};
