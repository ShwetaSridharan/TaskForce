// src/components/ConstellationScene.tsx
"use client";

// import React, { useMemo, useState, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   OrbitControls,
//   Stars,
//   Line,
//   Points,
//   PointMaterial,
// } from "@react-three/drei";
// import * as THREE from "three";

// import { useTask } from "../contexts/TaskContext";
// import { getRandomConstellation } from "../utils/getRandomConstellation";
// import BackgroundStars from "./BackgroundStars";

// const silverColor = "#E0E0E0"; // Lighter silver for core stars
// const glowColor = "#FFFFFF"; // Soft white glow

// // Create a 5-pointed star shape
// function createStarShape(radius = 0.5, innerRadius = 0.2, points = 5) {
//   const shape = new THREE.Shape();
//   const step = Math.PI / points;
//   let rotation = (Math.PI / 2) * 3;
//   let x = 0;
//   let y = 0;

//   shape.moveTo(0, -radius);
//   for (let i = 0; i < points; i++) {
//     x = Math.cos(rotation) * radius;
//     y = Math.sin(rotation) * radius;
//     shape.lineTo(x, y);
//     rotation += step;

//     x = Math.cos(rotation) * innerRadius;
//     y = Math.sin(rotation) * innerRadius;
//     shape.lineTo(x, y);
//     rotation += step;
//   }
//   shape.lineTo(0, -radius);
//   shape.closePath();

//   return shape;
// }

// const ConstellationScene: React.FC = () => {
//   const { tasks } = useTask();
//   const taskCount = tasks.length;

//   const stars = useMemo(() => getRandomConstellation(taskCount), [taskCount]);
//   const linePoints = useMemo(() => {
//     return stars
//       .filter((_, i) => tasks[i]?.completed)
//       .map((star) => [star.x, star.y, star.z]);
//   }, [tasks, stars]);

//   const allTasksCompleted =
//     tasks.length > 0 && tasks.every((task) => task.completed);

//   // Particle burst
//   const [showParticles, setShowParticles] = useState(false);
//   useEffect(() => {
//     if (allTasksCompleted) {
//       setShowParticles(true);
//       const timer = setTimeout(() => setShowParticles(false), 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [allTasksCompleted]);

//   // Particle burst positions
//   const particlePositions = useMemo(() => {
//     const count = 100;
//     return new Array(count)
//       .fill(0)
//       .map(() => [
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10,
//       ]);
//   }, [allTasksCompleted]);

//   return (
//     <div style={{ width: "100%", height: "100%", background: "#00082a" }}>
//       <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
//         <ambientLight intensity={0.2} />
//         <pointLight position={[10, 10, 10]} intensity={1} />
//         <Stars radius={20} depth={50} count={2000} factor={2} fade />

//         <BackgroundStars />
//         {/* Background stars */}

//         {/* Render stars with varying sizes */}
//         {stars.map((star, index) => {
//           const isCompleted = tasks[index]?.completed;
//           const size = isCompleted ? 0.2 : 0.1; // Bigger for completed stars

//           return (
//             <mesh key={index} position={[star.x, star.y, star.z]}>
//               <sphereGeometry args={[size, 16, 16]} />

//               <meshStandardMaterial
//                 color={silverColor}
//                 emissive={isCompleted ? glowColor : silverColor}
//                 emissiveIntensity={isCompleted ? 8 : 5}
//                 opacity={isCompleted ? 1 : 0.7}
//                 transparent
//                 metalness={0.9}
//                 roughness={0.1}
//               />
//             </mesh>
//           );
//         })}

//         {/* Connecting lines */}
//         {linePoints.length > 1 && (
//           <Line
//             points={linePoints as [number, number, number][]}
//             color={silverColor}
//             lineWidth={1.5}
//             transparent
//             opacity={0.9}
//           />
//         )}

//         {/* Particle burst */}
//         {showParticles && (
//           <Points>
//             <bufferGeometry>
//               <bufferAttribute
//                 attach="attributes-position"
//                 args={[new Float32Array(particlePositions.flat()), 3]}
//                 count={particlePositions.length}
//                 array={new Float32Array(particlePositions.flat())}
//                 itemSize={3}
//               />
//             </bufferGeometry>
//             <PointMaterial
//               transparent
//               color={silverColor}
//               size={0.4}
//               sizeAttenuation
//               depthWrite={false}
//             />
//           </Points>
//         )}

//         <OrbitControls />
//       </Canvas>

//       <div className="text-center text-sm text-white mt-2">
//         {allTasksCompleted
//           ? "✨ Your constellation is complete! ✨"
//           : "Your constellation is forming... 🌿 Every star matters."}
//       </div>
//     </div>
//   );
// };

// export default ConstellationScene;


// src/components/ConstellationScene.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Line, Points, PointMaterial, Sparkles } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";

import { useTask } from "../contexts/TaskContext";
import { getRandomConstellation } from "../utils/getRandomConstellation";
import BackgroundStars from "./BackgroundStars";


const silverColor = "#E0E0E0";
const glowColor = "#FFFFFF";

// Create a 5-pointed star shape
function createStarShape(radius = 0.5, innerRadius = 0.2, points = 5) {
  const shape = new THREE.Shape();
  const step = Math.PI / points;
  let rotation = (Math.PI / 2) * 3;
  let x = 0;
  let y = 0;

  shape.moveTo(0, -radius);
  for (let i = 0; i < points; i++) {
    x = Math.cos(rotation) * radius;
    y = Math.sin(rotation) * radius;
    shape.lineTo(x, y);
    rotation += step;

    x = Math.cos(rotation) * innerRadius;
    y = Math.sin(rotation) * innerRadius;
    shape.lineTo(x, y);
    rotation += step;
  }
  shape.lineTo(0, -radius);
  shape.closePath();

  return shape;
}

const ConstellationScene: React.FC = () => {
  const { tasks, allTasksComplete } = useTask();
  const taskCount = tasks.length;

  const stars = useMemo(() => getRandomConstellation(taskCount), [taskCount]);
  const linePoints = useMemo(() => {
    return stars
      .filter((_, i) => tasks[i]?.completed)
      .map((star) => [star.x, star.y, star.z]);
  }, [tasks, stars]);

  // Particle burst
  const [showParticles, setShowParticles] = useState(false);
  useEffect(() => {
    if (allTasksComplete) {
      setShowParticles(true);
      const timer = setTimeout(() => setShowParticles(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [allTasksComplete]);

  const particlePositions = useMemo(() => {
    const count = 100;
    return new Array(count)
      .fill(0)
      .map(() => [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ]);
  }, [allTasksComplete]);

  // ✨ Add spring animation for scale
  const { scale } = useSpring({
    scale: allTasksComplete ? 1.5 : 1,
    config: { tension: 120, friction: 14 },
  });

  return (
    <div style={{ width: "100%", height: "100%", background: "#00082a", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 100 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={20} depth={50} count={2000} factor={2} fade />

        <BackgroundStars />

        {/* Constellation group with scale animation */}
        <a.group scale={scale}>
          {stars.map((star, index) => {
            const isCompleted = tasks[index]?.completed;
            const size = isCompleted ? 0.2 : 0.1;

            return (
              <mesh key={index} position={[star.x, star.y, star.z]}>
                <shapeGeometry args={[createStarShape(size, size / 2, 5)]} />

                <meshStandardMaterial
                  color={silverColor}
                  emissive={isCompleted ? glowColor : silverColor}
                  emissiveIntensity={isCompleted ? 8 : 5}
                  opacity={isCompleted ? 1 : 0.7}
                  transparent
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
            );
          })}

          {linePoints.length > 1 && (
            <Line
              points={linePoints as [number, number, number][]}
              color={silverColor}
              lineWidth={1.5}
              transparent
              opacity={0.9}
            />
          )}
        </a.group>

        {/* Particle burst */}
        {showParticles && (
          <Points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array(particlePositions.flat()), 3]}
                count={particlePositions.length}
                array={new Float32Array(particlePositions.flat())}
                itemSize={3}
              />
            </bufferGeometry>
            <PointMaterial
              transparent
              color={silverColor}
              size={0.4}
              sizeAttenuation
              depthWrite={false}
            />
          </Points>
        )}

        {/* Sparkles */}
        {allTasksComplete && <Sparkles count={50} size={3} scale={10} speed={0.5} />}

        <OrbitControls minDistance={12} maxDistance={18} />

      </Canvas>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex  justify-center z-10 pointer-events-none">
        <div className="text-center text-[#bdd9f4] text-lg">
          {allTasksComplete ? (
            <>
              <p className="text-2xl">✨ You’ve completed today’s constellation! 🌟</p>
              <p className="mt-1">See you tomorrow for a new pattern.</p>
            </>
          ) : (
            <p>Your constellation is forming... 🌿 Every star matters.</p>
          )}
        </div>
       
      </div>
    </div>
  );
};

export default ConstellationScene;
