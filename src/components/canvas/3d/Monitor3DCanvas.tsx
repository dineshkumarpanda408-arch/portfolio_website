import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Monitor3DCanvasProps {
  webTitle: string;
  webUrl: string;
}

const Monitor3DModel: React.FC<Monitor3DCanvasProps> = ({ webTitle, webUrl }) => {
  const monitorGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (monitorGroup.current) {
      monitorGroup.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.25;
      monitorGroup.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });

  return (
    <group ref={monitorGroup} position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.3}>
        {/* Monitor Screen Frame */}
        <mesh castShadow receiveShadow position={[0, 0.8, 0]}>
          <boxGeometry args={[6.2, 3.8, 0.25]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.9} />
        </mesh>

        {/* Outer Glowing Metallic Rim */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[6.3, 3.9, 0.22]} />
          <meshStandardMaterial color="#0284c7" emissive="#00f2fe" emissiveIntensity={0.5} metalness={1} roughness={0.1} />
        </mesh>

        {/* Display Glass Panel */}
        <mesh position={[0, 0.8, 0.14]}>
          <boxGeometry args={[5.9, 3.5, 0.02]} />
          <meshStandardMaterial color="#070a13" emissive="#0284c7" emissiveIntensity={0.4} roughness={0.05} />
        </mesh>

        {/* Stand Neck */}
        <mesh position={[0, -1.3, -0.2]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.35, 1.4, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>

        {/* Stand Base */}
        <mesh position={[0, -2.0, 0]}>
          <cylinderGeometry args={[1.6, 1.8, 0.15, 32]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>

        {/* Screen Text Overlay inside WebGL */}
        <group position={[0, 1.2, 0.16]}>
          <Text fontSize={0.36} color="#00f2fe" anchorX="center" maxWidth={5.2} textAlign="center">
            {webTitle}
          </Text>
          <Text position={[0, -0.6, 0]} fontSize={0.22} color="#ffffff" anchorX="center">
            {webUrl}
          </Text>
          <Text position={[0, -1.3, 0]} fontSize={0.18} color="#94a3b8" anchorX="center">
            [ Deployed MERN Platform ]
          </Text>
        </group>
      </Float>
    </group>
  );
};

export const Monitor3DCanvas: React.FC<Monitor3DCanvasProps> = (props) => {
  return (
    <div className="w-full h-[450px] sm:h-[500px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-2xl relative bg-slate-950/80">
      <div className="absolute top-4 left-6 z-10 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        WebGL 3D Desktop Workstation Display
      </div>

      <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 12, 10]} intensity={2} color="#ffffff" castShadow />
        <pointLight position={[-6, -6, -6]} intensity={1.5} color="#00f2fe" />
        <pointLight position={[6, 6, 6]} intensity={1.5} color="#9d4edd" />

        <Monitor3DModel {...props} />
      </Canvas>
    </div>
  );
};
