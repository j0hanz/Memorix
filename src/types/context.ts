import type { Dispatch } from 'react';

import type { GameAction } from '@/reducers/gameReducer';
import type { Profile, User } from '@/types/data';
import type { ModalData } from '@/types/data';
import type { GameState } from '@/types/reducers';
import type { ProfileFormValues,UserScore } from '@/types/services';

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

export interface ModalContextType {
  activeModal: ModalType;
  modalData: ModalData;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

// Game context
export interface GameContextType extends GameState {
  dispatch: Dispatch<GameAction>;
  handleCardSelection: (index: number) => void;
  resetGameState: () => void;
  exitToMainMenu: () => void;
  selectedCategory: string;
}
