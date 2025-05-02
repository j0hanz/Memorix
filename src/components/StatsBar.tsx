import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Timer, Moves } from './GameStats';
import Feedback from './Feedback';
import styles from './styles/Cards.module.css';
import type { StatsBarProps } from '@/types/components';

export const StatsBar = ({
  moves,
  timerActive,
  feedback,
  onReset,
  onExit,
}: StatsBarProps) => (
  <>
    <div className={styles.statsLeft}>
      <Moves moves={moves} />
      <Timer timerActive={timerActive} />
    </div>
    <div className={styles.feedback}>
      <Feedback message={feedback} />
    </div>
    <div className={styles.statsRight}>
      <div className={styles.btnExitRestart} onClick={onReset}>
        <ReplayCircleFilledOutlinedIcon />
      </div>
      <div className={styles.btnExitRestart} onClick={onExit}>
        <ExitToAppOutlinedIcon />
      </div>
    </div>
  </>
);
