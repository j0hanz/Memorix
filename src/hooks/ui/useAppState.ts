import { useReducer } from 'react';

import { appReducer, initialAppState } from '@/reducers/appReducer';
import type { AppState } from '@/types/hooks';
import { appActions } from '@/utils/appActions';

export function useAppState() {
  // Initialize app state with reducer
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  return {
    isGameActive: state.isGameActive,
    loading: state.loading,
    selectedCategory: state.selectedCategory,
    setLoading: (loadingState: Partial<AppState['loading']>) => {
      dispatch(appActions.setLoading(loadingState));
    },
    setIsGameActive: (value: boolean) => {
      dispatch(appActions.setGameActive(value));
    },
    setSelectedCategory: (value: string) => {
      dispatch(appActions.setSelectedCategory(value));
    },
  };
}
