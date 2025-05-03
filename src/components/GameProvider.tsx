import { CATEGORIES } from '@/constants/constants';
import { GameContext } from '@/contexts/GameContext';
import { useGameReducer } from '@/hooks/useGameReducer';
import type { GameProviderProps } from '@/types/context';

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
