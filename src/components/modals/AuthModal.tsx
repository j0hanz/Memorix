import { AuthData } from '@/components/forms/AuthData';
import { Modal } from '@/components/modals/Modal';
import { MODAL_CONFIGS } from '@/constants/configs';
import type { AuthModalProps } from '@/types/components';

export function AuthModal({ show, onClose }: AuthModalProps) {
  const config = MODAL_CONFIGS.auth;

  return (
    <Modal
      show={show}
      onClose={onClose}
      className="authModal"
      backdrop={config.backdrop}
      showCloseButton={false}
    >
      <AuthData onClose={onClose} />
    </Modal>
  );
}
