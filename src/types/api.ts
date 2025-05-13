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

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface AppError {
  message: string;
  code?: string;
  severity: ErrorSeverity;
  timestamp: Date;
  details?: unknown;
  handled?: boolean;
}

export type ErrorCategory =
  | 'api'
  | 'validation'
  | 'authentication'
  | 'authorization'
  | 'network'
  | 'ui'
  | 'unknown';

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

export interface PaginatedUserScores {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserScore[];
}

export interface LeaderboardEntry extends UserScore {
  profile_picture_url?: string;
}
