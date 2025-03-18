import React from 'react';
import { GameContext } from '@/contexts/GameContext';
import { GameProviderProps } from '@/types/context';
import { useGameReducer } from '@/hooks/useGameReducer';
import { CATEGORIES } from '@/constants/constants';

export const GameProvider = ({
  children,
  onExit,
  selectedCategory = CATEGORIES.ANIMALS,
}: GameProviderProps): React.ReactElement => {
  const {
    state,
    dispatch,
    handleCardSelection,
    resetGameState,
    exitToMainMenu,
  } = useGameReducer(onExit, selectedCategory);

  return (
    <GameContext.Provider
      value={{
        ...state,
        dispatch,
        handleCardSelection,
        resetGameState,
        exitToMainMenu,
        selectedCategory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
