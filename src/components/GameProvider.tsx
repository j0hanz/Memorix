import React from 'react';
import { GameContext } from '@/contexts/GameContext';
import { GameProviderProps } from '@/types/context';
import { useGameReducer } from '@/hooks/useGameReducer';

export const GameProvider = ({
  children,
  onExit,
}: GameProviderProps): React.ReactElement => {
  const {
    state,
    dispatch,
    handleCardSelection,
    resetGameState,
    exitToMainMenu,
  } = useGameReducer(onExit);

  return (
    <GameContext.Provider
      value={{
        ...state,
        dispatch,
        handleCardSelection,
        resetGameState,
        exitToMainMenu,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
