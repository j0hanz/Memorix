import { createContext, Dispatch } from 'react';
import { GameState } from '@/types/context';
import { GameAction } from '@/reducers/gameReducer';

export interface GameContextType extends GameState {
  dispatch: Dispatch<GameAction>;
  handleCardSelection: (index: number) => void;
  exitToMainMenu: () => void;
  resetGameState: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);
