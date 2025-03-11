import { ReactNode } from 'react';
import { PairedCard } from './card';

export interface GameProviderProps {
  children: ReactNode;
  onExit: () => void;
}

// Game state and actions
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

export interface GameActions {
  setCards: React.Dispatch<React.SetStateAction<PairedCard[]>>;
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setMatchedPairs: React.Dispatch<React.SetStateAction<number>>;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  previousIndex: React.RefObject<number | null>;
}

export interface GameOperations {
  resetGameState: () => void;
  handleCardSelection: (index: number) => void;
  exitToMainMenu: () => void;
}

export type GameContextType = GameState & GameActions & GameOperations;
