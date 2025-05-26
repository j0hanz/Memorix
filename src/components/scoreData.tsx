import { Score } from '@/components/GameStats';
import type { ScoreboardProps } from '@/types/components';
import { MODAL_ICONS } from '@/utils/iconUtils';

import styles from './styles/Modal.module.css';

// Displays the game statistics
export function Scoreboard({ moves, completedTime }: ScoreboardProps) {
  return (
    <div className={styles.scoreboard}>
      <div className={styles.scoreItem}>
        {MODAL_ICONS.moves()}
        {moves}
      </div>
      <div className={styles.scoreItem}>
        <Score moves={moves} completedTime={completedTime} />
      </div>
      <div className={styles.scoreItem}>
        {MODAL_ICONS.timer()}
        {completedTime}
      </div>
    </div>
  );
}
