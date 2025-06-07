import type { Variants } from 'framer-motion';

// Base duration for all animations
export const DEFAULT_DURATION = 0.2;
export const FEEDBACK_DURATION = 0.3;

// Springs
export const SPRING = {
  CARD_ENTRANCE: { type: 'spring', stiffness: 125, damping: 20, bounce: 0.35 },
  CARD_MATCH: { type: 'spring', stiffness: 100, damping: 20, bounce: 0.35 },
  DEFAULT: { type: 'spring', stiffness: 175, damping: 20, bounce: 0.35 },
};

// Standard variant keys
export const VARIANTS = {
  INITIAL: 'initial' as const,
  ANIMATE: 'animate' as const,
  EXIT: 'exit' as const,
  IN: 'in' as const,
  OUT: 'out' as const,
  ACTIVE: 'active' as const,
  MATCHED: 'matched' as const,
  HIDDEN: 'hidden' as const,
};

// Enter animation
export const ENTER_ANIMATION = {
  variants: {
    [VARIANTS.INITIAL]: { opacity: 0, scale: 0.1 },
    [VARIANTS.ANIMATE]: { opacity: 1, scale: 1 },
  },
  transition: {
    duration: DEFAULT_DURATION,
    scale: SPRING.DEFAULT,
  },
};

// Feedback animation
export const FEEDBACK_VARIANTS: Variants = {
  [VARIANTS.INITIAL]: { opacity: 0, scale: 0 },
  [VARIANTS.ANIMATE]: {
    opacity: 1,
    scale: [0.5, 1.5, 1],
    transition: {
      duration: FEEDBACK_DURATION,
    },
  },
  [VARIANTS.EXIT]: {
    opacity: 0,
    scale: 0.1,
    transition: { duration: FEEDBACK_DURATION },
  },
};

// Card entrance
export const CARD_ENTRANCE_VARIANTS: Variants = {
  [VARIANTS.INITIAL]: { opacity: 0, rotateY: 90, scale: 0.1, y: 90 },
  [VARIANTS.IN]: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    y: 0,
    transition: { ...SPRING.CARD_ENTRANCE, duration: DEFAULT_DURATION },
  },
  [VARIANTS.OUT]: {
    opacity: 0,
    rotateY: -90,
    scale: 0.1,
    y: -90,
    transition: { ...SPRING.CARD_ENTRANCE, duration: DEFAULT_DURATION },
  },
};

// Flip animation (with optional hover)
export const FLIP_VARIANTS: Variants = {
  [VARIANTS.INITIAL]: { rotateY: 0, scale: 1 },
  [VARIANTS.ACTIVE]: {
    rotateY: 180,
    transition: { ...SPRING.DEFAULT, duration: DEFAULT_DURATION },
  },
  [VARIANTS.MATCHED]: {
    rotateY: 180,
    scale: 0.9,
    transition: { ...SPRING.CARD_MATCH, duration: DEFAULT_DURATION },
  },
  [VARIANTS.HIDDEN]: {
    rotateY: 0,
    scale: 1,
    transition: { ...SPRING.DEFAULT, duration: DEFAULT_DURATION },
  },
};

// Card content
export const CARD_CONTENT_VARIANTS = {
  backFace: {
    [VARIANTS.INITIAL]: { rotateY: 0, opacity: 1 },
    flipped: {
      rotateY: 180,
      opacity: 0,
      transition: { opacity: { delay: 0.2 } },
    },
  },
  frontFace: {
    [VARIANTS.INITIAL]: {
      rotateY: 180,
      opacity: 0,
      transition: { duration: DEFAULT_DURATION },
    },
    flipped: {
      rotateY: 0,
      opacity: 1,
      transition: { duration: DEFAULT_DURATION },
    },
    matched: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: DEFAULT_DURATION },
    },
  },
};

// Stagger helpers
export const STAGGER_DEFAULT = 0.1;

// Toast animation
export const TOAST_VARIANTS: Variants = {
  [VARIANTS.INITIAL]: {
    opacity: 0,
    y: -50,
    scale: 0.95,
    x: '-50%',
  },
  [VARIANTS.ANIMATE]: {
    opacity: 1,
    y: 0,
    scale: 1,
    x: '-50%',
    transition: {
      ...SPRING.DEFAULT,
      duration: 0.3,
      opacity: { duration: 0.3 },
    },
  },
  [VARIANTS.EXIT]: {
    opacity: 0,
    y: -30,
    scale: 0.9,
    x: '-50%',
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
    },
  },
  // Variant for bottom placement
  initialBottom: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    x: '-50%',
  },
  animateBottom: {
    opacity: 1,
    y: 0,
    scale: 1,
    x: '-50%',
    transition: {
      ...SPRING.DEFAULT,
      duration: 0.3,
      opacity: { duration: 0.3 },
    },
  },
  exitBottom: {
    opacity: 0,
    y: 30,
    scale: 0.9,
    x: '-50%',
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
    },
  },
};

// Tooltip animation
export const TOOLTIP_VARIANTS: Variants = {
  [VARIANTS.INITIAL]: {
    opacity: 0,
    scale: 0.8,
    y: 8,
  },
  [VARIANTS.ANIMATE]: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ...SPRING.DEFAULT,
      duration: 0.2,
      opacity: { duration: 0.15 },
    },
  },
  [VARIANTS.EXIT]: {
    opacity: 0,
    scale: 0.9,
    y: 4,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  // Placement-specific variants
  top: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ...SPRING.DEFAULT,
      duration: 0.2,
      opacity: { duration: 0.15 },
    },
  },
  topInitial: {
    opacity: 0,
    scale: 0.8,
    y: -8,
  },
  topExit: {
    opacity: 0,
    scale: 0.9,
    y: -4,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  left: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      ...SPRING.DEFAULT,
      duration: 0.2,
      opacity: { duration: 0.15 },
    },
  },
  leftInitial: {
    opacity: 0,
    scale: 0.8,
    x: 8,
  },
  leftExit: {
    opacity: 0,
    scale: 0.9,
    x: 4,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  right: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      ...SPRING.DEFAULT,
      duration: 0.2,
      opacity: { duration: 0.15 },
    },
  },
  rightInitial: {
    opacity: 0,
    scale: 0.8,
    x: -8,
  },
  rightExit: {
    opacity: 0,
    scale: 0.9,
    x: -4,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
};

export function getStaggerConfig(
  staggerChildren = STAGGER_DEFAULT,
  delayChildren = 0,
) {
  return { staggerChildren, delayChildren };
}
