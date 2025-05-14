import { CommitStatus } from '@/components/CommitHistory';
import { Modal } from '@/components/Modal';
import styles from '@/components/styles/Modal.module.css';
import type { LatestUpdatesProps } from '@/types/components';

export function LatestUpdates({ show, onClose }: LatestUpdatesProps) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Latest Changes"
      className={styles.latestUpdatesModal}
      showCloseButton={false}
    >
      <CommitStatus onClose={onClose} />
    </Modal>
  );
}
