import { useEffect, useRef, useState } from 'react';

// Manage timer state and elapsed time
export function useTimer(timerActive: boolean): number {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    if (timerActive) {
      // Initialize start time once
      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now();
      }
      const update = () => {
        setElapsedTime(() =>
          Math.floor((Date.now() - (startTimeRef.current || 0)) / 1000),
        );
        animationFrameId = requestAnimationFrame(update);
      };
      animationFrameId = requestAnimationFrame(update);
    } else {
      // Reset timer when inactive
      if (startTimeRef.current !== null) {
        startTimeRef.current = null;
        setElapsedTime(0);
      }
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [timerActive]);
  return elapsedTime;
}
