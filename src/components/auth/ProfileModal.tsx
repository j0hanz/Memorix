import { Modal } from 'react-bootstrap';

import ProfileData from '@/components/auth/ProfileData';
import styles from '@/components/styles/Modal.module.css';
import type { ProfileModalProps } from '@/types/components';

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
    </Modal>
  );
}
