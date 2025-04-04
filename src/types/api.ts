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
