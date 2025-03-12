import { Variants, TargetAndTransition, Transition } from 'framer-motion';

export interface AppState {
  isGameActive: boolean;
  isLoading: boolean;
  showInstructions: boolean;
  showLatestUpdates: boolean;
}

export interface GameHandlerOptions {
  setIsLoading: (value: boolean) => void;
  setIsGameActive: (value: boolean) => void;
  setShowInstructions: (value: boolean) => void;
  setShowLatestUpdates: (value: boolean) => void;
}

export interface MotionOptions {
  duration?: number;
  delay?: number;
  type?: 'spring' | 'tween' | 'inertia';
  stiffness?: number;
  damping?: number;
  bounce?: number;
}

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
