import { motion } from 'framer-motion';
import React from 'react';

import Card from '@/components/Card';
import Image from '@/components/Image';
import { LoadingCardSpinner } from '@/components/Spinner';
import { useCards } from '@/hooks/useCards';
import { useMotions } from '@/hooks/useMotions';
import type { GameCardProps } from '@/types/card';

import styles from './styles/GameCard.module.css';

export function GameCard({ card, index, clickHandler }: GameCardProps) {
  const { flipAnimation, cardContentAnimation } = useMotions();
  const {
    isClickable,
    handleClick,
    handleImageLoad,
    handleImageError,
    getCardAnimation,
    getCardFrontAnimation,
    getCardStyleClasses,
    isImageLoaded,
    isImageError,
    ariaSelected,
  } = useCards(card, index, clickHandler);

  const cardClasses = getCardStyleClasses(styles);
  const animationState = getCardAnimation();
  const frontAnimation = getCardFrontAnimation();

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
          animate={card?.status ? 'flipped' : 'initial'}
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
