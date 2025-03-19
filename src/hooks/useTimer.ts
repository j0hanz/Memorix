import { useState, useEffect, useRef } from 'react';

// Manage timer state and elapsed time
export function useTimer(timerActive: boolean): number {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Cleanup function to cancel the animation frame
    let animationFrameId: number;

    if (timerActive) {
      // Initialize start time if not already set
      startTimeRef.current = startTimeRef.current || Date.now();
      const updateTimer = () => {
        // Calculate elapsed time
        const currentTime = Math.floor(
          (Date.now() - (startTimeRef.current || 0)) / 1000,
        );
        if (currentTime !== elapsedTime) {
          setElapsedTime(currentTime);
        }
        animationFrameId = requestAnimationFrame(updateTimer);
      };
      animationFrameId = requestAnimationFrame(updateTimer);
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (!timerActive) {
        startTimeRef.current = null;
      }
    };
  }, [timerActive, elapsedTime]);
  return elapsedTime;
}
