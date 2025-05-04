import { Modal } from 'react-bootstrap';

import CommitStatus from '@/components/CommitHistory';
import type { LatestUpdatesProps } from '@/types/components';

import styles from './styles/Modal.module.css';

export function LatestUpdates({ show, onClose }: LatestUpdatesProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered={true}
      className={`${styles.modal} ${styles.latestUpdatesModal}`}
    >
      <Modal.Header className="border-0 d-flex justify-content-center">
        <Modal.Title>Latest Changes</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <CommitStatus onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
}
