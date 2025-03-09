import { Variants } from 'framer-motion';

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
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Configurable transition settings
  const pageTransition = {
    type: options?.type || 'spring',
    stiffness: options?.stiffness || 80,
    damping: options?.damping || 20,
    duration: options?.duration || 0.4,
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
