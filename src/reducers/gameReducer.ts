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

// Reducer function for the game state
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      // Initialize game state with cards
      return {
        ...initialGameState,
        cards: action.payload.cards,
      };

    case 'REVEAL_ALL_CARDS':
      // Reveal all cards at the start of the game
      return {
        ...state,
        isProcessingMatch: true,
        cards: state.cards.map((card) => ({
          ...card,
          status: CARD_STATUS.ACTIVE,
        })),
      };

    case 'HIDE_ALL_CARDS':
      // Hide all cards after a delay
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
      // Select a card for comparison
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
      // Process the selected pair of cards
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
      // Set the processing match state
      return {
        ...state,
        isProcessingMatch: action.payload.isProcessing,
      };

    case 'SET_FEEDBACK':
      // Set feedback message
      return {
        ...state,
        feedback: action.payload.feedback,
      };

    case 'CLEAR_FEEDBACK':
      // Clear feedback message
      return {
        ...state,
        feedback: '',
      };

    case 'INCREMENT_MOVES':
      // Increment move count
      return {
        ...state,
        moves: state.moves + 1,
      };

    case 'SET_GAME_OVER':
      // Set game over state
      return {
        ...state,
        isGameOver: true,
        timerActive: false,
        completedTime: action.payload.completedTime,
      };

    case 'START_TIMER':
      // Start the game timer
      return {
        ...state,
        timerActive: true,
        startTime: Date.now(),
      };

    case 'STOP_TIMER':
      // Stop the game timer
      return {
        ...state,
        timerActive: false,
      };

    case 'TOGGLE_MODAL':
      // Toggle the game over modal
      return {
        ...state,
        showModal: action.payload.show,
      };

    case 'RESET_GAME':
      // Reset the game state
      return {
        ...initialGameState,
        cards: action.payload.cards,
      };

    default:
      return state;
  }
}
