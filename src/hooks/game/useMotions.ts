import {
  CARD_CONTENT_VARIANTS,
  CARD_ENTRANCE_VARIANTS,
  ENTER_ANIMATION,
  FEEDBACK_VARIANTS,
  FLIP_VARIANTS,
  getStaggerConfig,
  TOAST_VARIANTS,
} from '@/constants/motions';

export function useMotions() {
  return {
    enterAnimation: ENTER_ANIMATION,
    feedbackAnimation: FEEDBACK_VARIANTS,
    cardEntranceAnimation: CARD_ENTRANCE_VARIANTS,
    flipAnimation: FLIP_VARIANTS,
    cardContentAnimation: CARD_CONTENT_VARIANTS,
    toastAnimation: TOAST_VARIANTS,
    getStaggerConfig,
  };
}
