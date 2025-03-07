import { GAME_CONFIG } from '@/utils/constants';

interface UseGameHandlersProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameActive: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInstructions: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLatestUpdates: React.Dispatch<React.SetStateAction<boolean>>;
}

// Hook providing app-level game flow control
export const useGameHandlers = ({
  setIsLoading,
  setIsGameActive,
  setShowInstructions,
  setShowLatestUpdates,
}: UseGameHandlersProps) => {
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

  const closeInstructions = () => {
    setShowInstructions(false);
  };

  const openLatestUpdates = () => {
    setShowLatestUpdates(true);
  };

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
