import { useState, useEffect, useRef } from 'react';

// Manage timer
export function useTimer(timerActive: boolean): number {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!timerActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerActive]);

  return elapsedTime;
}
