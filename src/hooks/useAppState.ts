import { useReducer } from 'react';

import { CATEGORIES, GAME_CONFIG } from '@/constants/constants';
import type { AppState } from '@/types/hooks';

type AppAction =
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'SET_GAME_ACTIVE'; value: boolean }
  | { type: 'SET_SELECTED_CATEGORY'; value: string };

function appReducer(state: AppState, action: AppAction): AppState {
  // Update app state based on action type
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.value };
    case 'SET_GAME_ACTIVE':
      return { ...state, isGameActive: action.value };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.value };
    default:
      return state;
  }
}

export function useAppState() {
  // Initialize app state
  const [state, dispatch] = useReducer(appReducer, {
    isGameActive: GAME_CONFIG.INITIAL_STATE.GAME_ACTIVE,
    isLoading: GAME_CONFIG.INITIAL_STATE.LOADING,
    selectedCategory: CATEGORIES.ANIMALS,
  });

  return {
    ...state,
    setIsLoading: (value: boolean) => {
      dispatch({ type: 'SET_LOADING', value });
    },
    setIsGameActive: (value: boolean) => {
      dispatch({ type: 'SET_GAME_ACTIVE', value });
    },
    setSelectedCategory: (value: string) => {
      dispatch({ type: 'SET_SELECTED_CATEGORY', value });
    },
  };
}
