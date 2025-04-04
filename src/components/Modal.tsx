import { Modal } from 'react-bootstrap';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Button from './Button';
import styles from './styles/Modal.module.css';
import Scoreboard from '@/components/scoreData';
import InstructionsData from '@/components/instructionsData';
import CommitStatus from './CommitStatus';
import CategoryData from './Category';
import AuthData from './AuthData';
import {
  ScoreboardModalProps,
  GameInstructionsProps,
  LatestUpdatesProps,
  CategoryProps,
  AuthModalProps,
} from '@/types/components';

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
      <Modal.Footer className="border-0 mt-2">
        <Button
          className={`${styles.btnRestart} ${styles.modalButton}`}
          onClick={onReset}
        >
          <ReplayCircleFilledOutlinedIcon
            className={`${styles.btnIcon} me-1`}
          />
          Restart
        </Button>
        <Button
          className={`${styles.btnExit} ${styles.modalButton}`}
          onClick={onExit}
        >
          <ExitToAppOutlinedIcon className={`${styles.btnIcon} me-1`} />
          Exit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// Auth modal component
export function AuthModal({ show, onClose }: AuthModalProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className={`${styles.modal} ${styles.authModal}`}
    >
      <Modal.Body className="p-0">
        <AuthData onClose={onClose} />
      </Modal.Body>
      <Modal.Footer className="border-0" />
    </Modal>
  );
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
      <Modal.Footer className="border-0 mt-2">
        <Button className={styles.btnClose} onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// Category selection modal
export function CategorySelection({
  show,
  onClose,
  onSelectCategory,
}: CategoryProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className={`${styles.modal} ${styles.categoryModal}`}
    >
      <Modal.Header className="border-0 d-flex justify-content-center">
        <Modal.Title>Select Category:</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-0">
        <CategoryData onSelectCategory={onSelectCategory} />
      </Modal.Body>
      <Modal.Footer className="border-0 mt-3">
        <Button className={styles.btnClose} onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
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
      <Modal.Footer className="border-0 mt-2">
        <Button className={styles.btnClose} onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
