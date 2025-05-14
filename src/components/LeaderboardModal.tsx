import Leaderboard from '@/components/Leaderboard';
import { Modal } from '@/components/Modal';
import type { LeaderboardModalProps } from '@/types/components';

export function LeaderboardModal({ show, onClose }: LeaderboardModalProps) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Leaderboard"
      className="leaderboardModal"
    >
      <Leaderboard />
    </Modal>
  );
}
