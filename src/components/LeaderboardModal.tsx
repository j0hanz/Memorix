import { Modal } from '@/components/Modal';
import type { LeaderboardModalProps } from '@/types/components';

import { Leaderboard } from './Leaderboard';

export function LeaderboardModal({ show, onClose }: LeaderboardModalProps) {
  return (
    <Modal show={show} onClose={onClose} title="Leaderboard">
      <Leaderboard />
    </Modal>
  );
}
