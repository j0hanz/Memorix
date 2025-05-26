import { Scoreboard } from '@/components/leaderboard/scoreData';
import { ScoreFeedback } from '@/components/leaderboard/ScoreFeedback';
import { ModalFooterButtons } from '@/components/modals/ModalFooterButtons';
import { ProtectedRoute } from '@/components/ui/ProtectedRoute';
import { useModal } from '@/hooks/useProvider';
import { useScoreboard } from '@/hooks/useScoreboard';
import type { ScoreboardDataProps } from '@/types/components';
import { MODAL_ICONS } from '@/utils/iconUtils';

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
      <ProtectedRoute
        onAuthRequired={() => {
          openModal('auth');
        }}
      >
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
        leftIcon={MODAL_ICONS.restart()}
        rightIcon={MODAL_ICONS.exit()}
      />
    </>
  );
}
