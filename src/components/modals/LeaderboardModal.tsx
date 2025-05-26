import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { Modal } from '@/components/modals/Modal';
import type { LeaderboardModalProps } from '@/types/components';

import styles from '../styles/Modal.module.css';

export function LeaderboardModal({ show, onClose }: LeaderboardModalProps) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      className={styles.modalContent}
      title="Leaderboard"
    >
      <Leaderboard />
    </Modal>
  );
}
