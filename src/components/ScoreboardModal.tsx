import { Modal } from 'react-bootstrap';

import ScoreboardData from '@/components/ScoreboardData';
import type { ScoreboardModalProps } from '@/types/components';

import styles from './styles/Modal.module.css';

export function ScoreboardModal({
  show,
  onClose,
  onReset,
  onExit,
  title = 'Game completed!',
  children,
  moves,
  completedTime,
  categoryCode,
}: ScoreboardModalProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className={styles.modal}
      backdrop="static"
    >
      <Modal.Header className="border-0 d-flex justify-content-center">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <ScoreboardData
          onReset={onReset}
          onExit={onExit}
          moves={moves}
          completedTime={completedTime}
          categoryCode={categoryCode}
        >
          {children}
        </ScoreboardData>
      </Modal.Body>
    </Modal>
  );
}
