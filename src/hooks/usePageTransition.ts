import { Variants } from 'framer-motion';
import { ANIMATION } from '@/utils/constants';

interface TransitionOptions {
  type?: 'spring' | 'tween' | 'inertia';
  duration?: number;
  stiffness?: number;
  damping?: number;
  delay?: number;
}

export function usePageTransition(options?: TransitionOptions) {
  // Default page variants
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.1,
      y: 20,
    },
    in: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      scale: 0.1,
      y: -20,
    },
  };

  // Default feedback animation
  const feedbackVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.1,
    },
    animate: {
      opacity: 1,
      scale: [0.1, 2, 1],
      transition: {
        duration: ANIMATION.FEEDBACK_DURATION,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.1,
      transition: {
        duration: ANIMATION.FEEDBACK_DURATION,
      },
    },
  };

  // Configurable transition settings
  const pageTransition = {
    type: options?.type || ANIMATION.DEFAULT_TYPE,
    stiffness: options?.stiffness || ANIMATION.DEFAULT_STIFFNESS,
    damping: options?.damping || ANIMATION.DEFAULT_DAMPING,
    duration: options?.duration || ANIMATION.DEFAULT_DURATION,
    delay: options?.delay || 0,
  };

  return {
    pageVariants,
    feedbackVariants,
    pageTransition,
    // Helper function to stagger children animations
    getStaggerConfig: (staggerChildren = 0.1, delayChildren = 0) => ({
      staggerChildren,
      delayChildren,
    }),
  };
}
