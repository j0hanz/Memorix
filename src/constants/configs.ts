export const MODAL_CONFIGS = {
  auth: {
    backdrop: true,
  },
  instructions: {
    backdrop: true,
  },
  latestUpdates: {
    backdrop: true,
  },
  categorySelection: {
    backdrop: 'static',
  },
  profile: {
    backdrop: true,
  },
  scoreboard: {
    backdrop: 'static',
  },
};

export const TOKEN_CONFIGS = {
  TOKEN_KEY: 'token',
  REFRESH_TOKEN_KEY: 'refreshToken',
  TOKEN_EXPIRY_BUFFER_SECONDS: 60,
};

// Loading and delay configurations
export const LOADING_CONFIGS = {
  GAME_LOADING_DELAY: 3000,
};

// Pagination configurations
export const PAGINATION_CONFIGS = {
  GITHUB_COMMITS_PER_PAGE: 3,
  DEFAULT_PAGE_SIZE: 10,
};

// Form validation configurations
export const VALIDATION_CONFIGS = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_USERNAME_LENGTH: 3,
};
