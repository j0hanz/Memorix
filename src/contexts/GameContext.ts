import { createContext, Dispatch } from 'react';
import { GameState } from '@/types/context';
import { GameAction } from '@/reducers/gameReducer';

export interface GameContextType extends GameState {
  // Dispatch function for game actions and event handlers
  dispatch: Dispatch<GameAction>;
  handleCardSelection: (index: number) => void;
  exitToMainMenu: () => void;
  resetGameState: () => void;
  selectedCategory: string;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);
