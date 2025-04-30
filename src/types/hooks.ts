import type { Variants, TargetAndTransition, Transition } from 'framer-motion';

export interface AppState {
  isGameActive: boolean;
  isLoading: boolean;
  showInstructions: boolean;
  showLatestUpdates: boolean;
  showCategorySelection: boolean;
  selectedCategory: string;
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

export interface GameHandlerOptions {
  setIsLoading: (value: boolean) => void;
  setIsGameActive: (value: boolean) => void;
  setShowInstructions: (value: boolean) => void;
  setShowLatestUpdates: (value: boolean) => void;
  setShowCategorySelection: (value: boolean) => void;
  setSelectedCategory: (value: string) => void;
  setShowLeaderboardModal?: (value: boolean) => void;
}

export type ValidationRules = Record<
  string,
  (value: string, formValues?: Record<string, string>) => string | null
>;

export interface MotionOptions {
  duration?: number;
  delay?: number;
  type?: 'spring' | 'tween' | 'inertia';
  stiffness?: number;
  damping?: number;
  bounce?: number;
}

// Interface for CSS module styles
export type CSSModuleClasses = Record<string, string>;

export interface AnimationReturn {
  enterAnimation: {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    transition: Transition;
  };
  feedbackAnimation: Variants;
  flipAnimation: Variants;
  cardContentAnimation: Record<string, Variants>;
  cardEntranceAnimation: Variants;
  getStaggerConfig: (
    staggerChildren?: number,
    delayChildren?: number,
  ) => Record<string, number>;
}
