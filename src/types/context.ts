import { ReactNode } from 'react';
import { PairedCard } from './card';
import { Dispatch } from 'react';
import { GameAction } from '@/reducers/gameReducer';

export interface GameProviderProps {
  children: ReactNode;
  onExit: () => void;
  selectedCategory?: string;
}

// Game state
export interface GameState {
  cards: PairedCard[];
  selectedCardIndex: number | null;
  matchedPairs: number;
  moves: number;
  isGameOver: boolean;
  timerActive: boolean;
  feedback: string;
  isInitialReveal: boolean;
  isProcessingMatch: boolean;
  completedTime: number;
  startTime: number | null;
  showModal: boolean;
}

// Game context
export interface GameContextType extends GameState {
  dispatch: Dispatch<GameAction>;
  handleCardSelection: (index: number) => void;
  exitToMainMenu: () => void;
  resetGameState: () => void;
  selectedCategory?: string;
}
