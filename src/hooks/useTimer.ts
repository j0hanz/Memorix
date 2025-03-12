import { useState, useEffect } from 'react';
import { TIMER } from '@/constants/constants';

// Manage timer state and elapsed time
export function useTimer(timerActive: boolean): number {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Update elapsed time every second
  useEffect(() => {
    let intervalId: number | null = null;
    // Start timer if active
    if (timerActive) {
      intervalId = window.setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, TIMER.INTERVAL);
    }
    return () => {
      // Clear interval on unmount
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [timerActive]);

  return elapsedTime;
}
