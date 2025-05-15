import { Leaderboard } from '@/components/Leaderboard';
import { Modal } from '@/components/Modal';
import type { LeaderboardModalProps } from '@/types/components';

import styles from './styles/Modal.module.css';

export function LeaderboardModal({ show, onClose }: LeaderboardModalProps) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Leaderboard"
      className={styles.leaderboardModal}
    >
      <Leaderboard />
    </Modal>
  );
}
