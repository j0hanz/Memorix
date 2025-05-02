import { Modal } from 'react-bootstrap';
import AuthData from '@/components/auth/AuthData';
import type { AuthModalProps } from '@/types/components';
import styles from './styles/Modal.module.css';

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
    </Modal>
  );
}
