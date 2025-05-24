import { CATEGORIES, STATE_CONFIG } from '@/constants/game';
import type { AppState } from '@/types/hooks';
import type { AppAction } from '@/types/reducers';

export const initialAppState: AppState = {
  isGameActive: STATE_CONFIG.INITIAL_STATE.GAME_ACTIVE,
  loading: {
    isLoading: STATE_CONFIG.INITIAL_STATE.LOADING,
    message: '',
    type: 'initial',
  },
  selectedCategory: CATEGORIES.ANIMALS,
};

// Reducer function for the app state
export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      // Set loading state with partial update
      return {
        ...state,
        loading: { ...state.loading, ...action.value },
      };

    case 'SET_GAME_ACTIVE':
      // Set game active state
      return {
        ...state,
        isGameActive: action.value,
      };

    case 'SET_SELECTED_CATEGORY':
      // Set selected category
      return {
        ...state,
        selectedCategory: action.value,
      };

    default:
      return state;
  }
}
