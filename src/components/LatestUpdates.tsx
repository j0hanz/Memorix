import CommitStatus from '@/components/CommitHistory';
import { Modal } from '@/components/Modal';
import type { LatestUpdatesProps } from '@/types/components';

export function LatestUpdates({ show, onClose }: LatestUpdatesProps) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Latest Changes"
      className="latestUpdatesModal"
      showCloseButton={false}
    >
      <CommitStatus onClose={onClose} />
    </Modal>
  );
}
