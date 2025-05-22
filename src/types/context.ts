import type { ReactNode } from 'react';
import type { Dispatch } from 'react';

import type { GameAction } from '@/reducers/gameReducer';
import type { Profile, User } from '@/types/data';
import type { ProfileFormValues } from '@/types/services';
import type { UserScore } from '@/types/services';

import type { PairedCard } from './data';
import type { LoginCredentials, RegisterData } from './services';

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  token: string;
  refreshToken: string;
  authError?: string;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  getProfile: () => Promise<Profile | null>;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setAuthTokens: (accessToken: string, refreshToken?: string) => void;
  fetchProfile: () => Promise<Profile | null>;
}

export interface ProfileContextType {
  user: { username: string } | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  profileImage: File | null;
  previewImage: string | null;
  scores: UserScore[];
  scoresCount: number;
  scoresPage: number;
  loadingScores: boolean;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateProfile: () => Promise<void>;
  setScoresPage: (page: number) => void;
  changePassword: (values: ProfileFormValues) => Promise<boolean>;
  handleDeleteAccount: () => Promise<void>;
  logout: () => void;
  clearState: () => void;
}

export type ModalType =
  | 'auth'
  | 'leaderboard'
  | 'instructions'
  | 'updates'
  | 'category'
  | 'profile'
  | 'scoreboard'
  | 'latestUpdates'
  | 'categorySelection'
  | null;

export interface ModalData {
  categoryCode?: string;
  moves?: number;
  completedTime?: number;
  onReset?: () => void;
  onExit?: () => void;
  onSelectCategory?: (category: string) => void;
  logout?: () => void;
  children?: ReactNode;
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
  resetGameState: () => void;
  exitToMainMenu: () => void;
  selectedCategory: string;
}
