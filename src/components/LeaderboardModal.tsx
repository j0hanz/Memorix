import { Leaderboard } from '@/components/Leaderboard';
import { Modal } from '@/components/Modal';

import styles from './styles/Modal.module.css';

export function LeaderboardModal({
  show = true,
  onClose,
}: {
  show?: boolean;
  onClose?: () => void;
}) {
  const handleOnClose = onClose ?? (() => {});
  return (
    <Modal
      show={show}
      onClose={handleOnClose}
      title="Leaderboard"
      className={styles.leaderboardModal}
    >
      <Leaderboard />
    </Modal>
  );
}
