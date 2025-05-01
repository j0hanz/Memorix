import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useAuth } from '@/hooks/useAuth';
import { useScore } from '@/hooks/useScore';
import { useSaveScore } from '@/hooks/useSaveScore';
import Button from './Button';
import Scoreboard from '@/components/scoreData';
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
  const { isAuthenticated } = useAuth();
  const { stars } = useScore(moves, completedTime);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useSaveScore({
    show,
    isAuthenticated,
    scoreSaved,
    setScoreSaved,
    setSaveError,
    categoryCode,
    moves,
    completedTime,
    stars,
  });

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
          className={`${styles.btnLeft} ${styles.modalButton}`}
          onClick={onReset}
          icon={<ReplayCircleFilledOutlinedIcon />}
          text="Restart"
          color="primary"
        />
        <Button
          className={`${styles.btnRight} ${styles.modalButton}`}
          onClick={onExit}
          icon={<ExitToAppOutlinedIcon />}
          text="Exit"
          color="secondary"
        />
      </Modal.Footer>
    </Modal>
  );
}
