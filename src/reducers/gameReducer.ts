import { CARD_STATUS } from '@/constants/game';
import type { GameAction, GameState } from '@/types/reducers';
import {
  setAllCardsStatus,
  setCardStatus,
  setMultipleCardStatus,
} from '@/utils/game/cardUtils';

// Initial game state definition
export const initialGameState: GameState = {
  // Card state
  cards: [],
  selectedCardIndex: null,
  matchedPairs: 0,

  // Game progress
  moves: 0,
  isGameOver: false,
  completedTime: 0,

  // Timer state
  timerActive: false,
  startTime: null,

  // UI state
  feedback: '',
  showModal: false,

  // Game state
  isInitialReveal: true,
  isProcessingMatch: false,
};

// Main game reducer function
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    // Card management actions
    case 'INITIALIZE_GAME':
      return {
        ...initialGameState,
        cards: action.payload.cards,
      };

    case 'REVEAL_ALL_CARDS':
      return {
        ...state,
        isProcessingMatch: true,
        cards: setAllCardsStatus(state.cards, CARD_STATUS.ACTIVE),
      };

    case 'HIDE_ALL_CARDS':
      return {
        ...state,
        isProcessingMatch: false,
        isInitialReveal: false,
        cards: state.cards.map((card) => ({
          ...card,
          status: card.status.includes(CARD_STATUS.MATCHED)
            ? card.status
            : CARD_STATUS.DEFAULT,
        })),
      };

    case 'SELECT_CARD':
      return {
        ...state,
        cards: setCardStatus(
          state.cards,
          action.payload.index,
          CARD_STATUS.ACTIVE,
        ),
        selectedCardIndex:
          state.selectedCardIndex === null
            ? action.payload.index
            : state.selectedCardIndex,
      };

    case 'PROCESS_MATCH': {
      const prevIndex = state.selectedCardIndex as number;
      const newStatus = action.payload.isMatch
        ? CARD_STATUS.MATCHED
        : CARD_STATUS.DEFAULT;

      return {
        ...state,
        cards: setMultipleCardStatus(
          state.cards,
          [action.payload.index, prevIndex],
          newStatus,
        ),
        selectedCardIndex: null,
        matchedPairs: action.payload.isMatch
          ? state.matchedPairs + 1
          : state.matchedPairs,
        isProcessingMatch: false,
      };
    }

    case 'SET_PROCESSING_MATCH':
      return {
        ...state,
        isProcessingMatch: action.payload.isProcessing,
      };

    // Game progress actions
    case 'INCREMENT_MOVES':
      return {
        ...state,
        moves: state.moves + 1,
      };

    case 'SET_GAME_OVER':
      return {
        ...state,
        isGameOver: true,
        timerActive: false,
        completedTime: action.payload.completedTime,
      };

    case 'RESET_GAME':
      return {
        ...initialGameState,
        cards: action.payload.cards,
      };

    // Timer actions
    case 'START_TIMER':
      return {
        ...state,
        timerActive: true,
        startTime: Date.now(),
      };

    case 'STOP_TIMER':
      return {
        ...state,
        timerActive: false,
      };

    // UI state actions
    case 'SET_FEEDBACK':
      return {
        ...state,
        feedback: action.payload.feedback,
      };

    case 'CLEAR_FEEDBACK':
      return {
        ...state,
        feedback: '',
      };

    case 'TOGGLE_MODAL':
      return {
        ...state,
        showModal: action.payload.show,
      };

    default:
      return state;
  }
}
