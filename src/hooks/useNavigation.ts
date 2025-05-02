import { GAME_CONFIG, SOUNDS } from '@/constants/constants';
import type { GameHandlerOptions } from '@/types/hooks';
import { useSoundEffects } from './useSound';
import type { ModalType, ModalData } from '@/types/context';

export const useNavigation = ({
  setIsLoading,
  setIsGameActive,
  setShowInstructions,
  setShowLatestUpdates,
  setShowCategorySelection,
  setSelectedCategory,
  setShowAuthModal,
  setShowLeaderboardModal,
  logout,
  isAuthenticated,
  openModal,
}: GameHandlerOptions & {
  setShowAuthModal: (value: boolean) => void;
  setShowLeaderboardModal: (value: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
  openModal: (type: ModalType, data?: ModalData) => void;
}) => {
  const { playSound } = useSoundEffects();

  // Define a function to handle sound actions
  const createSoundAction = <T>(action: (arg?: T) => void) => {
    return (arg?: T) => {
      playSound(SOUNDS.BUTTON);
      action(arg);
    };
  };

  // Common loading logic with sound
  const showLoadingAndStartGame = (callback?: () => void) => {
    playSound(SOUNDS.BUTTON);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsGameActive(true);
      callback?.();
    }, GAME_CONFIG.LOADING_DELAY);
  };

  // Handle account/profile modal open
  const handleAccountClick = () => {
    playSound(SOUNDS.BUTTON);
    if (isAuthenticated) {
      openModal('profile');
    } else {
      openModal('auth');
    }
  };

  // Logout and redirect to MainMenu
  const handleLogout = () => {
    playSound(SOUNDS.BUTTON);
    logout();
    setIsGameActive(false);
    setShowAuthModal(false);
    setShowLeaderboardModal(false);
  };

  // Navigation actions
  const closeAuthModal = createSoundAction(() => setShowAuthModal(false));
  const startGame = createSoundAction(() => setShowCategorySelection(true));
  const handleExit = createSoundAction(() => setIsGameActive(false));
  const handleAppReset = createSoundAction(() => {
    setIsGameActive(false);
    setIsLoading(false);
  });
  const openInstructions = createSoundAction(() => setShowInstructions(true));
  const closeInstructions = createSoundAction(() => setShowInstructions(false));
  const openLatestUpdates = createSoundAction(() => setShowLatestUpdates(true));
  const closeLatestUpdates = createSoundAction(() =>
    setShowLatestUpdates(false),
  );
  const closeCategorySelection = createSoundAction(() =>
    setShowCategorySelection(false),
  );

  // Leaderboard modal actions
  const openLeaderboardModal = createSoundAction(() =>
    setShowLeaderboardModal(true),
  );

  // Close leaderboard modal
  const closeLeaderboardModal = createSoundAction(() =>
    setShowLeaderboardModal(false),
  );

  // Start game with selected category
  const startGameWithCategory = () => {
    setShowCategorySelection(false);
    showLoadingAndStartGame();
  };

  // Restart game with loading screen
  const handleRestart = createSoundAction(() => {
    setIsGameActive(false);
    showLoadingAndStartGame();
  });

  // Handle game-specific error recovery
  const handleGameReset = createSoundAction(handleRestart);

  // Handle category selection
  const handleSelectCategory = (category: string) => {
    playSound(SOUNDS.BUTTON);
    setSelectedCategory(category);
    startGameWithCategory();
  };

  return {
    startGame,
    startGameWithCategory,
    handleRestart,
    handleExit,
    handleAppReset,
    handleGameReset,
    handleSelectCategory,
    openInstructions,
    closeInstructions,
    closeAuthModal,
    openLatestUpdates,
    closeLatestUpdates,
    closeCategorySelection,
    openLeaderboardModal,
    closeLeaderboardModal,
    handleLogout,
    handleAccountClick,
  };
};
