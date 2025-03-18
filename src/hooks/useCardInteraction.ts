import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { CARD_STATUS, CSS_CLASSES } from '@/constants/constants';
import { CardData } from '@/types/card';
import { CSSModuleClasses } from '@/types/hooks';

export function useCardInteraction(
  card: CardData,
  index: number,
  clickHandler?: (index: number) => void,
) {
  // State to track image loading status
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { isInitialReveal, isProcessingMatch } = useGameState();

  // Determine card animation state based on status (for card container)
  const getCardAnimation = () => {
    if (card.status === CARD_STATUS.MATCHED) return 'matched';
    if (card.status === CARD_STATUS.ACTIVE) return 'active';
    return 'hidden';
  };

  // Determine front face animation state (matching the old implementation)
  const getCardFrontAnimation = () => {
    if (card.status === CARD_STATUS.MATCHED) return 'matched';
    if (card.status === CARD_STATUS.ACTIVE) return 'flipped';
    return 'initial';
  };

  // Determine if card is interactive
  const isImageLoaded = imageLoaded || imageError;
  const isMatched = card.status.includes('matched');

  // Prevent clicks during initial reveal, when matched, or during pair processing
  const isClickable =
    isImageLoaded && !isInitialReveal && !isMatched && !isProcessingMatch;

  // Handles the card click event
  const handleClick = () => {
    if (isClickable && clickHandler) {
      clickHandler(index);
    }
  };

  // Handles the image load event
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Handles the image error event
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Compute card style classes
  const getCardStyleClasses = (styles: CSSModuleClasses) => {
    return [
      styles.card,
      !imageLoaded && !imageError ? styles.loading : '',
      isMatched ? styles.matched : '',
      card.status === CARD_STATUS.ACTIVE ? styles.active : '',
    ]
      .filter(Boolean)
      .join(' ');
  };

  return {
    isClickable,
    handleClick,
    handleImageLoad,
    handleImageError,
    getCardAnimation,
    getCardFrontAnimation,
    getCardStyleClasses,
    isImageLoaded,
    isImageError: imageError,
    ariaSelected: card.status === CSS_CLASSES.ACTIVE,
  };
}
