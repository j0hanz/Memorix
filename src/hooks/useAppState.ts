import { useState } from 'react';
import { AppState } from '@/types/hooks';
import { GAME_CONFIG } from '@/constants/constants';

// Custom hook to manage app state values
export function useAppState() {
  // Use the initial state from constants
  const [state, setState] = useState<AppState>({
    isGameActive: GAME_CONFIG.INITIAL_STATE.GAME_ACTIVE,
    isLoading: GAME_CONFIG.INITIAL_STATE.LOADING,
    showInstructions: GAME_CONFIG.INITIAL_STATE.SHOW_INSTRUCTIONS,
    showLatestUpdates: GAME_CONFIG.INITIAL_STATE.SHOW_UPDATES,
  });

  return {
    ...state,
    setIsLoading: (val: boolean | ((prev: boolean) => boolean)) =>
      setState((prev) => ({
        ...prev,
        isLoading: typeof val === 'function' ? val(prev.isLoading) : val,
      })),
    setIsGameActive: (val: boolean | ((prev: boolean) => boolean)) =>
      setState((prev) => ({
        ...prev,
        isGameActive: typeof val === 'function' ? val(prev.isGameActive) : val,
      })),
    setShowInstructions: (val: boolean | ((prev: boolean) => boolean)) =>
      setState((prev) => ({
        ...prev,
        showInstructions:
          typeof val === 'function' ? val(prev.showInstructions) : val,
      })),
    setShowLatestUpdates: (val: boolean | ((prev: boolean) => boolean)) =>
      setState((prev) => ({
        ...prev,
        showLatestUpdates:
          typeof val === 'function' ? val(prev.showLatestUpdates) : val,
      })),
  };
}
