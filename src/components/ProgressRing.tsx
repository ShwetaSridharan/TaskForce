// src/components/ProgressRing.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProgressRing({ progress = 0, color = '#4FD1C5' }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.geometry.setDrawRange(0, Math.floor(progress * 100));
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.3, 0.05, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  );
}
