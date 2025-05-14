import { Modal } from '@/components/Modal';
import { ScoreboardData } from '@/components/ScoreboardData';
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
  return (
    <Modal
      show={show}
      onClose={onClose}
      title={title}
      backdrop="static"
      showCloseButton={false}
    >
      <ScoreboardData
        onReset={onReset}
        onExit={onExit}
        moves={moves}
        completedTime={completedTime}
        categoryCode={categoryCode}
      >
        {children}
      </ScoreboardData>
    </Modal>
  );
}
