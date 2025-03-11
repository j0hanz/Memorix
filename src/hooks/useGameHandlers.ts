import { GAME_CONFIG } from '@/constants/constants';
import { GameHandlerOptions } from '@/types/hooks';

// Game control handlers
export const useGameHandlers = ({
  setIsLoading,
  setIsGameActive,
  setShowInstructions,
  setShowLatestUpdates,
}: GameHandlerOptions) => {
  // Start a new game with loading screen
  const startGame = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsGameActive(true);
    }, GAME_CONFIG.LOADING_DELAY);
  };

  // Restart game with loading screen
  const handleRestart = () => {
    setIsGameActive(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsGameActive(true);
    }, GAME_CONFIG.LOADING_DELAY);
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
