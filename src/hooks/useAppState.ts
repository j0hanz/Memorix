import { useReducer } from 'react';
import { AppState } from '@/types/hooks';
import { GAME_CONFIG, CATEGORIES } from '@/constants/constants';

type AppAction =
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'SET_GAME_ACTIVE'; value: boolean }
  | { type: 'SET_INSTRUCTIONS'; value: boolean }
  | { type: 'SET_UPDATES'; value: boolean }
  | { type: 'SET_SHOW_CATEGORY_SELECTION'; value: boolean }
  | { type: 'SET_SELECTED_CATEGORY'; value: string };

function appReducer(state: AppState, action: AppAction): AppState {
  // Update app state based on action type
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.value };
    case 'SET_GAME_ACTIVE':
      return { ...state, isGameActive: action.value };
    case 'SET_INSTRUCTIONS':
      return { ...state, showInstructions: action.value };
    case 'SET_UPDATES':
      return { ...state, showLatestUpdates: action.value };
    case 'SET_SHOW_CATEGORY_SELECTION':
      return { ...state, showCategorySelection: action.value };
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
    showInstructions: GAME_CONFIG.INITIAL_STATE.SHOW_INSTRUCTIONS,
    showLatestUpdates: GAME_CONFIG.INITIAL_STATE.SHOW_UPDATES,
    showCategorySelection: false,
    selectedCategory: CATEGORIES.ANIMALS,
  });

  return {
    ...state,
    setIsLoading: (value: boolean) => dispatch({ type: 'SET_LOADING', value }),
    setIsGameActive: (value: boolean) =>
      dispatch({ type: 'SET_GAME_ACTIVE', value }),
    setShowInstructions: (value: boolean) =>
      dispatch({ type: 'SET_INSTRUCTIONS', value }),
    setShowLatestUpdates: (value: boolean) =>
      dispatch({ type: 'SET_UPDATES', value }),
    setShowCategorySelection: (value: boolean) =>
      dispatch({ type: 'SET_SHOW_CATEGORY_SELECTION', value }),
    setSelectedCategory: (value: string) =>
      dispatch({ type: 'SET_SELECTED_CATEGORY', value }),
  };
}
