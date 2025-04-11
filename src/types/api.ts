import type { User, Profile } from './auth';

export interface Commit {
  sha: string;
  message: string;
  date: string;
  url: string;
  author: string;
}

export interface GitHubCommitResponse {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
  author: {
    login: string;
  } | null;
}

export interface ApiError {
  response?: {
    data?: {
      detail?: string;
      [key: string]: string | string[] | undefined;
    };
    status?: number;
    statusText?: string;
  };
  message?: string;
  [key: string]: unknown;
}

export interface ProfileImageTabProps {
  user: User;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  profileImage: File | null;
  previewImage: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateProfile: (e: React.FormEvent) => Promise<void>;
  onClose: () => void;
}

export interface GameResultData {
  category: string;
  moves: number;
  time_seconds: number;
  stars: number;
}

export interface UserScore {
  id: number;
  username: string;
  category_name: string;
  moves: number;
  time_seconds: number;
  stars: number;
  completed_at: string;
}

export interface ProfileSettingsTabProps {
  user: User;
  onClose: () => void;
  scores?: UserScore[];
  loadingScores?: boolean;
}
