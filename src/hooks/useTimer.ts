import { useState, useEffect } from "react";

// Manage timer
export function useTimer(timerActive: boolean): number {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    if (!timerActive) return;
    const timerId = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timerActive]);

  return elapsedTime;
}
