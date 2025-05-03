import clsx from 'clsx';
import { useState } from 'react';

import { CARD_STATUS, FEEDBACK } from '@/constants/constants';
import { useGameState } from '@/hooks/useGameState';
import type { CardData } from '@/types/card';
import type { CSSModuleClasses } from '@/types/hooks';

export function useCards(
  card?: CardData,
  index?: number,
  clickHandler?: (index: number) => void,
) {
  // State to manage image loading status
  const [imageState, setImageState] = useState({
    loaded: false,
    error: false,
  });
  const { isInitialReveal, isProcessingMatch } = useGameState();

  const getCardAnimation = () => {
    // Determine the animation class based on card status
    if (!card) return 'hidden';
    if (card.status === CARD_STATUS.MATCHED) return 'matched';
    if (card.status === CARD_STATUS.ACTIVE) return 'active';
    return 'hidden';
  };

  const getCardFrontAnimation = () => {
    // Determine the front animation class based on card status
    if (!card) return 'initial';
    if (card.status === CARD_STATUS.MATCHED) return 'matched';
    if (card.status === CARD_STATUS.ACTIVE) return 'flipped';
    return 'initial';
  };

  // Determines if the card can be clicked
  const isClickable =
    !!card &&
    typeof index === 'number' &&
    (imageState.loaded || imageState.error) &&
    !isInitialReveal &&
    !card.status.includes(CARD_STATUS.MATCHED) &&
    !isProcessingMatch;

  const handleClick = () => {
    // Handle card click
    if (isClickable && clickHandler && typeof index === 'number') {
      clickHandler(index);
    }
  };

  // Determine the CSS classes for the card
  const getCardStyleClasses = (styles: CSSModuleClasses) => {
    return clsx(styles.card, {
      [styles.loading]: !imageState.loaded && !imageState.error,
      [styles.matched]: card?.status.includes(CARD_STATUS.MATCHED),
      [styles.active]: card?.status === CARD_STATUS.ACTIVE,
    });
  };

  // Determine if the card is selected for ARIA attributes
  const ariaSelected = !!card && card.status === CARD_STATUS.ACTIVE;

  // Determine the CSS classes for the stats top element
  const getStatsTopClass = (styles: CSSModuleClasses, feedback?: string) => {
    return clsx(styles.statsTop, {
      [styles.statsTopSuccess]: feedback === FEEDBACK.SUCCESS,
      [styles.statsTopError]: feedback === FEEDBACK.ERROR,
    });
  };

  // Handle image loading success
  const handleImageLoad = () => {
    setImageState({ loaded: true, error: false });
  };

  // Handle image loading error
  const handleImageError = () => {
    setImageState({ loaded: true, error: true });
  };

  return {
    getCardAnimation,
    getCardFrontAnimation,
    isClickable,
    handleClick,
    getCardStyleClasses,
    ariaSelected,
    getStatsTopClass,
    handleImageLoad,
    handleImageError,
    isImageLoaded: imageState.loaded,
    isImageError: imageState.error,
  };
}
