import React from 'react';
import { GameContext } from '@/contexts/GameContext';
import { GameProviderProps } from '@/types/context';
import { useGameState } from '@/hooks/useGameState';

export const GameProvider = ({
  children,
  onExit,
}: GameProviderProps): React.ReactElement => {
  const {
    cards,
    selectedCardIndex,
    matchedPairs,
    moves,
    isGameOver,
    timerActive,
    feedback,
    isInitialReveal,
    isProcessingMatch,
    completedTime,
    startTime,
    showModal,
    setCards,
    setSelectedCardIndex,
    setMatchedPairs,
    setMoves,
    setIsGameOver,
    setTimerActive,
    setFeedback,
    setShowModal,
    previousIndex,
    resetGameState,
    handleCardSelection,
    exitToMainMenu,
  } = useGameState(onExit);

  return (
    <GameContext.Provider
      value={{
        cards,
        selectedCardIndex,
        matchedPairs,
        moves,
        isGameOver,
        timerActive,
        feedback,
        isInitialReveal,
        isProcessingMatch,
        completedTime,
        startTime,
        showModal,
        setCards,
        setSelectedCardIndex,
        setMatchedPairs,
        setMoves,
        setIsGameOver,
        setTimerActive,
        setFeedback,
        setShowModal,
        previousIndex,
        resetGameState,
        handleCardSelection,
        exitToMainMenu,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
