import { StarRating } from '@/components/ui/StarRating';
import { useTimer } from '@/hooks/game/useTimer';
import { useStarRating } from '@/hooks/leaderboard/useScoreboard';
import type { MovesProps, ScoreProps, TimerProps } from '@/types/components';
import { GAME_ICONS } from '@/utils/ui/iconUtils';

import styles from '../styles/GameStats.module.css';

// Moves component
export const Moves = ({ moves }: MovesProps) => (
  <div className={styles.stats}>
    {GAME_ICONS.moves()}
    <span className={styles.count}>{moves}</span>
  </div>
);

// Timer component
export const Timer = ({ timerActive }: TimerProps) => {
  const elapsedTime = useTimer(timerActive);

  return (
    <div className={styles.stats}>
      {GAME_ICONS.timer()}
      <span className={styles.count}>{elapsedTime}</span>
    </div>
  );
};

// Score component
export const Score = ({ moves, completedTime }: ScoreProps) => {
  const { stars } = useStarRating(moves, parseInt(completedTime, 10));
  return (
    <>
      <StarRating count={stars} />
      <span className="visually-hidden">{stars} stars out of 5</span>
    </>
  );
};
