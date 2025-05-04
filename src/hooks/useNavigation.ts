import { GAME_CONFIG } from '@/constants/constants';
import { useModal } from '@/hooks/useModal';
import { useSoundEffects } from '@/hooks/useSound';
import type { GameHandlerOptions } from '@/types/hooks';

interface NavigationOptions extends GameHandlerOptions {
  isAuthenticated: boolean;
}

export function useNavigation({
  setIsLoading,
  setIsGameActive,
  setSelectedCategory,
  setShowLeaderboardModal,
  logout,
  isAuthenticated,
}: NavigationOptions) {
  const { playSound } = useSoundEffects();
  const { openModal, closeModal } = useModal();

  function createSoundAction<T extends unknown[]>(
    action: (...args: T) => void,
  ) {
    return (...args: T) => {
      playSound('button');
      action(...args);
    };
  }

  function showLoadingAndStartGame(callback?: () => void) {
    playSound('button');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsGameActive(true);
      if (callback) callback();
    }, GAME_CONFIG.LOADING_DELAY);
  }

  // Open profile or auth modal based on authentication state
  function handleAccountClick() {
    playSound('button');
    if (isAuthenticated) {
      openModal('profile');
    } else {
      openModal('auth');
    }
  }

  function handleLogout() {
    playSound('button');
    logout();
    setIsGameActive(false);
    closeModal();
    if (setShowLeaderboardModal) setShowLeaderboardModal(false);
  }

  const closeAuthModal = createSoundAction(() => {
    closeModal();
  });
  const startGame = createSoundAction(() => {
    openModal('categorySelection');
  });
  const openInstructions = createSoundAction(() => {
    openModal('instructions');
  });
  const closeInstructions = createSoundAction(() => {
    closeModal();
  });
  const openLatestUpdates = createSoundAction(() => {
    openModal('latestUpdates');
  });
  const closeLatestUpdates = createSoundAction(() => {
    closeModal();
  });
  const closeCategorySelection = createSoundAction(() => {
    closeModal();
  });

  const openLeaderboardModal = createSoundAction(() => {
    if (setShowLeaderboardModal) setShowLeaderboardModal(true);
  });
  const closeLeaderboardModal = createSoundAction(() => {
    if (setShowLeaderboardModal) setShowLeaderboardModal(false);
  });

  function startGameWithCategory() {
    closeModal();
    showLoadingAndStartGame();
  }

  const handleRestart = createSoundAction(() => {
    setIsGameActive(false);
    setTimeout(() => {
      setIsGameActive(true);
    }, 300);
  });

  const handleExit = createSoundAction(() => {
    setIsGameActive(false);
  });
  const handleAppReset = createSoundAction(() => {
    setIsGameActive(false);
    setIsLoading(false);
  });

  function handleSelectCategory(category: string) {
    setSelectedCategory(category);
    startGameWithCategory();
  }

  return {
    startGame,
    handleRestart,
    handleExit,
    handleAppReset,
    handleSelectCategory,
    openInstructions,
    closeInstructions,
    openLatestUpdates,
    closeLatestUpdates,
    closeCategorySelection,
    openLeaderboardModal,
    closeLeaderboardModal,
    handleLogout,
    handleAccountClick,
    closeAuthModal,
  };
}
