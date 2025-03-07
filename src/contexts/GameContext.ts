import { createContext } from 'react';
import { CardDef } from '@/data/cardData';

// Define the shape of the game context
export interface GameContextType {
  cards: CardDef[];
  setCards: React.Dispatch<React.SetStateAction<CardDef[]>>;
  selectedCardIndex: number | null;
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>;
  matchedPairs: number;
  setMatchedPairs: React.Dispatch<React.SetStateAction<number>>;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  moves: number;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  timerActive: boolean;
  setTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
  feedback: string;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
  previousIndex: React.RefObject<number | null>;
  resetGameState: () => void;
  handleCardSelection: (index: number) => void;
  completedTime: number;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  exitToMainMenu: () => void;
  isInitialReveal: boolean;
}

// Create the game context
export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);
