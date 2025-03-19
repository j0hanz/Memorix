import { motion } from 'framer-motion';
import Card from './Card';
import Image from './Image';
import styles from './styles/GameCard.module.css';
import { useMotions } from '@/hooks/useMotions';
import { GameCardProps } from '@/types/card';
import { useCards } from '@/hooks/useCards';

function GameCard({ card, index, clickHandler }: GameCardProps) {
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

  const baseStyles = getCardStyleClasses(styles);

  return (
    <motion.div
      initial="initial"
      animate={getCardAnimation()}
      variants={flipAnimation}
      whileHover={isClickable ? 'hover' : undefined}
      className={styles.cardWrapper}
    >
      <Card
        onClick={handleClick}
        role="button"
        ariaLabel={`Card ${card.name}`}
        aria-selected={ariaSelected}
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
          animate={getCardFrontAnimation()}
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
        {!isImageLoaded && !isImageError && <div className={styles.loader} />}
      </Card>
    </motion.div>
  );
}

export default GameCard;
