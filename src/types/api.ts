import { User, Profile } from './auth';

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
    data?: Record<string, string | string[]>;
    status?: number;
  };
  request?: unknown;
  message?: string;
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

export interface ProfileSettingsTabProps {
  user: User;
  onClose: () => void;
}
