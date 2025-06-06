import { ModalFooterButtons } from '@/components/modals/ModalFooterButtons';
import { LoadingSpinner } from '@/components/ui/Spinner';
import { useProfile } from '@/hooks/shared/useProvider';
import type { ProfileFooterProps } from '@/types/components';
import { AUTH_ICONS } from '@/utils/ui/iconUtils';

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
        leftText={loading ? <LoadingSpinner /> : 'Change Password'}
        rightText="Back"
        onLeftClick={undefined}
        onRightClick={onBack}
        leftIcon={loading ? undefined : AUTH_ICONS.password()}
        rightIcon={AUTH_ICONS.back()}
        leftDisabled={loading}
        rightDisabled={loading}
        leftType="submit"
        leftForm="password-change-form"
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
        leftIcon={loading ? undefined : AUTH_ICONS.delete()}
        rightIcon={AUTH_ICONS.back()}
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
      leftIcon={loading ? undefined : AUTH_ICONS.upload()}
      leftDisabled={loading || !profileImage || activeTab !== 'overview'}
      rightDisabled={false}
    />
  );
}
