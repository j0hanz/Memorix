import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { Modal } from '@/components/modals/Modal';
import styles from '@/components/modals/styles/Modal.module.css';
import type { LeaderboardModalProps } from '@/types/components';

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
