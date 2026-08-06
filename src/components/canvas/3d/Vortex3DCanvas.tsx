import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Torus } from '@react-three/drei';
import * as THREE from 'three';

const VortexMesh: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.3;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 0.8;
    if (ring2Ref.current) ring2Ref.current.rotation.y -= delta * 0.9;
    if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 0.7;
  });

  return (
    <group ref={groupRef}>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Neon Ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[3.2, 0.06, 16, 64]} />
          <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={1.2} />
        </mesh>

        {/* Neon Ring 2 */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.05, 16, 64]} />
          <meshStandardMaterial color="#9d4edd" emissive="#9d4edd" emissiveIntensity={1.2} />
        </mesh>

        {/* Neon Ring 3 */}
        <mesh ref={ring3Ref} rotation={[-Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.8, 0.04, 16, 64]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} />
        </mesh>

        {/* Central Core Sphere */}
        <mesh>
          <icosahedronGeometry args={[0.8, 2]} />
          <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={1} wireframe />
        </mesh>
      </Float>

      {/* Vortex Particle Swarm */}
      <Sparkles count={300} scale={[12, 12, 12]} size={4} speed={1.2} color="#00f2fe" />
      <Sparkles count={200} scale={[10, 10, 10]} size={3} speed={0.8} color="#9d4edd" />
    </group>
  );
};

export const Vortex3DCanvas: React.FC = () => {
  return (
    <div className="w-full h-80 sm:h-96 my-8 rounded-3xl overflow-hidden glass-panel border border-purple-500/30 shadow-2xl relative bg-slate-950/80">
      <div className="absolute top-4 left-6 z-10 text-xs font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
        Interactive Blender 3D & WebGL Particle Vortex
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f2fe" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#9d4edd" />

        <VortexMesh />
      </Canvas>
    </div>
  );
};
