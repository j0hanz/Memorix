import { useState } from 'react';
import Card from './Card';
import Image from './Image';
import styles from './styles/Card.module.css';

interface GameCardProps {
  card: {
    img: string;
    name: string;
    status: string;
  };
  index: number;
  clickHandler?: (index: number) => void;
}

export default function GameCard({ card, index, clickHandler }: GameCardProps) {
  // State to track image loading status
  const [imageLoaded, setImageLoaded] = useState(false);
  // State to track image error status
  const [imageError, setImageError] = useState(false);

  // Get card class names based on current state
  const cardClassName = () => {
    return [
      styles.card,
      card.status ? styles.active : '',
      card.status === 'active matched' ? styles.matched : '',
      !imageLoaded && !imageError ? styles.loading : '',
    ]
      .filter(Boolean)
      .join(' ');
  };

  // Handles the card click event
  function handleClick() {
    if ((imageLoaded || imageError) && clickHandler) {
      clickHandler(index);
    }
  }

  // Handles the image load event
  function handleImageLoad() {
    setImageLoaded(true);
  }

  // Handles the image error event
  function handleImageError() {
    setImageError(true);
    setImageLoaded(true);
  }

  return (
    <Card
      className={cardClassName()}
      onClick={handleClick}
      role="button"
      aria-label={`Card ${card.name}`}
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
