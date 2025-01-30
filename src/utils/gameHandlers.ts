import { useCallback } from "react";

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
  const startGame = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsGameActive(true);
    }, 3000);
  }, [setIsLoading, setIsGameActive]);

  // Restart game
  const handleRestart = useCallback(() => {
    setIsGameActive(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsGameActive(true);
    }, 3000);
  }, [setIsLoading, setIsGameActive]);

  // Exit game
  const handleExit = useCallback(() => {
    setIsGameActive(false);
  }, [setIsGameActive]);

  // Open Instructions modal
  const openInstructions = useCallback(() => {
    setShowInstructions(true);
  }, [setShowInstructions]);

  // Close Instructions modal
  const closeInstructions = useCallback(() => {
    setShowInstructions(false);
  }, [setShowInstructions]);

  // Open Latest Updates modal
  const openLatestUpdates = useCallback(() => {
    setShowLatestUpdates(true);
  }, [setShowLatestUpdates]);

  // Close Latest Updates modal
  const closeLatestUpdates = useCallback(() => {
    setShowLatestUpdates(false);
  }, [setShowLatestUpdates]);

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
