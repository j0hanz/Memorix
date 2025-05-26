import type { TargetAndTransition, Transition, Variants } from 'framer-motion';

import type { ErrorCategory, ErrorSeverity } from '@/types/services';

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

export interface EnterAnimation {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
}

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

export interface AnimationReturn {
  enterAnimation: EnterAnimation;
  feedbackAnimation: Variants;
  flipAnimation: Variants;
  cardContentAnimation: Record<string, Variants>;
  cardEntranceAnimation: Variants;
  getStaggerConfig: (
    staggerChildren?: number,
    delayChildren?: number,
  ) => Record<string, number>;
}

export type CSSModuleClasses = Record<string, string>;
