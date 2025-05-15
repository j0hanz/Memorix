import { createContext } from 'react';

import type { UserScore } from '@/types/api';
import type { Profile } from '@/types/auth';

export interface ProfileFormValues extends Record<string, string> {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}

export interface ProfileContextType {
  // Profile data
  user: { username: string } | null;
  profile: Profile | null;

  // UI state
  loading: boolean;
  error: string | null;
  success: string | null;

  // Image handling
  profileImage: File | null;
  previewImage: string | null;

  // Game history
  scores: UserScore[];
  scoresCount: number;
  scoresPage: number;
  loadingScores: boolean;

  // Functions
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

export const ProfileContext = createContext<ProfileContextType>({
  user: null,
  profile: null,
  loading: false,
  error: null,
  success: null,
  profileImage: null,
  previewImage: null,
  scores: [],
  scoresCount: 0,
  scoresPage: 1,
  loadingScores: false,
  setError: () => {},
  setSuccess: () => {},
  handleImageChange: () => {},
  handleUpdateProfile: async () => {},
  setScoresPage: () => {},
  changePassword: () => Promise.resolve(false),
  handleDeleteAccount: async () => {},
  logout: () => {},
  clearState: () => {},
});
