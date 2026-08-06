import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Text } from '@react-three/drei';
import * as THREE from 'three';

interface KeyboardMeshProps {
  scrollProgress: number;
}

const KeyCap: React.FC<{
  position: [number, number, number];
  label: string;
  isPressed?: boolean;
  color?: string;
  width?: number;
}> = ({ position, label, isPressed = false, color = '#1e293b', width = 0.85 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const targetY = position[1] - (isPressed ? 0.2 : 0);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 12);
    }
  });

  return (
    <group position={position}>
      {/* Key Switch Housing */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[width, 0.3, 0.85]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* Key Cap */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.45, 0.85]} />
        <meshStandardMaterial
          color={color}
          emissive={isPressed ? '#00f2fe' : '#000000'}
          emissiveIntensity={isPressed ? 0.8 : 0}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Key Label */}
      <Text
        position={[0, 0.25, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.22}
        color={isPressed ? '#00f2fe' : '#94a3b8'}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

const KeyboardModel: React.FC<KeyboardMeshProps> = ({ scrollProgress }) => {
  const keyboardGroup = useRef<THREE.Group>(null);

  useFrame(({ camera }, delta) => {
    if (keyboardGroup.current) {
      // Gentle idle sway + tilt based on scroll
      keyboardGroup.current.rotation.x = 0.35 + scrollProgress * 0.4;
      keyboardGroup.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.05;

      // Retreat camera backwards on scroll
      const camZ = 12 + scrollProgress * 18;
      const camY = 6 + scrollProgress * 10;
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, camZ, delta * 3);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, camY, delta * 3);
      camera.lookAt(0, -1, 0);
    }
  });

  // Simple key layout grid
  const keyRows = [
    ['ESC', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['TAB', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER'],
    ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'CTRL', 'ALT'],
  ];

  return (
    <group ref={keyboardGroup} position={[0, -1.2, 0]}>
      {/* Heavy Anodized Aluminum Chassis */}
      <mesh position={[0, -0.6, 0]} receiveShadow castShadow>
        <boxGeometry args={[12.5, 0.8, 4.8]} />
        <meshStandardMaterial
          color="#090d1a"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      {/* Underglow LED Rim */}
      <mesh position={[0, -0.98, 0]}>
        <boxGeometry args={[12.7, 0.05, 5.0]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.6} />
      </mesh>

      {/* Keycaps Grid */}
      {keyRows.map((row, rIdx) => (
        <group key={rIdx} position={[0, 0, (rIdx - 1) * 1.1]}>
          {row.map((keyLabel, kIdx) => {
            const startX = -((row.length - 1) * 1.0) / 2;
            const x = startX + kIdx * 1.0;
            const isEnterKey = keyLabel === 'ENTER';
            const isPressed = isEnterKey && (scrollProgress > 0.05 || Math.sin(Date.now() * 0.003) > 0.7);
            const keyColor = isEnterKey ? '#0284c7' : '#1e293b';

            return (
              <KeyCap
                key={kIdx}
                position={[x, 0, 0]}
                label={keyLabel}
                isPressed={isPressed}
                color={keyColor}
                width={isEnterKey ? 1.4 : 0.88}
              />
            );
          })}
        </group>
      ))}

      {/* Spacebar */}
      <KeyCap
        position={[0, 0, 2.2]}
        label="DINESH.DEV"
        isPressed={scrollProgress > 0.1}
        color="#38bdf8"
        width={4.2}
      />
    </group>
  );
};

export const HeroKeyboardCanvas: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        shadows
        camera={{ position: [0, 6, 12], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Commercial Studio Lighting */}
        <ambientLight intensity={0.5} color="#e0e7ff" />
        <directionalLight position={[10, 20, 15]} intensity={1.8} color="#ffffff" castShadow />
        <pointLight position={[-10, 10, -10]} intensity={2} color="#00f2fe" distance={30} />
        <pointLight position={[10, -5, 10]} intensity={1.5} color="#9d4edd" distance={30} />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <KeyboardModel scrollProgress={scrollProgress} />
        </Float>

        {/* Ambient Sunlight Dust Sparkles */}
        <Sparkles count={120} scale={[25, 15, 25]} size={3} speed={0.4} color="#00f2fe" />
      </Canvas>
    </div>
  );
};
