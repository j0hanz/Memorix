import { useEffect } from 'react';
import { useSoundEffects } from '@/hooks/useSound';
import { useGameContext } from '@/hooks/useGameContext';
import { SOUNDS } from '@/constants/constants';

export function useGameUI(onRestart: () => void) {
  // Get game state and handlers from context
  const {
    cards,
    handleCardSelection,
    matchedPairs,
    moves,
    isGameOver,
    showModal,
    setShowModal,
    timerActive,
    feedback,
    completedTime,
    exitToMainMenu,
  } = useGameContext();

  const { playSound } = useSoundEffects();

  // Reset the game state
  const handleReset = () => {
    onRestart();
  };

  // Play sound when game is over
  useEffect(() => {
    if (isGameOver) {
      playSound(SOUNDS.COMPLETE);
    }
  }, [isGameOver, playSound]);

  return {
    cards,
    handleCardSelection,
    matchedPairs,
    moves,
    isGameOver,
    showModal,
    setShowModal,
    timerActive,
    feedback,
    completedTime,
    exitToMainMenu,
    handleReset,
  };
}
