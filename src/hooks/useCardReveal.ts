import { useState, useCallback } from 'react';
import { CARD_STATUS } from '@/utils/constants';

export function useCardReveal<T extends { status: string }>(
  cards: T[],
  setCards: React.Dispatch<React.SetStateAction<T[]>>,
  options: {
    initialDelay?: number;
    revealDuration?: number;
    onRevealComplete?: () => void;
  } = {},
) {
  const [isRevealing, setIsRevealing] = useState(false);
  const {
    initialDelay = 500,
    revealDuration = 3000,
    onRevealComplete,
  } = options;

  const revealCards = useCallback(() => {
    setIsRevealing(true);

    const timer = setTimeout(() => {
      // Show all cards
      setCards((prev) =>
        prev.map((card) => ({ ...card, status: CARD_STATUS.ACTIVE })),
      );

      // Hide cards after duration
      const hideTimer = setTimeout(() => {
        setCards((prev) =>
          prev.map((card) => ({ ...card, status: CARD_STATUS.DEFAULT })),
        );
        setIsRevealing(false);
        onRevealComplete?.();
      }, revealDuration);

      return () => clearTimeout(hideTimer);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [setCards, initialDelay, revealDuration, onRevealComplete]);

  return { isRevealing, revealCards };
}
