import { GAME_CONFIG } from '@/constants/constants';
import { GameHandlerOptions } from '@/types/hooks';

// Game control handlers
export const useNavigation = ({
  setIsLoading,
  setIsGameActive,
  setShowInstructions,
  setShowLatestUpdates,
}: GameHandlerOptions) => {
  // Common loading logic
  const showLoadingAndStartGame = (callback?: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsGameActive(true);
      callback?.();
    }, GAME_CONFIG.LOADING_DELAY);
  };

  // Start a new game with loading screen
  const startGame = () => showLoadingAndStartGame();

  // Restart game with loading screen
  const handleRestart = () => {
    setIsGameActive(false);
    showLoadingAndStartGame();
  };

  // Exit to main menu
  const handleExit = () => {
    setIsGameActive(false);
  };

  // Modal control functions
  const openInstructions = () => {
    setShowInstructions(true);
  };

  // Close instructions modal
  const closeInstructions = () => {
    setShowInstructions(false);
  };

  // Open latest updates modal
  const openLatestUpdates = () => {
    setShowLatestUpdates(true);
  };

  // Close latest updates modal
  const closeLatestUpdates = () => {
    setShowLatestUpdates(false);
  };

  return {
    startGame,
    handleRestart,
    handleExit,
    openInstructions,
    closeInstructions,
    openLatestUpdates,
    closeLatestUpdates,
  };
};
