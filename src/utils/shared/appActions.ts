import type { AppState } from '@/types/hooks';
import type { AppAction } from '@/types/reducers';

/**
 * App action creators for type-safe action dispatching
 * Organized by functionality following the Memorix coding guidelines
 */

// Loading state actions
export const loadingActions = {
  setLoading: (value: Partial<AppState['loading']>): AppAction => ({
    type: 'SET_LOADING',
    value,
  }),
};

// Game state actions
export const gameStateActions = {
  setGameActive: (value: boolean): AppAction => ({
    type: 'SET_GAME_ACTIVE',
    value,
  }),
  setSelectedCategory: (value: string): AppAction => ({
    type: 'SET_SELECTED_CATEGORY',
    value,
  }),
};

// Combined export for convenience
export const appActions = {
  ...loadingActions,
  ...gameStateActions,
};
