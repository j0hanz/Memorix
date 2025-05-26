import { Modal } from '@/components/modals/Modal';
import styles from '@/components/styles/Modal.module.css';
import { CommitStatus } from '@/components/ui/CommitHistory';
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
