import { Modal } from 'react-bootstrap';
import InstructionsData from '@/components/instructionsData';
import CommitStatus from './CommitHistory';
import CategoryData from './Category';
import AuthData from './auth/AuthData';
import ProfileData from './auth/ProfileData';
import { useLinks } from '@/hooks/useLinks';
import Leaderboard from './Leaderboard';
import { ModalFooterButtons } from './ModalFooterButtons';
import Button from './Button';
import type {
  GameInstructionsProps,
  LatestUpdatesProps,
  CategoryProps,
  AuthModalProps,
  ProfileModalProps,
  LeaderboardModalProps,
} from '@/types/components';
import styles from './styles/Modal.module.css';

// Leaderboard modal component
export function LeaderboardModal({ show, onClose }: LeaderboardModalProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className={`${styles.modal} ${styles.leaderboardModal}`}
    >
      <Modal.Header className="border-0 d-flex justify-content-center">
        <Modal.Title>Leaderboard</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Leaderboard />
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button className={styles.btnClose} onClick={onClose} text="Close" />
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

// Profile modal component
export function ProfileModal({ show, onClose, logout }: ProfileModalProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className={`${styles.modal} ${styles.profileModal}`}
    >
      <Modal.Body className="p-0">
        <ProfileData onClose={onClose} logout={logout} />
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
        <ModalFooterButtons rightText="Close" onRightClick={onClose} />
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
    <Modal show={show} onHide={onClose} centered className={styles.modal}>
      <Modal.Header className="border-0 d-flex justify-content-center">
        <Modal.Title>Select Category</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-0">
        <CategoryData onSelectCategory={onSelectCategory} />
      </Modal.Body>
      <Modal.Footer className="border-0 mt-3">
        <ModalFooterButtons rightText="Close" onRightClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
}

// Latest updates modal
export function LatestUpdates({ show, onClose }: LatestUpdatesProps) {
  const { handleGitHubClick } = useLinks();

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
      <Modal.Body className="p-0">
        <CommitStatus />
      </Modal.Body>
      <Modal.Footer className="border-0">
        <ModalFooterButtons
          leftText="Github"
          rightText="Close"
          onLeftClick={handleGitHubClick}
          onRightClick={onClose}
        />
      </Modal.Footer>
    </Modal>
  );
}
