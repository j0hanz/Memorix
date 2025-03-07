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
  // Start a new game
  const startGame = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsGameActive(true);
    }, 3000);
  };

  // Restart game
  const handleRestart = () => {
    setIsGameActive(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsGameActive(true);
    }, 3000);
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
