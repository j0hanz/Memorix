import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import { ModalFooterButtons } from '@/components/ModalFooterButtons';
import { LoadingSpinner } from '@/components/Spinner';
import { useProfile } from '@/hooks/useProvider';
import type { ProfileFooterProps } from '@/types/components';

export function ProfileFooter({
  activeTab,
  showPasswordTab,
  showDeleteTab,
  onBack,
  onClose,
}: ProfileFooterProps) {
  const { loading, profileImage, handleUpdateProfile, handleDeleteAccount } =
    useProfile();

  if (activeTab === 'overview' && showPasswordTab) {
    return (
      <ModalFooterButtons
        leftText={loading ? <LoadingSpinner /> : 'Save Changes'}
        rightText="Back"
        onLeftClick={undefined}
        onRightClick={onBack}
        leftIcon={
          loading ? undefined : <DriveFolderUploadIcon fontSize="small" />
        }
        rightIcon={<ArrowBackIcon fontSize="small" />}
        leftDisabled={loading}
        rightDisabled={loading}
        leftType="submit"
      />
    );
  }

  if (activeTab === 'overview' && showDeleteTab) {
    return (
      <ModalFooterButtons
        leftText={loading ? <LoadingSpinner /> : 'Delete'}
        rightText="Back"
        onLeftClick={() => {
          void handleDeleteAccount();
        }}
        onRightClick={onBack}
        leftIcon={loading ? undefined : <DeleteForeverIcon fontSize="small" />}
        rightIcon={<ArrowBackIcon fontSize="small" />}
        leftDisabled={loading}
        rightDisabled={loading}
        leftType="button"
      />
    );
  }

  return (
    <ModalFooterButtons
      leftText={loading ? <LoadingSpinner /> : 'Save Changes'}
      rightText="Close"
      onLeftClick={() => {
        void handleUpdateProfile();
      }}
      onRightClick={onClose}
      leftIcon={
        loading ? undefined : <DriveFolderUploadIcon fontSize="small" />
      }
      leftDisabled={loading || !profileImage || activeTab !== 'overview'}
      rightDisabled={false}
    />
  );
}
