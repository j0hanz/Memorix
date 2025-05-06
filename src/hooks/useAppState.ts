import { useReducer } from 'react';

import { CATEGORIES, GAME_CONFIG } from '@/constants/constants';
import type { AppState } from '@/types/hooks';

type AppAction =
  | { type: 'SET_LOADING'; value: Partial<AppState['loading']> }
  | { type: 'SET_GAME_ACTIVE'; value: boolean }
  | { type: 'SET_SELECTED_CATEGORY'; value: string };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: { ...state.loading, ...action.value } };
    case 'SET_GAME_ACTIVE':
      return { ...state, isGameActive: action.value };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.value };
    default:
      return state;
  }
}

export function useAppState() {
  // Initialize app state with enhanced loading state
  const [state, dispatch] = useReducer(appReducer, {
    isGameActive: GAME_CONFIG.INITIAL_STATE.GAME_ACTIVE,
    loading: {
      isLoading: GAME_CONFIG.INITIAL_STATE.LOADING,
      message: '',
      type: 'initial',
    },
    selectedCategory: CATEGORIES.ANIMALS,
  });

  return {
    isGameActive: state.isGameActive,
    loading: state.loading,
    selectedCategory: state.selectedCategory,
    setLoading: (loadingState: Partial<AppState['loading']>) => {
      dispatch({ type: 'SET_LOADING', value: loadingState });
    },
    setIsGameActive: (value: boolean) => {
      dispatch({ type: 'SET_GAME_ACTIVE', value });
    },
    setSelectedCategory: (value: string) => {
      dispatch({ type: 'SET_SELECTED_CATEGORY', value });
    },
  };
}
