import { ModalFooterButtons } from '@/components/modals/ModalFooterButtons';
import { LoadingSpinner } from '@/components/ui/Spinner';
import { useServices } from '@/hooks/api/useServices';
import { useProfile, useToast } from '@/hooks/shared/useProvider';
import type { ProfileFooterProps } from '@/types/components';
import { AUTH_ICONS, NAVIGATION_ICONS } from '@/utils/ui/iconUtils';

export function ProfileFooter({
  activeTab,
  showPasswordTab,
  showDeleteTab,
  showClearScoresTab,
  onBack,
  onClose,
}: ProfileFooterProps) {
  const {
    loading,
    profileImage,
    passwordFormComplete,
    handleUpdateProfile,
    handleDeleteAccount,
  } = useProfile();
  const { game } = useServices();
  const { showToast } = useToast();

  const handleClearAllScores = async () => {
    try {
      const response = await game.clearAllUserScores();
      const message = response.detail || 'All scores cleared successfully!';
      showToast(message);
      onBack();
    } catch {
      const errorMessage = 'Failed to clear scores. Please try again.';
      showToast(errorMessage);
    }
  };

  if (activeTab === 'overview') {
    if (showPasswordTab) {
      return (
        <ModalFooterButtons
          leftText={loading ? <LoadingSpinner /> : 'Change Password'}
          rightText="Back"
          onLeftClick={undefined}
          onRightClick={onBack}
          leftIcon={loading ? undefined : AUTH_ICONS.password()}
          rightIcon={AUTH_ICONS.back()}
          leftDisabled={loading || !passwordFormComplete}
          rightDisabled={loading}
          leftType="submit"
          leftForm="password-change-form"
        />
      );
    }

    if (showDeleteTab) {
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

    if (showClearScoresTab) {
      return (
        <ModalFooterButtons
          leftText={loading ? <LoadingSpinner /> : 'Clear All Scores'}
          rightText="Back"
          onLeftClick={() => {
            void handleClearAllScores();
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

    // For the overview tab, show save changes or close
    return (
      <ModalFooterButtons
        leftText={loading ? <LoadingSpinner /> : 'Save Changes'}
        rightText="Close"
        rightIcon={NAVIGATION_ICONS.close()}
        onLeftClick={() => {
          void handleUpdateProfile();
        }}
        onRightClick={onClose}
        leftIcon={loading ? undefined : AUTH_ICONS.upload()}
        leftDisabled={loading || !profileImage}
        rightDisabled={loading}
      />
    );
  }

  // For other tabs, just show the close button
  return (
    <ModalFooterButtons
      rightText="Close"
      onRightClick={onClose}
      rightIcon={NAVIGATION_ICONS.close()}
    />
  );
}
