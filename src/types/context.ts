import type { Dispatch } from 'react';

import type { SoundKey } from '@/constants/sounds';
import type { CardData, ModalData, Profile, User } from '@/types/data';
import type { GameAction, GameState } from '@/types/reducers';
import type {
  AppError,
  LoginCredentials,
  ProfileFormValues,
  RegisterData,
  UserScore,
} from '@/types/services';
import type { AsyncState, VoidCallback } from '@/types/utils';

// ============================================================================
// AUTHENTICATION CONTEXT
// ============================================================================

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

// ============================================================================
// ERROR CONTEXT
// ============================================================================

export interface ErrorContextType {
  error: AppError | null;
  setError: (error: unknown, context?: string) => void;
  clearError: () => void;
}

// ============================================================================
// PROFILE CONTEXT
// ============================================================================

export interface ProfileContextType extends AsyncState<Profile> {
  user: User | null;
  profileImage: File | null;
  previewImage: string | null;
  scores: UserScore[];
  scoresCount: number;
  scoresPage: number;
  loadingScores: boolean;
  success: string | null;
  passwordFormComplete: boolean;
  editingImage: boolean;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  setPasswordFormComplete: (complete: boolean) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateProfile: () => Promise<void>;
  setScoresPage: (page: number) => void;
  changePassword: (values: ProfileFormValues) => Promise<boolean>;
  handleDeleteAccount: () => Promise<void>;
  logout: VoidCallback;
  clearState: VoidCallback;
  activeTab: string;
  showPasswordTab: boolean;
  showDeleteTab: boolean;
  showClearScoresTab: boolean;
  handleTabChange: (key: string) => void;
  handlePasswordClick: () => void;
  handleDeleteClick: () => void;
  handleClearScoresClick: () => void;
  handleBackToOverview: () => void;
  setEditingImage: (editing: boolean) => void;
  handleSaveProfileImage: () => Promise<void>;
  handleCancelImageEdit: () => void;
}

// ============================================================================
// MEDIA CONTEXT
// ============================================================================

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

// ============================================================================
// MODAL CONTEXT
// ============================================================================

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

// ============================================================================
// NAVIGATION CONTEXT
// ============================================================================

export interface NavigationContextType {
  startGame: () => void;
  handleSelectCategory: (category: string) => void;
  handleRestart: () => void;
  handleExit: () => void;
  handleAppReset: () => void;
  handleAccountClick: () => void;
  handleLogout: () => void;
  openInstructions: () => void;
  closeInstructions: () => void;
  openLatestUpdates: () => void;
  closeLatestUpdates: () => void;
  openLeaderboardModal: () => void;
  closeLeaderboardModal: () => void;
  handleGitHubClick: () => void;
  openModalByType?: (type: ModalType) => void;
  selectedCategory: string;
  isGameActive: boolean;
  loading: {
    isLoading: boolean;
    message?: string;
    type?: string;
  };
}

// ============================================================================
// GAME CONTEXT
// ============================================================================

export interface GameContextType extends GameState {
  dispatch: Dispatch<GameAction>;
  selectCard: (index: number) => void;
  resetGame: VoidCallback;
  exitGame: VoidCallback;
  isCardSelectable: (index: number) => boolean;
  selectedCategory: string;
  handleCardClick: (
    index: number,
    clickHandler?: (index: number) => void,
    card?: CardData,
    imageLoaded?: boolean,
    imageError?: boolean,
  ) => void;
}
