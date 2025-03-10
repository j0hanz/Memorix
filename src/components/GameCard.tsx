import { useState } from 'react';
import Card from './Card';
import Image from './Image';
import styles from './styles/Card.module.css';
import { useGameContext } from '@/hooks/useGameContext';
import { CSS_CLASSES, CARD_STATUS } from '@/utils/constants';

interface GameCardProps {
  card: {
    img: string;
    name: string;
    status: string;
  };
  index: number;
  clickHandler?: (index: number) => void;
}

function GameCard({ card, index, clickHandler }: GameCardProps) {
  // State to track image loading status
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isInitialReveal } = useGameContext();

  // Get card class names based on current state
  const cardClassName = () => {
    return [
      styles.card,
      card.status ? styles[CSS_CLASSES.ACTIVE] : '',
      card.status === CARD_STATUS.MATCHED ? styles[CSS_CLASSES.MATCHED] : '',
      !imageLoaded && !imageError ? styles[CSS_CLASSES.LOADING] : '',
    ]
      .filter(Boolean)
      .join(' ');
  };

  // Determine if card is interactive
  const isInteractive = imageLoaded || imageError;
  const isMatched = card.status.includes('matched');
  const isClickable = isInteractive && !isInitialReveal && !isMatched;

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

  return (
    <Card
      className={cardClassName()}
      onClick={handleClick}
      role="button"
      ariaLabel={`Card ${card.name}`}
      ariaSelected={card.status === CSS_CLASSES.ACTIVE}
      disabled={!isClickable}
    >
      <div className={styles.back} />
      <Image
        src={card.img}
        alt={card.name}
        className={styles.img}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
      {!imageLoaded && !imageError && <div className={styles.loader} />}
    </Card>
  );
}

export default GameCard;
