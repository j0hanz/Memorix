// Game configuration
export const GAME_CONFIG = {
  TOTAL_PAIRS: 6,
  LOADING_DELAY: 3000,
  CARD_FLIP_DELAY: 400,
  REVEAL_DELAY: 500,
  INITIAL_STATE: {
    GAME_ACTIVE: false,
    LOADING: false,
    SHOW_INSTRUCTIONS: false,
    SHOW_UPDATES: false,
  },
};

// Scoring thresholds
export const SCORING = {
  FIVE_STAR: { moves: 6, time: 15 },
  FOUR_STAR: { moves: 7, time: 30 },
  THREE_STAR: { moves: 8, time: 45 },
  TWO_STAR: { moves: 9, time: 60 },
  // One star is default
};

// Game state constants
export const CARD_STATUS = {
  ACTIVE: 'active',
  MATCHED: 'active matched',
  DEFAULT: '',
};

// Feedback types
export const FEEDBACK = {
  SUCCESS: 'success',
  ERROR: 'error',
};

// Sound identifiers
export const SOUNDS = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  CLICK: 'click',
  BUTTON: 'button',
  COMPLETE: 'complete',
};

// Local storage keys
export const STORAGE_KEYS = {
  MUTE_STATE: 'memorixMuted',
};

// GitHub API config
export const GITHUB_API = {
  COMMITS_PER_PAGE: 3,
  API_URL: 'https://api.github.com/repos/j0hanz/Memorix/commits',
};

// CSS class variants
export const CSS_CLASSES = {
  ACTIVE: 'active',
  MATCHED: 'matched',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  GRAYED_OUT: 'grayedOut',
};

// Animation constants
export const MOTIONS = {
  DEFAULT_DURATION: 0.3,
  SPRING: {
    DEFAULT: {
      type: 'spring',
      stiffness: 150,
      damping: 25,
    },
    CARD_MATCH: {
      type: 'spring',
      stiffness: 100,
      damping: 25,
    },
    CARD_ENTRANCE: {
      type: 'spring',
      stiffness: 150,
      damping: 25,
    },
    HOVER: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
};

// Timer constants
export const TIMER = {
  INTERVAL: 1000,
};

// Card interaction delays
export const DELAYS = {
  INITIAL_REVEAL: 500,
  INITIAL_REVEAL_TIME: 3000,
};
