import { Modal } from '@/components/Modal';
import type { ProfileModalProps } from '@/types/components';

import { ProfileData } from './ProfileData';

export function ProfileModal({ show, onClose, logout }: ProfileModalProps) {
  return (
    <Modal show={show} onClose={onClose} showCloseButton={false}>
      <ProfileData onClose={onClose} logout={logout} />
    </Modal>
  );
}
