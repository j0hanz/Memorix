// Card interaction delays
export const DELAYS = {
  INITIAL_REVEAL: 500,
  INITIAL_REVEAL_TIME: 3000,
  MATCH_PROCESSING: 500,
  RESTART_DELAY: 100,
  TOAST_DURATION: 2500,
  SPINNER_DURATION: 1500,
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
  NATURE: 'nature',
  VEHICLES: 'vehicles',
  FOOD: 'food',
  SHAPES: 'shapes',
  NUMBERS: 'numbers',
};

export const CATEGORY_INFO = {
  [CATEGORIES.ANIMALS]: {
    name: 'Animals',
  },
  [CATEGORIES.NATURE]: {
    name: 'Nature',
  },
  [CATEGORIES.VEHICLES]: {
    name: 'Vehicles',
  },
  [CATEGORIES.FOOD]: {
    name: 'Food',
  },
  [CATEGORIES.SHAPES]: {
    name: 'Shapes',
  },
  [CATEGORIES.NUMBERS]: {
    name: 'Numbers',
  },
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

// Timer constants
export const TIMER = {
  INTERVAL: 1000,
};
