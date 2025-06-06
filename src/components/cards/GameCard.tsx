import { motion } from 'framer-motion';
import React from 'react';

import { Card } from '@/components/cards/Card';
import styles from '@/components/styles/GameCard.module.css';
import { Image } from '@/components/ui/Image';
import { LoadingCardSpinner } from '@/components/ui/Spinner';
import { useCard } from '@/hooks/game/useCard';
import { useMotions } from '@/hooks/game/useMotions';
import { useGameState } from '@/hooks/shared/useProvider';
import type { GameCardProps } from '@/types/components';
import {
  getCardAnimation,
  getCardFrontAnimation,
  getCardStyleClasses,
  isCardClickable,
} from '@/utils/game/cardUtils';

export function GameCard({ card, index, clickHandler }: GameCardProps) {
  const { flipAnimation, cardContentAnimation } = useMotions();
  const { handleCardClick, isInitialReveal, isProcessingMatch } =
    useGameState();

  const {
    handleImageLoad,
    handleImageError,
    ariaSelected,
    isImageLoaded,
    isImageError,
  } = useCard(card);

  const cardClasses: string = getCardStyleClasses(
    styles,
    card,
    isImageLoaded,
    isImageError,
  );
  const animationState: string = getCardAnimation(card);
  const frontAnimation: string = getCardFrontAnimation(card);
  const isClickable: boolean = isCardClickable(
    card,
    index,
    isImageLoaded,
    isImageError,
    isInitialReveal,
    isProcessingMatch,
  );

  const handleClick = (): void => {
    if (isClickable) {
      handleCardClick(index, clickHandler, card, isImageLoaded, isImageError);
    }
  };

  // Safe check for card status
  const hasCardStatus = card?.status != null && card.status !== '';
  const shouldFlipBack = hasCardStatus ? 'flipped' : 'initial';

  return (
    <motion.div
      initial="initial"
      animate={animationState}
      variants={flipAnimation}
      whileHover={isClickable ? 'hover' : undefined}
      className={styles.cardWrapper}
    >
      <Card
        onClick={handleClick}
        disabled={!isClickable}
        ariaLabel={`Card ${card.name}`}
        ariaSelected={ariaSelected}
        className={cardClasses}
      >
        <motion.div
          className={styles.back}
          variants={cardContentAnimation.backFace}
          initial="initial"
          animate={shouldFlipBack}
        />
        <motion.div
          className={styles.front}
          variants={cardContentAnimation.frontFace}
          initial="initial"
          animate={frontAnimation}
        >
          <Image
            src={card.img}
            alt={card.name}
            className={styles.img}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        </motion.div>
        {!isImageLoaded && !isImageError && (
          <LoadingCardSpinner isLoading={true} />
        )}
      </Card>
    </motion.div>
  );
}
