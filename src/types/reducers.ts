import type { Profile, User } from '@/types/data';
import type { AppState } from '@/types/hooks';

import type { PairedCard } from './data';

export type AppAction =
  | { type: 'SET_LOADING'; value: Partial<AppState['loading']> }
  | { type: 'SET_GAME_ACTIVE'; value: boolean }
  | { type: 'SET_SELECTED_CATEGORY'; value: string };

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  token: string;
  refreshToken: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export type AuthAction =
  | { type: 'SET_LOADING'; payload: { loading: boolean } }
  | { type: 'SET_ERROR'; payload: { error: string | null } }
  | { type: 'SET_USER'; payload: { user: User | null } }
  | { type: 'SET_PROFILE'; payload: { profile: Profile | null } }
  | { type: 'SET_TOKENS'; payload: { token: string; refreshToken?: string } }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

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
