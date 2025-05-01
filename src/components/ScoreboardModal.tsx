import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { ModalFooterButtons } from './ModalFooterButtons';
import { useAuth } from '@/hooks/useAuth';
import { useScore } from '@/hooks/useScore';
import { useSaveScore } from '@/hooks/useSaveScore';
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
        <ModalFooterButtons
          leftText="Restart"
          rightText="Exit"
          onLeftClick={onReset}
          onRightClick={onExit}
          leftIcon={<ReplayCircleFilledOutlinedIcon />}
          rightIcon={<ExitToAppOutlinedIcon />}
        />
      </Modal.Footer>
    </Modal>
  );
}
