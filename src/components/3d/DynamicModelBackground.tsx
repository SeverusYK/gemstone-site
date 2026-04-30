"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function MetallicStructure() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.01;
      groupRef.current.rotation.x = t * 0.006;
    }
    if (meshRef1.current) {
      meshRef1.current.rotation.x = t * 0.02;
      meshRef1.current.rotation.y = t * 0.03;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = -t * 0.015;
      meshRef2.current.rotation.y = -t * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={0.5} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer wireframe structure */}
        <mesh ref={meshRef1} scale={2.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#333333"
            wireframe={true}
            transparent
            opacity={0.2}
          />
        </mesh>
        
        {/* Inner solid metallic structure */}
        <mesh ref={meshRef2} scale={1.8}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#111111"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Core glowing element */}
        <mesh scale={0.7}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#CCFF00"
            emissive="#CCFF00"
            emissiveIntensity={1.5}
            roughness={0.1}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>
      </Float>
      
      {/* Particles around the structure */}
      <Sparkles count={120} scale={10} size={2.5} speed={0.4} opacity={0.5} color="#CCFF00" />
    </group>
  );
}

export default function DynamicModelBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-90">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#CCFF00" />
        <pointLight position={[0, 0, 0]} intensity={3} color="#CCFF00" distance={5} />
        <MetallicStructure />
      </Canvas>
    </div>
  );
}
