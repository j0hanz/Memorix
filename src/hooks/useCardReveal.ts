import { useState, useEffect, useRef } from 'react';
import { CARD_STATUS } from '@/constants/constants';
import { updateAllCardsStatus } from '@/utils/cardUtils';

export function useCardReveal<T extends { status: string }>(
  _cards: T[],
  setCards: React.Dispatch<React.SetStateAction<T[]>>,
  options: {
    initialDelay?: number;
    revealDuration?: number;
    onRevealComplete?: () => void;
  } = {},
) {
  const [isRevealing, setIsRevealing] = useState(false);
  const revealTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const {
    initialDelay = 500,
    revealDuration = 3000,
    onRevealComplete,
  } = options;

  // Cleanup timers on component unmount
  useEffect(() => {
    return () => {
      if (revealTimerRef.current !== null) {
        clearTimeout(revealTimerRef.current);
      }
      if (hideTimerRef.current !== null) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  function revealCards() {
    // Clear any existing timers before starting new ones
    if (revealTimerRef.current !== null) {
      clearTimeout(revealTimerRef.current);
    }
    if (hideTimerRef.current !== null) {
      clearTimeout(hideTimerRef.current);
    }

    setIsRevealing(true);

    revealTimerRef.current = window.setTimeout(() => {
      try {
        setCards((prev) => updateAllCardsStatus(prev, CARD_STATUS.ACTIVE));
      } catch (error) {
        console.error('Error revealing cards (setting ACTIVE status):', error);
      }

      hideTimerRef.current = window.setTimeout(() => {
        try {
          setCards((prev) => updateAllCardsStatus(prev, CARD_STATUS.DEFAULT));
          setIsRevealing(false);
          if (onRevealComplete) {
            onRevealComplete();
          }
        } catch (error) {
          console.error('Error hiding cards (resetting to DEFAULT):', error);
        }
      }, revealDuration);
    }, initialDelay);
  }

  return { isRevealing, revealCards };
}
