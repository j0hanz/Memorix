import { useState } from 'react';

import type { CardData } from '@/types/data';

export function useCard(card?: CardData) {
  const [imageState, setImageState] = useState({
    loaded: false,
    error: false,
  });

  const handleImageLoad = () => {
    setImageState({ loaded: true, error: false });
  };

  const handleImageError = () => {
    setImageState({ loaded: true, error: true });
  };

  const ariaSelected = !!card && card.status.includes('active');

  return {
    imageState,
    handleImageLoad,
    handleImageError,
    ariaSelected,
    isImageLoaded: imageState.loaded,
    isImageError: imageState.error,
  };
}
