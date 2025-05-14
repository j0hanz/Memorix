import AuthData from '@/components/auth/AuthData';
import { Modal } from '@/components/Modal';
import { MODAL_CONFIGS } from '@/contexts/ModalContext';
import type { AuthModalProps } from '@/types/components';

export function AuthModal({ show, onClose }: AuthModalProps) {
  const config = MODAL_CONFIGS.auth;

  return (
    <Modal
      show={show}
      onClose={onClose}
      className="authModal"
      size={config.size}
      backdrop={config.backdrop}
      showCloseButton={false}
    >
      <AuthData onClose={onClose} />
    </Modal>
  );
}
