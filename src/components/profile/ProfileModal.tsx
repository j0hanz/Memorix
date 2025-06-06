import { Modal } from '@/components/modals/Modal';
import { ProfileData } from '@/components/profile/ProfileData';
import { ProtectedRoute } from '@/components/ui/ProtectedRoute';
import { useToast } from '@/hooks/shared/useProvider';
import type { ProfileModalProps } from '@/types/components';

export function ProfileModal({ show, onClose, logout }: ProfileModalProps) {
  const { hideToast } = useToast();

  const handleClose = () => {
    // Clear global toast when modal is closed
    hideToast();
    onClose();
  };

  return (
    <Modal show={show} onClose={handleClose} showCloseButton={false}>
      <ProtectedRoute
        onAuthRequired={() => {
          handleClose();
        }}
      >
        <ProfileData onClose={handleClose} logout={logout} />
      </ProtectedRoute>
    </Modal>
  );
}
