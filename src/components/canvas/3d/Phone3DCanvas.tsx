import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Phone3DCanvasProps {
  appTitle: string;
  appSubtitle: string;
}

const Phone3DModel: React.FC<Phone3DCanvasProps> = ({ appTitle, appSubtitle }) => {
  const phoneGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (phoneGroup.current) {
      phoneGroup.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.35;
      phoneGroup.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={phoneGroup} position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Smartphone Chassis Base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.8, 5.6, 0.35]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Metallic Bezel Border Rim */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.88, 5.68, 0.32]} />
          <meshStandardMaterial color="#0284c7" emissive="#00f2fe" emissiveIntensity={0.4} metalness={1} roughness={0.1} />
        </mesh>

        {/* Glass Screen Display */}
        <mesh position={[0, 0, 0.19]}>
          <boxGeometry args={[2.65, 5.35, 0.02]} />
          <meshStandardMaterial color="#070a13" emissive="#0284c7" emissiveIntensity={0.3} roughness={0.05} />
        </mesh>

        {/* Camera Bump Module */}
        <mesh position={[-0.8, 2.1, -0.2]}>
          <boxGeometry args={[0.8, 0.8, 0.15]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
        <mesh position={[-0.8, 2.1, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.1, 16]} />
          <meshStandardMaterial color="#000000" metalness={1} roughness={0.1} />
        </mesh>

        {/* Dynamic Screen Content Text Overlay inside WebGL */}
        <group position={[0, 0.8, 0.21]}>
          <Text fontSize={0.28} color="#00f2fe" anchorX="center" maxWidth={2.4} textAlign="center">
            {appTitle}
          </Text>
          <Text position={[0, -0.5, 0]} fontSize={0.18} color="#ffffff" anchorX="center" maxWidth={2.4} textAlign="center">
            {appSubtitle}
          </Text>
          <Text position={[0, -1.2, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
            [ Interactive 3D Phone ]
          </Text>
        </group>
      </Float>
    </group>
  );
};

export const Phone3DCanvas: React.FC<Phone3DCanvasProps> = (props) => {
  return (
    <div className="w-full h-[450px] sm:h-[500px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-2xl relative bg-slate-950/80">
      <div className="absolute top-4 left-6 z-10 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        WebGL 3D Smartphone Device Model
      </div>

      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 8]} intensity={2} color="#ffffff" castShadow />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#00f2fe" />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#9d4edd" />

        <Phone3DModel {...props} />
      </Canvas>
    </div>
  );
};
