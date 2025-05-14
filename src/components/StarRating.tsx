import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

import type { StarRatingProps } from '@/types/components';

import styles from './styles/Modal.module.css';

export const StarRating: React.FC<StarRatingProps> = ({
  count,
  max = 5,
  className,
}) => (
  <>
    {Array.from({ length: max }).map((_, i) => (
      <StarOutlinedIcon
        key={i}
        className={`${styles.scoreIconStar} ${i < count ? styles.starIcon : styles.grayedOut} ${className || ''}`}
      />
    ))}
  </>
);
