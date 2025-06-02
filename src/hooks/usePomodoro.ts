// src/hooks/usePomodoro.ts
import { useState, useEffect } from 'react';

export function usePomodoro(work = 25, shortBreak = 5, longBreak = 15) {
  const [time, setTime] = useState(work * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'work' | 'shortBreak' | 'longBreak'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev === 0) {
            if (phase === 'work') {
              setPhase('shortBreak');
              return shortBreak * 60;
            } else if (phase === 'shortBreak') {
              setPhase('work');
              return work * 60;
            } else {
              setPhase('work');
              return work * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, phase]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(work * 60);
    setPhase('work');
  };

  return { time, isRunning, phase, start, pause, reset };
}
