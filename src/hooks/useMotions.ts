import { delay, easeInOut, Variants } from 'framer-motion';
import { MOTIONS } from '@/utils/constants';
import { duration } from '@mui/material';

// Options for customizing animations
interface MotionOptions {
  duration?: number;
  delay?: number;
  type?: 'spring' | 'tween' | 'inertia';
  stiffness?: number;
  damping?: number;
  bounce?: number;
}

// Custom hook for creating animations with Framer Motion
export function useMotions(options?: MotionOptions) {
  // Enter animation - fade in and scale up
  const enterAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: MOTIONS.DEFAULT_DURATION,
      scale: {
        type: 'spring',
        visualDuration: MOTIONS.DEFAULT_DURATION,
        bounce: MOTIONS.DEFAULT_DURATION,
      },
    },
  };

  // Feedback animation - pop effect
  const feedbackAnimation: Variants = {
    initial: {
      opacity: 0,
      scale: 0.1,
    },
    animate: {
      opacity: 1,
      scale: [0.1, 2, 1],
      transition: {
        duration: MOTIONS.FEEDBACK_DURATION,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.1,
      transition: {
        duration: MOTIONS.FEEDBACK_DURATION,
      },
    },
  };

  // Improved flip animation with better easing and physics
  const flipAnimation = {
    initial: {
      rotateY: 0,
      scale: 1,
    },
    active: {
      rotateY: 180,
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
        duration: 0.5,
      },
    },
    matched: {
      rotateY: 180,
      scale: 0.9,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    },
    hidden: {
      rotateY: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Content animations with improved transitions
  const cardContentAnimation = {
    backFace: {
      initial: { rotateY: 0, opacity: 1 },
      flipped: {
        rotateY: 180,
        opacity: 0,
        transition: {
          opacity: { delay: 0.1 },
        },
      },
    },
    frontFace: {
      initial: {
        rotateY: 180,
        opacity: 0,
        transition: {
          duration: 0.4,
        },
      },
      flipped: {
        rotateY: 0,
        opacity: 1,
        transition: {
          opacity: { delay: 0.1 },
          duration: 0.4,
        },
      },
      matched: {
        rotateY: 0,
        opacity: 0.85,
        scale: 0.92,
        transition: {
          duration: 0.4,
        },
      },
    },
  };

  // Helper for staggered children animations
  const getStaggerConfig = (staggerChildren = 0.1, delayChildren = 0) => ({
    staggerChildren,
    delayChildren: options?.delay || delayChildren,
  });

  return {
    enterAnimation,
    feedbackAnimation,
    flipAnimation,
    cardContentAnimation,
    getStaggerConfig,
  };
}
