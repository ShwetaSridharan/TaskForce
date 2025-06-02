// src/components/BackgroundStars.tsx
"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BackgroundStars: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  type Star = {
    position: [number, number, number];
    size: number;
    phase: number;
  };

  const stars = useMemo<Star[]>(() => {
    const count = 1000;
    const starData: Star[] = [];
    for (let i = 0; i < count; i++) {
      starData.push({
        position: [
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
        ] as [number, number, number],
        size: Math.random() * 0.06 + 0.01,
        phase: Math.random() * Math.PI * 10, // For twinkle offset
      });
    }
    return starData;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    groupRef.current?.children.forEach((star, index) => {
      const mesh = star as THREE.Mesh;
      const { phase } = (mesh.userData as any);
      const glow = 0.5 + 0.5 * Math.sin(time * 2 + phase);
      (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((star, i) => (
        <mesh
          key={i}
          position={star.position}
          userData={{ phase: star.phase }}
        >
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

export default BackgroundStars;
