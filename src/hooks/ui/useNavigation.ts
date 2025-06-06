import { GAME_CONFIG } from '@/constants/game';
import { useAuth, useModal } from '@/hooks/shared/useProvider';
import { useAppState } from '@/hooks/ui/useAppState';

// Navigation handler
export function useNavigationHandler() {
  const {
    setIsGameActive,
    setSelectedCategory,
    setLoading,
    isGameActive,
    loading,
    selectedCategory,
  } = useAppState();

  // Get dependencies directly in the hook
  const { logout, isAuthenticated } = useAuth();
  const { openModal, closeModal } = useModal();

  const showLoadingWithMessage = (
    message: string,
    type: 'initial' | 'start' | 'restart' | 'exit',
    callback?: () => void,
  ) => {
    setLoading({ isLoading: true, message, type });
    setTimeout(() => {
      setLoading({ isLoading: false, message: undefined, type: undefined });
      if (callback) callback();
    }, GAME_CONFIG.LOADING_DELAY);
  };

  const handleAppReset = () => {
    setIsGameActive(false);
    setLoading({ isLoading: false, message: undefined, type: undefined });
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/j0hanz/Memorix', '_blank');
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    closeModal();
    showLoadingWithMessage('Starting...', 'start', () => {
      setIsGameActive(true);
    });
  };

  const handleRestart = () => {
    showLoadingWithMessage('Restarting...', 'restart', () => {
      setIsGameActive(false);
      setTimeout(() => {
        setIsGameActive(true);
      }, 50);
    });
  };

  const handleExit = () => {
    setIsGameActive(false);
  };

  const startGame = () => {
    openModal('categorySelection');
  };

  const handleAccountClick = () => {
    if (isAuthenticated) {
      openModal('profile');
    } else {
      openModal('auth');
    }
  };

  const handleLogout = () => {
    logout();
    closeModal();
    setIsGameActive(false);
  };

  const openInstructions = () => {
    openModal('instructions');
  };

  const closeInstructions = () => {
    closeModal();
  };

  const openLatestUpdates = () => {
    openModal('latestUpdates');
  };

  const closeLatestUpdates = () => {
    closeModal();
  };

  const openLeaderboardModal = () => {
    openModal('leaderboard');
  };

  const closeLeaderboardModal = () => {
    closeModal();
  };

  return {
    selectedCategory,
    isGameActive,
    loading,
    handleAppReset,
    handleGitHubClick,
    handleSelectCategory,
    handleRestart,
    handleExit,
    startGame,
    handleAccountClick,
    handleLogout,
    openInstructions,
    closeInstructions,
    openLatestUpdates,
    closeLatestUpdates,
    openLeaderboardModal,
    closeLeaderboardModal,
  };
}
