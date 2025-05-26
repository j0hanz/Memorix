import type { PairedCard } from '@/types/data';
import type { GameAction } from '@/types/reducers';

// Card management actions
export const cardActions = {
  initializeGame: (cards: PairedCard[]): GameAction => ({
    type: 'INITIALIZE_GAME',
    payload: { cards },
  }),

  revealAllCards: (): GameAction => ({
    type: 'REVEAL_ALL_CARDS',
  }),

  hideAllCards: (): GameAction => ({
    type: 'HIDE_ALL_CARDS',
  }),

  selectCard: (index: number): GameAction => ({
    type: 'SELECT_CARD',
    payload: { index },
  }),

  processMatch: (index: number, isMatch: boolean): GameAction => ({
    type: 'PROCESS_MATCH',
    payload: { index, isMatch },
  }),

  setProcessingMatch: (isProcessing: boolean): GameAction => ({
    type: 'SET_PROCESSING_MATCH',
    payload: { isProcessing },
  }),
} as const;

// Game state actions
export const gameStateActions = {
  incrementMoves: (): GameAction => ({
    type: 'INCREMENT_MOVES',
  }),

  setGameOver: (completedTime: number): GameAction => ({
    type: 'SET_GAME_OVER',
    payload: { completedTime },
  }),

  resetGame: (cards: PairedCard[]): GameAction => ({
    type: 'RESET_GAME',
    payload: { cards },
  }),
} as const;

// Timer actions
export const timerActions = {
  startTimer: (): GameAction => ({
    type: 'START_TIMER',
  }),

  stopTimer: (): GameAction => ({
    type: 'STOP_TIMER',
  }),
} as const;

// UI state actions
export const uiActions = {
  setFeedback: (feedback: string): GameAction => ({
    type: 'SET_FEEDBACK',
    payload: { feedback },
  }),

  clearFeedback: (): GameAction => ({
    type: 'CLEAR_FEEDBACK',
  }),

  toggleModal: (show: boolean): GameAction => ({
    type: 'TOGGLE_MODAL',
    payload: { show },
  }),
} as const;

// Combined action creators
export const gameActions = {
  ...cardActions,
  ...gameStateActions,
  ...timerActions,
  ...uiActions,
} as const;
