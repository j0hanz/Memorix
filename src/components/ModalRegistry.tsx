import { ProfileModal } from '@/components/auth/ProfileModal';
import { AuthModal } from '@/components/AuthModal';
import { CategorySelection } from '@/components/CategorySelection';
import { GameInstructions } from '@/components/GameInstructions';
import { LatestUpdates } from '@/components/LatestUpdates';
import { ScoreboardModal } from '@/components/ScoreboardModal';
import { useModal } from '@/hooks/useProvider';
import { useNavigation } from '@/hooks/useProvider';

export function ModalRegistry() {
  const { activeModal, closeModal, modalData } = useModal();
  const navigation = useNavigation();

  // No modals to render if activeModal is null
  if (!activeModal) return null;

  // Default handlers for all modals
  const handleClose = () => {
    closeModal();
  };

  // Common props for all modals
  const commonModalProps = {
    show: true,
    onClose: handleClose,
  };

  // Create non-null handlers for required props
  const handleReset = () => {
    if (modalData.onReset) {
      modalData.onReset();
    } else {
      closeModal();
    }
  };

  const handleExit = () => {
    if (modalData.onExit) {
      modalData.onExit();
    } else {
      closeModal();
    }
  };

  // Map of modal types to their components
  switch (activeModal) {
    case 'auth':
      return <AuthModal {...commonModalProps} />;

    case 'instructions':
      return <GameInstructions {...commonModalProps} />;

    case 'latestUpdates':
      return <LatestUpdates {...commonModalProps} />;

    case 'categorySelection':
      return (
        <CategorySelection
          {...commonModalProps}
          onSelectCategory={navigation.handleSelectCategory}
        />
      );

    case 'profile':
      return (
        <ProfileModal {...commonModalProps} logout={navigation.handleLogout} />
      );

    case 'scoreboard':
      return (
        <ScoreboardModal
          {...commonModalProps}
          onReset={handleReset}
          onExit={handleExit}
          moves={modalData.moves || 0}
          completedTime={modalData.completedTime || 0}
          categoryCode={modalData.categoryCode || ''}
        >
          {modalData.children}
        </ScoreboardModal>
      );

    default:
      return null;
  }
}
