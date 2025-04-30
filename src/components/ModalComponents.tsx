import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { useAuth } from '@/hooks/useAuth';
import { useScore } from '@/hooks/useScore';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Button from './Button';
import styles from './styles/Modal.module.css';
import Scoreboard from '@/components/scoreData';
import InstructionsData from '@/components/instructionsData';
import CommitStatus from './CommitHistory';
import CategoryData from './Category';
import AuthData from './auth/AuthData';
import ProfileData from './auth/ProfileData';
import gameService from '@/services/gameService';
import type {
  ScoreboardModalProps,
  GameInstructionsProps,
  LatestUpdatesProps,
  CategoryProps,
  AuthModalProps,
  ProfileModalProps,
  LeaderboardModalProps,
} from '@/types/components';
import { useLinks } from '@/hooks/useLinks';
import Leaderboard from './Leaderboard';

export default function ScoreboardModal({
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
  const { isAuthenticated } = useAuth();
  const { stars } = useScore(moves, completedTime);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const isSaving = useRef(false);

  // Save the score when the modal is shown
  useEffect(() => {
    const saveScore = async () => {
      // Check if already saving or already saved
      if (show && isAuthenticated && !scoreSaved && !isSaving.current) {
        isSaving.current = true;
        try {
          await gameService.saveGameResult({
            category: categoryCode.toUpperCase(),
            moves,
            time_seconds: completedTime,
            stars,
          });
          setScoreSaved(true);
        } catch (error) {
          console.error('Failed to save score:', error);
          setSaveError('Failed to save your score. Try again later.');
        } finally {
          isSaving.current = false;
        }
      }
    };

    saveScore();
  }, [
    show,
    isAuthenticated,
    scoreSaved,
    categoryCode,
    completedTime,
    moves,
    stars,
  ]);

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
        <Scoreboard moves={moves} completedTime={completedTime.toString()} />
        {isAuthenticated && scoreSaved && (
          <div className="text-success text-center mt-3">
            <small>Score saved successfully!</small>
          </div>
        )}
        {saveError && (
          <div className="text-danger text-center mt-3">
            <small>{saveError}</small>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0 mt-2">
        <Button
          className={`${styles.btnRestart} ${styles.modalButton}`}
          onClick={onReset}
          icon={<ReplayCircleFilledOutlinedIcon />}
          text="Restart"
        />
        <Button
          className={`${styles.btnExit} ${styles.modalButton}`}
          onClick={onExit}
          icon={<ExitToAppOutlinedIcon />}
          text="Exit"
        />
      </Modal.Footer>
    </Modal>
  );
}

// Add this to exports
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
        <Button className={styles.btnClose} onClick={onClose} text="Close" />
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
        <Button className={styles.btnClose} onClick={onClose} text="Close" />
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
      <Modal.Body className="p-0">
        <CommitStatus />
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          className={`${styles.btnLeft} ${styles.modalButton}`}
          onClick={useLinks().handleGitHubClick}
          text="Github"
        />
        <Button
          className={`${styles.btnRight} ${styles.modalButton}`}
          onClick={onClose}
          text="Close"
        />
      </Modal.Footer>
    </Modal>
  );
}
