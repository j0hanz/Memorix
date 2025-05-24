import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Scoreboard } from '@/components/scoreData';
import { useModal } from '@/hooks/useProvider';
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
  const { openModal } = useModal();
  const { isAuthenticated, scoreSaved, saveError } = useScoreboard({
    moves,
    completedTime,
    categoryCode,
  });

  return (
    <>
      {children}
      <Scoreboard moves={moves} completedTime={completedTime.toString()} />
      <ProtectedRoute onAuthRequired={() => { openModal('auth'); }}>
        <ScoreFeedback
          isAuthenticated={isAuthenticated}
          scoreSaved={scoreSaved}
          saveError={saveError}
        />
      </ProtectedRoute>
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
