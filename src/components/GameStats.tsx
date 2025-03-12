import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { useTimer } from '@/hooks/useTimer';
import { useGameScore } from '@/hooks/useGameScore';
import styles from './styles/GameStats.module.css';
import { MovesProps, TimerProps, ScoreProps } from '@/types/components';

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

// Score component (moved from Score.tsx)
export const Score = ({ moves, completedTime }: ScoreProps) => {
  const { stars } = useGameScore(moves, parseInt(completedTime, 10));

  return (
    <>
      {[...Array(5)].map((_, index) => (
        <StarOutlinedIcon
          key={index}
          className={
            index < stars
              ? styles.scoreIcon
              : `${styles.scoreIcon} ${styles.grayedOut}`
          }
          aria-hidden={true}
        />
      ))}
      <span className="visually-hidden">{stars} stars out of 5</span>
    </>
  );
};

// Export Score as default for backward compatibility
export default Score;
