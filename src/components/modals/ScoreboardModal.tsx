import { ScoreboardData } from '@/components/leaderboard/ScoreboardData';
import { Modal } from '@/components/modals/Modal';
import type { ScoreboardModalProps } from '@/types/components';

export function ScoreboardModal({
  show,
  onClose,
  onReset,
  onExit,
  title = 'Game completed!',
  children,
  moves,
  completedTime,
  categoryCode,
}: ScoreboardModalProps) {
  const handleReset = onReset ?? (() => {});
  const handleExit = onExit ?? (() => {});

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={title}
      backdrop="static"
      showCloseButton={false}
    >
      <ScoreboardData
        onReset={handleReset}
        onExit={handleExit}
        moves={moves}
        completedTime={completedTime}
        categoryCode={categoryCode}
      >
        {children}
      </ScoreboardData>
    </Modal>
  );
}
