import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

import { useScore } from '@/hooks/useScoreboard';
import { useTimer } from '@/hooks/useTimer';
import type { MovesProps, ScoreProps, TimerProps } from '@/types/components';

import { StarRating } from './StarRating';
import styles from './styles/GameStats.module.css';

// Moves component
export const Moves = ({ moves }: MovesProps) => (
  <div className={styles.stats}>
    <FlipOutlinedIcon />
    <span className={styles.count}>{moves}</span>
  </div>
);

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

// Score component
export const Score = ({ moves, completedTime }: ScoreProps) => {
  const { stars } = useScore(moves, parseInt(completedTime, 10));
  return (
    <>
      <StarRating count={stars} />
      <span className="visually-hidden">{stars} stars out of 5</span>
    </>
  );
};
