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

  // Flip animation for the card component with variants for all states
  const flipAnimation = {
    initial: {
      rotateY: 0,
      scale: 1,
    },
    active: {
      rotateY: 180,
      scale: 1.05,
      transition: {
        type: 'tween',
        duration: 0.35,
      },
    },
    matched: {
      rotateY: 180,
      scale: 0.9,
      transition: {
        type: 'tween',
      },
    },
    hidden: {
      rotateY: 0,
      scale: 1,
      transition: {
        type: 'tween',
        duration: 0.35,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: 'tween',
      },
    },
  };

  // Content animations for front/back faces
  const cardContentAnimation = {
    backFace: {
      initial: { rotateY: 0, opacity: 1 },
      flipped: { rotateY: 180, opacity: 0 },
    },
    frontFace: {
      initial: {
        rotateY: 180,
        opacity: 0,
        transition: {
          duration: 0.35,
        },
      },
      flipped: {
        rotateY: 0,
        opacity: 1,
        transition: {
          duration: 0.35,
        },
      },
      matched: {
        rotateY: 0,
        opacity: 0.8,
        scale: 0.9,
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
