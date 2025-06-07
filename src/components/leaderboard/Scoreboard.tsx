import { Score } from '@/components/game/GameStats';
import styles from '@/components/modals/styles/Modal.module.css';
import type { ScoreboardProps } from '@/types/components';
import { formatTime } from '@/utils/shared/formatUtils';
import { MODAL_ICONS } from '@/utils/ui/iconUtils';

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
        {formatTime(completedTime)}
      </div>
    </div>
  );
}
