import { useImage } from '@/hooks/useImage';
import type { CardData } from '@/types/data';

export function useCard(card?: CardData) {
  const { isLoaded, hasError, handleLoad, handleError } = useImage({
    src: card?.img || '',
    onLoad: () => {},
    onError: () => {},
  });

  const ariaSelected = !!card && card.status.includes('active');

  return {
    imageState: {
      loaded: isLoaded,
      error: hasError,
    },
    handleImageLoad: handleLoad,
    handleImageError: handleError,
    ariaSelected,
    isImageLoaded: isLoaded,
    isImageError: hasError,
  };
}
