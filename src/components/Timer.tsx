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
    <div className="d-flex align-items-center gap-1">
      <HiOutlineClock className={styles.clockIcon} /> {elapsedTime}
    </div>
  );
};

export default Timer;
