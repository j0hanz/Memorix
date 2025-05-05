import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';

import appStyles from '@/App.module.css';
import type { StatsBarProps } from '@/types/components';

import Button from './Button';
import Feedback from './Feedback';
import { Moves, Timer } from './GameStats';
import styles from './styles/Cards.module.css';

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
      <Button
        className={appStyles.btnRounded}
        onClick={onReset}
        icon={<ReplayCircleFilledOutlinedIcon fontSize="small" />}
        aria-label="Reset Game"
        color="secondary"
      />
      <Button
        className={appStyles.btnRounded}
        onClick={onExit}
        icon={<ExitToAppOutlinedIcon fontSize="small" />}
        aria-label="Exit Game"
        color="secondary"
      />
    </div>
  </>
);
