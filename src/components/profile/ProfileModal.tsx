import { Modal } from '@/components/modals/Modal';
import { ProfileData } from '@/components/profile/ProfileData';
import { ProtectedRoute } from '@/components/ui/ProtectedRoute';
import type { ProfileModalProps } from '@/types/components';

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
