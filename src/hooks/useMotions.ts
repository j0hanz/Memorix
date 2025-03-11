import { Variants } from 'framer-motion';
import { MOTIONS } from '@/constants/constants';
import { MotionOptions } from '@/types/hooks';

// Custom hook for creating animations with Framer Motion
export function useMotions(options?: MotionOptions) {
  // Enter animation - fade in and scale up
  const enterAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: MOTIONS.DEFAULT_DURATION,
      scale: MOTIONS.SPRING.DEFAULT,
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
        duration: MOTIONS.DEFAULT_DURATION,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.1,
      transition: {
        duration: MOTIONS.DEFAULT_DURATION,
      },
    },
  };

  // Card entrance animation for game start
  const cardEntranceAnimation: Variants = {
    initial: {
      opacity: 0,
      rotateY: 90,
      scale: 0.1,
      y: 90,
    },
    in: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      y: 0,
      transition: MOTIONS.SPRING.CARD_ENTRANCE,
    },
    out: {
      opacity: 0,
      rotateY: -90,
      scale: 0.1,
      y: -90,
      transition: MOTIONS.SPRING.CARD_ENTRANCE,
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
        ...MOTIONS.SPRING.DEFAULT,
        duration: MOTIONS.DEFAULT_DURATION,
      },
    },
    matched: {
      rotateY: 180,
      scale: 0.9,
      transition: {
        ...MOTIONS.SPRING.CARD_MATCH,
        duration: MOTIONS.DEFAULT_DURATION,
      },
    },
    hidden: {
      rotateY: 0,
      scale: 1,
      transition: {
        ...MOTIONS.SPRING.DEFAULT,
        duration: MOTIONS.DEFAULT_DURATION,
      },
    },
    hover: {
      scale: 1.05,
      transition: MOTIONS.SPRING.HOVER,
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
          duration: MOTIONS.DEFAULT_DURATION,
        },
      },
      flipped: {
        rotateY: 0,
        opacity: 1,
        transition: {
          opacity: { delay: 0.1 },
          duration: MOTIONS.DEFAULT_DURATION,
        },
      },
      matched: {
        rotateY: 0,
        opacity: 0.85,
        scale: 0.92,
        transition: {
          duration: MOTIONS.DEFAULT_DURATION,
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
    cardEntranceAnimation,
    getStaggerConfig,
  };
}
