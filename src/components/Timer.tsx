import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
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
      <TimerOutlinedIcon />
      {elapsedTime}
    </div>
  );
};

export default Timer;
