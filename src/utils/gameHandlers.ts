interface UseGameHandlersProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameActive: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInstructions: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLatestUpdates: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useGameHandlers = ({
  setIsLoading,
  setIsGameActive,
  setShowInstructions,
  setShowLatestUpdates,
}: UseGameHandlersProps) => {
  // Start game
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

  // Exit game
  const handleExit = () => {
    setIsGameActive(false);
  };

  // Open Instructions modal
  const openInstructions = () => {
    setShowInstructions(true);
  };

  // Close Instructions modal
  const closeInstructions = () => {
    setShowInstructions(false);
  };

  // Open Latest Updates modal
  const openLatestUpdates = () => {
    setShowLatestUpdates(true);
  };

  // Close Latest Updates modal
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
