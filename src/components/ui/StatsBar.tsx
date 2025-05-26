import { Button } from '@/components/buttons/Button';
import { Feedback } from '@/components/feedback/Feedback';
import { Moves, Timer } from '@/components/game/GameStats';
import btnStyles from '@/components/styles/Button.module.css';
import { LoadingSpinner } from '@/components/ui/Spinner';
import { useAppState } from '@/hooks/useAppState';
import type { StatsBarProps } from '@/types/components';
import { GAME_ICONS } from '@/utils/iconUtils';

import styles from '../styles/Cards.module.css';

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
          className={btnStyles.btnRounded}
          onClick={onReset}
          icon={isRestarting ? <LoadingSpinner /> : GAME_ICONS.restart()}
          aria-label={isRestarting ? 'Restarting...' : 'Reset Game'}
          color="secondary"
          disabled={loading.isLoading}
        />
        <Button
          className={btnStyles.btnRounded}
          onClick={onExit}
          icon={GAME_ICONS.exit()}
          aria-label="Exit Game"
          color="secondary"
          disabled={loading.isLoading}
        />
      </div>
    </>
  );
};
