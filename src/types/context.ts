import type { ReactNode } from 'react';
import type { PairedCard } from './card';
import type { Dispatch } from 'react';
import type { GameAction } from '@/reducers/gameReducer';

export type ModalType =
  | 'auth'
  | 'leaderboard'
  | 'instructions'
  | 'updates'
  | 'category'
  | 'profile'
  | 'scoreboard'
  | null;

export interface ModalData {
  categoryCode?: string;
  moves?: number;
  completedTime?: number;
  onReset?: () => void;
  onExit?: () => void;
  onSelectCategory?: (category: string) => void;
  logout?: () => void;
}

export interface ModalContextType {
  activeModal: ModalType;
  modalData: ModalData;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

// Game provider props
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
