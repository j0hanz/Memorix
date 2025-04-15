import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { CARD_STATUS, FEEDBACK, CSS_CLASSES } from '@/constants/constants';
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
    !card.status.includes('matched') &&
    !isProcessingMatch;

  const handleClick = () => {
    // Handle card click
    if (isClickable && clickHandler && typeof index === 'number') {
      clickHandler(index);
    }
  };

  const getCardStyleClasses = (styles: CSSModuleClasses) => {
    if (!card) return styles.card;

    return [
      styles.card,
      !imageState.loaded && !imageState.error ? styles.loading : '',
      card.status.includes('matched') ? styles.matched : '',
      card.status === CARD_STATUS.ACTIVE ? styles.active : '',
    ]
      .filter(Boolean)
      .join(' ');
  };

  const ariaSelected = !!card && card.status === CSS_CLASSES.ACTIVE;

  const getStatsTopClass = (styles: CSSModuleClasses, feedback?: string) => {
    // Determine the stats top class based on feedback
    if (!feedback) return styles.statsTop;
    if (feedback === FEEDBACK.SUCCESS) {
      return `${styles.statsTop} ${styles.statsTopSuccess}`;
    } else if (feedback === FEEDBACK.ERROR) {
      return `${styles.statsTop} ${styles.statsTopError}`;
    }

    return styles.statsTop;
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
