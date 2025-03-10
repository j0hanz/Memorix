import { useState } from 'react';

export interface AppState {
  isGameActive: boolean;
  isLoading: boolean;
  showInstructions: boolean;
  showLatestUpdates: boolean;
}

// Custom hook to manage app state values
export function useAppState() {
  const [state, setState] = useState<AppState>({
    isGameActive: false,
    isLoading: false,
    showInstructions: false,
    showLatestUpdates: false,
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
