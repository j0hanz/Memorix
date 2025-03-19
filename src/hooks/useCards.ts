import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { CARD_STATUS, FEEDBACK, CSS_CLASSES } from '@/constants/constants';
import { CardData } from '@/types/card';
import { CSSModuleClasses } from '@/types/hooks';

export function useCards(
  card?: CardData,
  index?: number,
  clickHandler?: (index: number) => void,
) {
  // State to manage image loading and error
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
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
    (imageLoaded || imageError) &&
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
    // Determine the card style classes based on card status
    if (!card) return styles.card;

    return [
      styles.card,
      !imageLoaded && !imageError ? styles.loading : '',
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

  // Image handling functions
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
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
    isImageLoaded: imageLoaded,
    isImageError: imageError,
  };
}
