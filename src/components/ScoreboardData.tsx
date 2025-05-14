import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';

import { Scoreboard } from '@/components/scoreData';
import { useScoreboard } from '@/hooks/useScoreboard';
import type { ScoreboardDataProps } from '@/types/components';

import { ModalFooterButtons } from './ModalFooterButtons';
import { ScoreFeedback } from './ScoreFeedback';

export function ScoreboardData({
  onReset,
  onExit,
  moves,
  completedTime,
  categoryCode,
  children,
}: ScoreboardDataProps) {
  const { isAuthenticated, scoreSaved, saveError } = useScoreboard({
    moves,
    completedTime,
    categoryCode,
  });

  return (
    <>
      <div className="p-3">
        {children}
        <Scoreboard moves={moves} completedTime={completedTime.toString()} />
        <ScoreFeedback
          isAuthenticated={isAuthenticated}
          scoreSaved={scoreSaved}
          saveError={saveError}
        />
      </div>
      <ModalFooterButtons
        leftText="Restart"
        rightText="Exit"
        onLeftClick={onReset}
        onRightClick={onExit}
        leftIcon={<ReplayCircleFilledOutlinedIcon fontSize="small" />}
        rightIcon={<ExitToAppOutlinedIcon fontSize="small" />}
      />
    </>
  );
}
