import { GAME_CONFIG } from '@/constants/constants';
import { useModal } from '@/hooks/useModal';
import { useSoundEffects } from '@/hooks/useSound';
import type { NavigationOptions } from '@/types/hooks';

export function useNavigation({
  setLoading,
  setIsGameActive,
  setSelectedCategory,
  setShowLeaderboardModal,
  logout,
  isAuthenticated,
}: NavigationOptions) {
  const { playSound } = useSoundEffects();
  const { openModal, closeModal } = useModal();

  // Creates a wrapper function that plays a sound before executing an action
  function createSoundAction<T extends unknown[]>(
    action: (...args: T) => void,
  ) {
    return (...args: T) => {
      playSound('button');
      action(...args);
    };
  }

  // Shows loading state with message and executes callback after delay
  function showLoadingWithMessage(
    message: string,
    type: string,
    callback?: () => void,
  ) {
    playSound('button');
    setLoading({ isLoading: true, message, type });
    setTimeout(() => {
      setLoading({ isLoading: false, message: '', type: '' });
      if (callback) callback();
    }, GAME_CONFIG.LOADING_DELAY);
  }

  // Shows loading state and starts the game
  function showLoadingAndStartGame(callback?: () => void) {
    showLoadingWithMessage('Starting...', 'start', () => {
      setIsGameActive(true);
      if (callback) callback();
    });
  }

  // Handles category selection and starts game
  function handleSelectCategory(category: string) {
    setSelectedCategory(category);
    startGameWithCategory();
  }

  // Starts game with selected category
  function startGameWithCategory() {
    closeModal();
    showLoadingAndStartGame();
  }

  // Handles game restart with loading animation
  function handleRestart() {
    playSound('button');
    setLoading({ isLoading: true, message: 'Restarting...', type: 'restart' });
    setTimeout(() => {
      setIsGameActive(false);
      setTimeout(() => {
        setIsGameActive(true);
        setTimeout(() => {
          setLoading({ isLoading: false, message: '', type: '' });
        }, 100);
      }, 50);
    }, GAME_CONFIG.LOADING_DELAY);
  }

  // Handles exiting the game with loading animation
  function handleExit() {
    playSound('button');
    showLoadingWithMessage('Exiting...', 'exit', () => {
      setIsGameActive(false);
    });
  }

  // Resets app state to initial values
  const handleAppReset = createSoundAction(() => {
    setIsGameActive(false);
    setLoading({ isLoading: false, message: '', type: '' });
  });

  // Opens category selection modal to start game
  const startGame = createSoundAction(() => {
    openModal('categorySelection');
  });

  // Handles account icon click based on authentication status
  function handleAccountClick() {
    playSound('button');
    if (isAuthenticated) {
      openModal('profile');
    } else {
      openModal('auth');
    }
  }

  // Handles user logout and resets game state
  function handleLogout() {
    playSound('button');
    logout();
    setIsGameActive(false);
    closeModal();
    if (setShowLeaderboardModal) setShowLeaderboardModal(false);
  }

  // Opens game instructions modal
  const openInstructions = createSoundAction(() => {
    openModal('instructions');
  });

  // Closes game instructions modal
  const closeInstructions = createSoundAction(() => {
    closeModal();
  });

  // Opens latest updates modal
  const openLatestUpdates = createSoundAction(() => {
    openModal('latestUpdates');
  });

  // Closes latest updates modal
  const closeLatestUpdates = createSoundAction(() => {
    closeModal();
  });

  // Closes category selection modal
  const closeCategorySelection = createSoundAction(() => {
    closeModal();
  });

  // Closes authentication modal
  const closeAuthModal = createSoundAction(() => {
    closeModal();
  });

  // Opens leaderboard modal
  const openLeaderboardModal = createSoundAction(() => {
    if (setShowLeaderboardModal) setShowLeaderboardModal(true);
  });

  // Closes leaderboard modal
  const closeLeaderboardModal = createSoundAction(() => {
    if (setShowLeaderboardModal) setShowLeaderboardModal(false);
  });

  return {
    startGame,
    handleSelectCategory,
    handleRestart,
    handleExit,
    handleAppReset,
    handleAccountClick,
    handleLogout,
    closeAuthModal,
    openInstructions,
    closeInstructions,
    openLatestUpdates,
    closeLatestUpdates,
    closeCategorySelection,
    openLeaderboardModal,
    closeLeaderboardModal,
  };
}
