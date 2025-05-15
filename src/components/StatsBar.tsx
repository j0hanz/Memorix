import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';

import appStyles from '@/App.module.css';
import { LoadingSpinner } from '@/components/Spinner';
import { useAppState } from '@/hooks/useAppState';
import type { StatsBarProps } from '@/types/components';

import { Button } from './Button';
import { Feedback } from './Feedback';
import { Moves, Timer } from './GameStats';
import styles from './styles/Cards.module.css';

export const StatsBar = ({
  moves,
  timerActive,
  feedback,
  onReset,
  onExit,
}: StatsBarProps) => {
  const { loading } = useAppState();
  const isRestarting = loading.isLoading && loading.type === 'restart';

  return (
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
          icon={
            isRestarting ? (
              <LoadingSpinner />
            ) : (
              <ReplayCircleFilledOutlinedIcon fontSize="small" />
            )
          }
          aria-label={isRestarting ? 'Restarting...' : 'Reset Game'}
          color="secondary"
          disabled={loading.isLoading}
        />
        <Button
          className={appStyles.btnRounded}
          onClick={onExit}
          icon={<ExitToAppOutlinedIcon fontSize="small" />}
          aria-label="Exit Game"
          color="secondary"
          disabled={loading.isLoading}
        />
      </div>
    </>
  );
};
