import type { User } from './data';
import type { PaginatedData } from './utils';

export interface BaseApiResponse {
  success?: boolean;
  message?: string;
}

export interface ApiError {
  response?: {
    data?: {
      detail?: string;
      non_field_errors?: string[];
      [key: string]: string | string[] | undefined;
    };
    status?: number;
    statusText?: string;
  };
  message?: string;
  [key: string]: unknown;
}

export interface ApiRequestOptions {
  context?: string;
  errorMessage?: string;
}

export interface FileUploadOptions extends ApiRequestOptions {
  method?: 'POST' | 'PATCH';
  fieldName?: string;
  additionalData?: Record<string, string | Blob>;
}

export interface ApiPaginationParams {
  page?: number;
  pageSize?: number;
  [key: string]: unknown;
}

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

export type ErrorCategory =
  | 'api'
  | 'validation'
  | 'authentication'
  | 'authorization'
  | 'network'
  | 'ui'
  | 'unknown';

export interface AppError {
  message: string;
  code?: string;
  severity: ErrorSeverity;
  timestamp: Date;
  details?: unknown;
  handled?: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password1: string;
  password2: string;
}

export interface AuthResponse {
  access?: string;
  refresh?: string;
  user: User;
  access_token?: string;
  refresh_token?: string;
  token?: string;
}

export interface ProfileFormValues extends Record<string, string> {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}

export interface GameResultData {
  category: string;
  moves: number;
  time_seconds: number;
  stars: number;
}

export interface BaseScore {
  moves: number;
  time_seconds: number;
  stars: number;
  completed_at: string;
}

export interface UserScore extends BaseScore {
  id: number;
  username: string;
  category_name: string;
}

export interface LeaderboardEntry extends UserScore {
  profile_picture_url?: string;
  rank: number;
  category_code: string;
  category: number;
  profile_id: number;
}

export type PaginatedUserScores = PaginatedData<UserScore>;
export type PaginatedLeaderboardEntries = PaginatedData<LeaderboardEntry>;

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

export interface CommitStatusProps {
  onClose?: () => void;
}
