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
  SPINNER_DURATION: 1500,
  TOAST_DURATION: 2500,
  GAME_LOADING_DELAY: 3000,
  RESTART_DELAY: 100,
  INITIAL_REVEAL_DELAY: 500,
  INITIAL_REVEAL_TIME: 3000,
  MATCH_PROCESSING_DELAY: 500,
};

// Pagination configurations
export const PAGINATION_CONFIGS = {
  GITHUB_COMMITS_PER_PAGE: 3,
  DEFAULT_PAGE_SIZE: 10,
};

// Game configuration
export const GAME_CONFIGS = {
  TOTAL_PAIRS: 6,
  TIMER_INTERVAL: 1000,
};

// Form validation configurations
export const VALIDATION_CONFIGS = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_USERNAME_LENGTH: 3,
};
