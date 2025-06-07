import React from 'react';

import styles from '@/components/modals/styles/Modal.module.css';
import type { StarRatingProps } from '@/types/components';
import { getIcon } from '@/utils/ui/iconUtils';

export const StarRating: React.FC<StarRatingProps> = ({
  count,
  max = 5,
  className,
}) => (
  <>
    {Array.from({ length: max }).map((_, i) =>
      React.cloneElement(
        getIcon('STAR', {
          className: `${styles.scoreIconStar} ${i < count ? styles.starIcon : styles.grayedOut} ${className || ''}`,
        }),
        { key: i },
      ),
    )}
  </>
);
