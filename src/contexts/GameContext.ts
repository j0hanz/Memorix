import { createContext } from 'react';
import {
  GameState,
  GameActions,
  GameOperations,
  GameContextType,
} from '@/types/context';

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

export type { GameState, GameActions, GameOperations, GameContextType };
