import { ProfileData } from '@/components/auth/ProfileData';
import { Modal } from '@/components/Modal';
import { MODAL_CONFIGS } from '@/contexts/ModalContext';
import type { ProfileModalProps } from '@/types/components';

export function ProfileModal({ show, onClose, logout }: ProfileModalProps) {
  const config = MODAL_CONFIGS.profile;

  return (
    <Modal
      show={show}
      onClose={onClose}
      className="profileModal"
      backdrop={config.backdrop}
      showCloseButton={false}
    >
      <ProfileData onClose={onClose} logout={logout} />
    </Modal>
  );
}
