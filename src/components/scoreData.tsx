import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

import Score from '@/components/GameStats';
import type { ScoreboardProps } from '@/types/data';

import styles from './styles/Modal.module.css';

// Displays the game statistics
export default function Scoreboard({ moves, completedTime }: ScoreboardProps) {
  return (
    <div className={styles.scoreboard}>
      <div className={styles.scoreItem}>
        <FlipOutlinedIcon className={`me-1 ${styles.statsIcon}`} />
        {moves}
      </div>
      <div className={styles.scoreItem}>
        <Score moves={moves} completedTime={completedTime} />
      </div>
      <div className={styles.scoreItem}>
        <TimerOutlinedIcon className={`me-2 ${styles.clockIcon}`} />
        {completedTime}
      </div>
    </div>
  );
}
