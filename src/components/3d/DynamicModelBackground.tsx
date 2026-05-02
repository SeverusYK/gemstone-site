"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function buildDiamondGeometry(
  topHeight: number,
  girdleRadius: number,
  pavilionHeight: number,
  segments: number
): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];

  const tableRadius = girdleRadius * 0.55;
  const tableY = topHeight;
  const girdleY = 0;
  const culletY = -pavilionHeight;

  const tableVerts: THREE.Vector3[] = [];
  const girdleVerts: THREE.Vector3[] = [];

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    tableVerts.push(
      new THREE.Vector3(Math.cos(angle) * tableRadius, tableY, Math.sin(angle) * tableRadius)
    );
    girdleVerts.push(
      new THREE.Vector3(Math.cos(angle) * girdleRadius, girdleY, Math.sin(angle) * girdleRadius)
    );
  }

  const cullet = new THREE.Vector3(0, culletY, 0);
  const tableCenter = new THREE.Vector3(0, tableY + 0.01, 0);

  const allVerts = [...tableVerts, ...girdleVerts, cullet, tableCenter];
  const tOff = 0;
  const gOff = segments;
  const culletIdx = segments * 2;
  const centerIdx = segments * 2 + 1;

  allVerts.forEach((v) => positions.push(v.x, v.y, v.z));

  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    indices.push(tOff + i, gOff + i, tOff + next);
    indices.push(tOff + next, gOff + i, gOff + next);
  }
  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    indices.push(centerIdx, tOff + next, tOff + i);
  }
  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    indices.push(gOff + i, culletIdx, gOff + next);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function GemstoneModel() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  const diamondGeo = useMemo(() => buildDiamondGeometry(0.9, 1.0, 1.4, 16), []);
  const outerGeo   = useMemo(() => buildDiamondGeometry(0.9, 1.15, 1.55, 16), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.10;
      groupRef.current.rotation.z = Math.sin(t * 0.14) * 0.07;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.06;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={0.5} rotationIntensity={0.25} floatIntensity={0.7}>
        {/* Outer wireframe — brighter, more visible */}
        <mesh ref={outerRef} geometry={outerGeo} scale={2.1}>
          <meshStandardMaterial
            color="#7aff00"
            emissive="#4aaa00"
            emissiveIntensity={0.6}
            wireframe
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* Inner wireframe — slightly different scale for depth */}
        <mesh ref={innerRef} geometry={diamondGeo} scale={1.6}>
          <meshStandardMaterial
            color="#ccff00"
            emissive="#88cc00"
            emissiveIntensity={0.5}
            wireframe
            transparent
            opacity={0.38}
          />
        </mesh>

        {/* Very faint fill body for subtle 3D depth — no solid color */}
        <mesh geometry={diamondGeo} scale={1.58}>
          <meshStandardMaterial
            color="#111111"
            metalness={0.95}
            roughness={0.05}
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>

      {/* Slow-moving outer sparkles */}
      <Sparkles
        count={160}
        scale={14}
        size={1.6}
        speed={0.08}
        opacity={0.35}
        color="#CCFF00"
      />
      {/* Near sparkles — very slow */}
      <Sparkles
        count={50}
        scale={6}
        size={2.2}
        speed={0.05}
        opacity={0.5}
        color="#aaffaa"
      />
    </group>
  );
}

export default function DynamicModelBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-90">
      <Canvas camera={{ position: [0, 0, 9], fov: 42 }} dpr={[1, 2]}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[8, 12, 6]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-8, -8, -4]} intensity={0.8} color="#CCFF00" />
        <pointLight position={[0, 1, 2]} intensity={2.5} color="#CCFF00" distance={10} decay={2} />
        <GemstoneModel />
      </Canvas>
    </div>
  );
}
