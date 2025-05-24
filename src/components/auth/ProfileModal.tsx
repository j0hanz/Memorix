import { Modal } from '@/components/Modal';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import type { ProfileModalProps } from '@/types/components';

import { ProfileData } from './ProfileData';

export function ProfileModal({ show, onClose, logout }: ProfileModalProps) {
  return (
    <Modal show={show} onClose={onClose} showCloseButton={false}>
      <ProtectedRoute
        onAuthRequired={() => {
          onClose();
        }}
      >
        <ProfileData onClose={onClose} logout={logout} />
      </ProtectedRoute>
    </Modal>
  );
}
