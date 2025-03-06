import { HiOutlineClock } from 'react-icons/hi2';
import { useTimer } from '@/hooks/useTimer';
import styles from './styles/Timer.module.css';

interface TimerProps {
  timerActive: boolean;
}

const Timer = ({ timerActive }: TimerProps) => {
  // Get elapsed time using custom hook
  const elapsedTime = useTimer(timerActive);

  return (
    <div className={styles.timer}>
      <HiOutlineClock className={styles.clockIcon} /> {elapsedTime}
    </div>
  );
};

Timer.displayName = 'Timer';
export default Timer;
