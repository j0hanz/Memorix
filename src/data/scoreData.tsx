import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import styles from '@/components/styles/Modal.module.css';
import Score from '@/components/Score';

// Define the props type
interface ScoreboardProps {
  moves: number;
  completedTime: string;
}
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
