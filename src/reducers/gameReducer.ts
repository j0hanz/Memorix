import { CARD_STATUS } from '@/constants/constants';
import { PairedCard } from '@/types/card';
import { GameState } from '@/types/context';

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

export const initialGameState: GameState = {
  cards: [],
  selectedCardIndex: null,
  matchedPairs: 0,
  moves: 0,
  isGameOver: false,
  timerActive: false,
  feedback: '',
  isInitialReveal: true,
  isProcessingMatch: false,
  completedTime: 0,
  startTime: null,
  showModal: false,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        ...initialGameState,
        cards: action.payload.cards,
      };

    case 'REVEAL_ALL_CARDS':
      return {
        ...state,
        isProcessingMatch: true,
        cards: state.cards.map((card) => ({
          ...card,
          status: CARD_STATUS.ACTIVE,
        })),
      };

    case 'HIDE_ALL_CARDS':
      return {
        ...state,
        isProcessingMatch: false,
        isInitialReveal: false,
        cards: state.cards.map((card) => ({
          ...card,
          status: card.status.includes('matched')
            ? card.status
            : CARD_STATUS.DEFAULT,
        })),
      };

    case 'SELECT_CARD': {
      const { index } = action.payload;
      const updatedCards = [...state.cards];
      updatedCards[index] = {
        ...updatedCards[index],
        status: CARD_STATUS.ACTIVE,
      };

      return {
        ...state,
        cards: updatedCards,
        selectedCardIndex:
          state.selectedCardIndex === null ? index : state.selectedCardIndex,
      };
    }

    case 'PROCESS_MATCH': {
      const { index, isMatch } = action.payload;
      const prevIndex = state.selectedCardIndex as number;
      const newStatus = isMatch ? CARD_STATUS.MATCHED : CARD_STATUS.DEFAULT;
      const updatedCards = [...state.cards];

      updatedCards[index] = { ...updatedCards[index], status: newStatus };
      updatedCards[prevIndex] = {
        ...updatedCards[prevIndex],
        status: newStatus,
      };

      return {
        ...state,
        cards: updatedCards,
        selectedCardIndex: null,
        matchedPairs: isMatch ? state.matchedPairs + 1 : state.matchedPairs,
        isProcessingMatch: false,
      };
    }

    case 'SET_PROCESSING_MATCH':
      return {
        ...state,
        isProcessingMatch: action.payload.isProcessing,
      };

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

    case 'TOGGLE_MODAL':
      return {
        ...state,
        showModal: action.payload.show,
      };

    case 'RESET_GAME':
      return {
        ...initialGameState,
        cards: action.payload.cards,
      };

    default:
      return state;
  }
}
