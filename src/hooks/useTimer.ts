import { useState, useEffect, useRef } from 'react';
import { TIMER } from '@/constants/constants';

// Manage timer
export function useTimer(timerActive: boolean): number {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!timerActive) {
      if (intervalRef.current) {
        try {
          clearInterval(intervalRef.current);
        } catch (error) {
          console.error('Error clearing interval:', error);
        }
        intervalRef.current = null;
      }
      return;
    }

    try {
      intervalRef.current = window.setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, TIMER.INTERVAL);
    } catch (error) {
      console.error('Error setting interval:', error);
    }

    return () => {
      if (intervalRef.current) {
        try {
          clearInterval(intervalRef.current);
        } catch (error) {
          console.error('Error clearing interval in cleanup:', error);
        }
        intervalRef.current = null;
      }
    };
  }, [timerActive]);

  return elapsedTime;
}
