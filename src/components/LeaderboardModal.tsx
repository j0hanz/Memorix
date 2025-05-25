import { Modal } from '@/components/Modal';
import type { LeaderboardModalProps } from '@/types/components';

import { Leaderboard } from './Leaderboard';
import styles from './styles/Modal.module.css';

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
