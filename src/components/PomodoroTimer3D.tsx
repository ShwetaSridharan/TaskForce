// src/components/PomodoroTimer3D.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Points, PointMaterial } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import { usePomodoro } from '../hooks/usePomodoro';
import { useEffect, useState, useMemo } from 'react';
import OrbitingRing from './OrbitingRing';
import { Howl } from 'howler';

// Simple ProgressRing component for 3D ring progress visualization
function ProgressRing({ progress, color }: { progress: number; color: string }) {
  // Draw a ring using a torus geometry, with the arc based on progress
  const arc = Math.max(0.01, progress) * Math.PI * 2;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.25, 0.07, 16, 100, arc]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  );
}

export default function PomodoroTimer3D() {
  const { time, isRunning, phase, start, pause, reset } = usePomodoro();
  const { scale } = useSpring({ scale: isRunning ? 1.2 : 1, config: { tension: 100, friction: 10 } });
  const [showParticles, setShowParticles] = useState(false);


   const bellSound = new Howl({
  src: ['/sounds/sound.mp3'],  // Add a sound file to your public folder
  volume: 0.5,
});

const playSound = () => bellSound.play();

  // Particle burst on phase change
 useEffect(() => {
  if (time === 0) {
    setShowParticles(true);
    playSound();  // 🔊 Play sound
    if (navigator.vibrate) navigator.vibrate(200);  // 📳 Vibrate on supported devices
    const timer = setTimeout(() => setShowParticles(false), 1500);
    return () => clearTimeout(timer);
  }
}, [time]);


 

  const particlePositions = useMemo(() => {
    const count = 100;
    return new Array(count).fill(0).map(() => [
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
    ]);
  }, [showParticles]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const total = phase === 'work' ? 25 * 60 : 5 * 60;
const progress = 1 - time / total;

  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={10} depth={20} count={100} factor={2} fade />

        <a.mesh scale={scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={phase === 'work' ? '#38B2AC' : '#F56565'} emissiveIntensity={1} emissive={phase === 'work' ? '#38B2AC' : '#F56565'} />
        </a.mesh>

          <ProgressRing progress={progress} color={phase === 'work' ? '#38B2AC' : '#F56565'} />

        <OrbitingRing radius={1.5} speed={0.5} color="#38B2AC" />
        <OrbitingRing radius={2} speed={-0.3} color="#4FD1C5" />
        <OrbitingRing radius={2.5} speed={0.2} color="#A0AEC0" />

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
              color="#FFFFFF"
              size={0.3}
              sizeAttenuation
              depthWrite={false}
            />
          </Points>
        )}

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Timer Controls */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-opacity-90 font-heading">
        <p className="text-2xl">{minutes}:{seconds.toString().padStart(2, '0')}</p>
        <p className="text-sm">{phase === 'work' ? 'Focus' : 'Break'}</p>
        <div className="mt-2 flex gap-2">
          <button onClick={start} className="bg-teal-500 px-2 py-1 rounded text-sm">Start</button>
          <button onClick={pause} className="bg-yellow-500 px-2 py-1 rounded text-sm">Pause</button>
          <button onClick={reset} className="bg-gray-700 px-2 py-1 rounded text-sm">Reset</button>
        </div>
      </div>
    </div>
  );
}
