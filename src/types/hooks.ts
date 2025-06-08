import type { Variants } from 'framer-motion';

import type { ErrorCategory, ErrorSeverity } from '@/types/services';

// ============================================================================
// APP STATE INTERFACES
// ============================================================================

export interface AppState {
  isGameActive: boolean;
  loading: LoadingState;
  selectedCategory: string;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  type?: 'initial' | 'start' | 'restart' | 'exit';
}

// ============================================================================
// GAME HOOK INTERFACES
// ============================================================================

export interface UseScoreboardProps {
  moves: number;
  completedTime: number;
  categoryCode: string;
}

export interface UseSaveScoreProps {
  show: boolean;
  isAuthenticated: boolean;
  scoreSaved: boolean;
  setScoreSaved: (v: boolean) => void;
  setSaveError: (v: string | null) => void;
  categoryCode: string;
  moves: number;
  completedTime: number;
  stars: number;
}

// ============================================================================
// ASYNC DATA FETCHING INTERFACES
// ============================================================================

export type Fetcher<T> = (signal: AbortSignal) => Promise<T>;

export interface FetcherOptions<T> {
  onSuccess?: (data: T) => void;
  showToastOnError?: boolean;
  errorCategory?: ErrorCategory;
  errorSeverity?: ErrorSeverity;
  retryCount?: number;
  retryDelay?: number;
  skipFetch?: boolean;
  initialData?: T | null;
}

// ============================================================================
// UI HOOK INTERFACES
// ============================================================================

export interface ToastVisibilityProps {
  show: boolean;
  duration?: number;
  onClose?: () => void;
}

export interface ToastHandlerReturn {
  toast: {
    message: string;
    show: boolean;
    duration: number;
  };
  showToast: (message: string, duration?: number) => void;
  hideToast: () => void;
}

// ============================================================================
// ANIMATION INTERFACES
// ============================================================================

export interface AnimationReturn {
  enterAnimation: import('@/types/components').EnterAnimation;
  feedbackAnimation: Variants;
  flipAnimation: Variants;
  cardContentAnimation: Record<string, Variants>;
  cardEntranceAnimation: Variants;
  getStaggerConfig: (
    staggerChildren?: number,
    delayChildren?: number,
  ) => Record<string, number>;
}

// ============================================================================
// UTILITY INTERFACES
// ============================================================================

export type CSSModuleClasses = Record<string, string>;
