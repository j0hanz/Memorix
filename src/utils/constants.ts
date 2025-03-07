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
