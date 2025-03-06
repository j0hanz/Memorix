import { ReactNode } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { HiArrowPath } from 'react-icons/hi2';
import { TbDoorExit } from 'react-icons/tb';
import styles from './styles/Modal.module.css';
import Scoreboard from '@/data/scoreData';
import InstructionsData from '@/data/instructionsData';
import { handleButtonClick } from '@/utils/soundManager';
import CommitStatus from './CommitStatus';

interface ScoreboardModalProps {
  show: boolean;
  onClose: () => void;
  onReset: () => void;
  onExit: () => void;
  title?: string;
  children?: ReactNode;
  moves: number;
  completedTime: string;
}

// Main modal
export default function ScoreboardModal({
  show,
  onClose,
  onReset,
  onExit,
  title = 'Game completed!',
  children,
  moves,
  completedTime,
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
      <Modal.Body>
        {children}
        <Scoreboard moves={moves} completedTime={completedTime} />
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          className={`${styles.btnRestart} ${styles.modalButton}`}
          onClick={handleButtonClick(onReset)}
        >
          <HiArrowPath className={`${styles.btnIcon} me-1`} />
          Restart
        </Button>
        <Button
          className={`${styles.btnExit} ${styles.modalButton}`}
          onClick={handleButtonClick(onExit)}
        >
          <TbDoorExit className={`${styles.btnIcon} me-1`} />
          Exit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface GameInstructionsProps {
  show: boolean;
  onClose: () => void;
}

// Game instructions modal
export function GameInstructions({ show, onClose }: GameInstructionsProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className={`${styles.modal} ${styles.instructionsModal}`}
    >
      <InstructionsData />
      <Modal.Footer className="border-0">
        <Button
          className={styles.btnClose}
          onClick={handleButtonClick(onClose)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface LatestUpdatesProps {
  show: boolean;
  onClose: () => void;
}

// Latest updates modal
export function LatestUpdates({ show, onClose }: LatestUpdatesProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className={`${styles.modal} ${styles.latestUpdatesModal}`}
    >
      <Modal.Header className="border-0 d-flex justify-content-center">
        <Modal.Title>Latest Changes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CommitStatus />
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          className={styles.btnClose}
          onClick={handleButtonClick(onClose)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
