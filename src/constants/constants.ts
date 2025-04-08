// Animation constants
export const MOTIONS = {
  DEFAULT_DURATION: 0.2,
  SPRING: {
    CARD_ENTRANCE: {
      type: 'spring',
      stiffness: 175,
      damping: 40,
    },
    CARD_MATCH: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
    DEFAULT: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
    },
    HOVER: {
      type: 'spring',
      stiffness: 250,
      damping: 25,
    },
  },
};

// Card interaction delays
export const DELAYS = {
  INITIAL_REVEAL: 500,
  INITIAL_REVEAL_TIME: 3000,
  MATCH_PROCESSING: 500,
  RESTART_DELAY: 100,
};

// Card status constants
export const CARD_STATUS = {
  ACTIVE: 'active',
  DEFAULT: '',
  MATCHED: 'active matched',
};

// Categories and descriptions
export const CATEGORIES = {
  ANIMALS: 'animals',
  ASTRONOMY: 'astronomy',
  PATTERN: 'pattern',
  SUSHI: 'sushi',
};

export const CATEGORY_INFO = {
  [CATEGORIES.ANIMALS]: {
    name: 'Animals',
  },
  [CATEGORIES.ASTRONOMY]: {
    name: 'Astronomy',
  },
  [CATEGORIES.PATTERN]: {
    name: 'Patterns',
  },
  [CATEGORIES.SUSHI]: {
    name: 'Sushi',
  },
};

// CSS class variants
export const CSS_CLASSES = {
  ACTIVE: 'active',
  ERROR: 'error',
  GRAYED_OUT: 'grayedOut',
  LOADING: 'loading',
  MATCHED: 'matched',
  SUCCESS: 'success',
};

// Feedback types
export const FEEDBACK = {
  ERROR: 'error',
  SUCCESS: 'success',
};

// Game configuration
export const GAME_CONFIG = {
  INITIAL_STATE: {
    GAME_ACTIVE: false,
    LOADING: false,
    SHOW_INSTRUCTIONS: false,
    SHOW_UPDATES: false,
  },
  LOADING_DELAY: 3000,
  TOTAL_PAIRS: 6,
};

// GitHub API config
export const GITHUB_API = {
  API_URL: 'https://api.github.com/repos/j0hanz/Memorix/commits',
  COMMITS_PER_PAGE: 3,
};

// Local storage keys
export const STORAGE_KEYS = {
  MUTE_STATE: 'memorixMuted',
};

// Scoring thresholds
export const SCORING = {
  FIVE_STAR: { moves: 6, time: 15 },
  FOUR_STAR: { moves: 7, time: 30 },
  THREE_STAR: { moves: 8, time: 45 },
  TWO_STAR: { moves: 9, time: 60 },
  // One star is default
};

// Sound identifiers
export const SOUNDS = {
  BUTTON: 'button',
  CLICK: 'click',
  COMPLETE: 'complete',
  CORRECT: 'correct',
  WRONG: 'wrong',
};

// Timer constants
export const TIMER = {
  INTERVAL: 1000,
};

// Axios configuration
export const AXIOS_CONFIG = {
  baseURL: 'http://127.0.0.1:8000',
  headersPost: {
    'Content-Type': 'application/json',
  },
};
