import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Modal } from 'react-bootstrap';

import Button from '@/components/Button';
import Leaderboard from '@/components/Leaderboard';
import type { LeaderboardModalProps } from '@/types/components';

import styles from './styles/Modal.module.css';

export function LeaderboardModal({ show, onClose }: LeaderboardModalProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered={true}
      className={`${styles.modal} ${styles.leaderboardModal}`}
    >
      <Modal.Header className="border-0 d-flex justify-content-center">
        <Modal.Title>Leaderboard</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Leaderboard />
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          className={`${styles.closeButtonSolo} ${styles.modalButton}`}
          icon={<CloseOutlinedIcon fontSize="small" />}
          onClick={onClose}
          text="Close"
        />
      </Modal.Footer>
    </Modal>
  );
}
