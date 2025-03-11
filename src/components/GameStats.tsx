import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useTimer } from '@/hooks/useTimer';
import styles from './styles/GameStats.module.css';
import { MovesProps, TimerProps } from '@/types/components';

// Moves component
export const Moves = ({ moves }: MovesProps) => {
  return (
    <div className={styles.stats}>
      <FlipOutlinedIcon />
      <span className={styles.count}>{moves}</span>
    </div>
  );
};

// Timer component
export const Timer = ({ timerActive }: TimerProps) => {
  const elapsedTime = useTimer(timerActive);

  return (
    <div className={styles.stats}>
      <TimerOutlinedIcon />
      <span className={styles.count}>{elapsedTime}</span>
    </div>
  );
};
