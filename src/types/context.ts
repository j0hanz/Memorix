import type { Dispatch } from 'react';

import type { SoundKey } from '@/constants/sounds';
import type { GameAction } from '@/reducers/gameReducer';
import type { Profile, User } from '@/types/data';
import type { ModalData } from '@/types/data';
import type { CardData } from '@/types/data';
import type { CSSModuleClasses } from '@/types/hooks';
import type { GameState } from '@/types/reducers';
import type {
  LoginCredentials,
  ProfileFormValues,
  RegisterData,
  UserScore,
} from '@/types/services';
import type { AsyncState, VoidCallback } from '@/types/utils';

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  token: string;
  refreshToken: string;
  authError?: string;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: VoidCallback;
  getProfile: () => Promise<Profile | null>;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setAuthTokens: (accessToken: string, refreshToken?: string) => void;
  fetchProfile: () => Promise<Profile | null>;
}

export interface ProfileContextType extends AsyncState<Profile> {
  user: { username: string } | null;
  profileImage: File | null;
  previewImage: string | null;
  scores: UserScore[];
  scoresCount: number;
  scoresPage: number;
  loadingScores: boolean;
  success: string | null;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateProfile: () => Promise<void>;
  setScoresPage: (page: number) => void;
  changePassword: (values: ProfileFormValues) => Promise<boolean>;
  handleDeleteAccount: () => Promise<void>;
  logout: VoidCallback;
  clearState: VoidCallback;
}

export interface SoundContextType {
  isMuted: boolean;
  playSound: (soundKey: SoundKey) => void;
  toggleMute: VoidCallback;
  setMuteState: (muted: boolean) => void;
}

export interface ToastContextType {
  showToast: (message: string, duration?: number) => void;
  hideToast: VoidCallback;
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
  closeModal: VoidCallback;
}

export interface GameContextType extends GameState {
  dispatch: Dispatch<GameAction>;
  handleCardSelection: (index: number) => void;
  selectCard: (index: number) => void;
  resetGameState: VoidCallback;
  resetGame: VoidCallback;
  exitToMainMenu: VoidCallback;
  exitGame: VoidCallback;
  isCardSelectable: (index: number) => boolean;
  selectedCategory: string;
  getCardAnimation: (card?: CardData) => string;
  getCardFrontAnimation: (card?: CardData) => string;
  getCardStyleClasses: (
    styles: CSSModuleClasses,
    card?: CardData,
    imageLoaded?: boolean,
    imageError?: boolean,
  ) => string;
  getStatsTopClass: (styles: CSSModuleClasses, feedback?: string) => string;
  isCardClickable: (
    card?: CardData,
    index?: number,
    imageLoaded?: boolean,
    imageError?: boolean,
  ) => boolean;
  handleCardClick: (
    index: number,
    clickHandler?: (index: number) => void,
    card?: CardData,
    imageLoaded?: boolean,
    imageError?: boolean,
  ) => void;
}
