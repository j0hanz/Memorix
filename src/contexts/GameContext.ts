import type { Dispatch } from 'react';
import { createContext } from 'react';
import type { GameState } from '@/types/context';
import type { GameAction } from '@/reducers/gameReducer';

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
