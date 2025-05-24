import type { PairedCard } from './data';

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

export type GameAction =
  | { type: 'INITIALIZE_GAME'; payload: { cards: PairedCard[] } }
  | { type: 'REVEAL_ALL_CARDS' }
  | { type: 'HIDE_ALL_CARDS' }
  | { type: 'SELECT_CARD'; payload: { index: number } }
  | { type: 'PROCESS_MATCH'; payload: { index: number; isMatch: boolean } }
  | { type: 'SET_FEEDBACK'; payload: { feedback: string } }
  | { type: 'CLEAR_FEEDBACK' }
  | { type: 'INCREMENT_MOVES' }
  | { type: 'SET_GAME_OVER'; payload: { completedTime: number } }
  | { type: 'START_TIMER' }
  | { type: 'STOP_TIMER' }
  | { type: 'TOGGLE_MODAL'; payload: { show: boolean } }
  | { type: 'RESET_GAME'; payload: { cards: PairedCard[] } }
  | { type: 'SET_PROCESSING_MATCH'; payload: { isProcessing: boolean } };
