// Game configuration
export const GAME_CONFIG = {
  TOTAL_PAIRS: 6,
  INITIAL_REVEAL_TIME: 3000,
  LOADING_DELAY: 3000,
  CARD_FLIP_DELAY: 500,
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

// Animation settings
export const ANIMATION = {
  DEFAULT_TYPE: 'spring',
  DEFAULT_STIFFNESS: 80,
  DEFAULT_DAMPING: 20,
  DEFAULT_DURATION: 0.4,
  FEEDBACK_DURATION: 0.5,
};

// GitHub API config
export const GITHUB_API = {
  COMMITS_PER_PAGE: 3,
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
