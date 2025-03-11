import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Image from './Image';
import styles from './styles/Card.module.css';
import { useGameContext } from '@/hooks/useGameContext';
import { CSS_CLASSES, CARD_STATUS } from '@/constants/constants';
import { useMotions } from '@/hooks/useMotions';
import { GameCardProps } from '@/types/card';

function GameCard({ card, index, clickHandler }: GameCardProps) {
  // State to track image loading status
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isInitialReveal, isProcessingMatch } = useGameContext();
  const { flipAnimation, cardContentAnimation } = useMotions();

  // Determine card animation state based on status
  const getAnimationState = () => {
    if (card.status === CARD_STATUS.MATCHED) return 'matched';
    if (card.status === CARD_STATUS.ACTIVE) return 'active';
    return 'hidden';
  };

  // Determine if card is interactive
  const isInteractive = imageLoaded || imageError;
  const isMatched = card.status.includes('matched');
  // Prevent clicks during initial reveal, when matched, or during pair processing
  const isClickable =
    isInteractive && !isInitialReveal && !isMatched && !isProcessingMatch;

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

  const baseStyles = [
    styles.card,
    !imageLoaded && !imageError ? styles.loading : '',
    isMatched ? styles.matched : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      initial="initial"
      animate={getAnimationState()}
      variants={flipAnimation}
      whileHover={isClickable ? 'hover' : undefined}
      className={styles.cardWrapper}
    >
      <Card
        onClick={handleClick}
        role="button"
        ariaLabel={`Card ${card.name}`}
        ariaSelected={card.status === CSS_CLASSES.ACTIVE}
        disabled={!isClickable}
        className={baseStyles}
      >
        <motion.div
          className={styles.back}
          variants={cardContentAnimation.backFace}
          initial="initial"
          animate={card.status ? 'flipped' : 'initial'}
        />
        <motion.div
          className={styles.front}
          variants={cardContentAnimation.frontFace}
          initial="initial"
          animate={
            card.status === CARD_STATUS.MATCHED
              ? 'matched'
              : card.status
                ? 'flipped'
                : 'initial'
          }
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
        {!imageLoaded && !imageError && <div className={styles.loader} />}
      </Card>
    </motion.div>
  );
}

export default GameCard;
