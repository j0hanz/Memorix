import { useReducer } from 'react';

import { appReducer, initialAppState } from '@/reducers/appReducer';
import type { AppState } from '@/types/hooks';

export function useAppState() {
  // Initialize app state with reducer
  const [state, dispatch] = useReducer(appReducer, initialAppState);

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
