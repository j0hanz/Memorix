import { useState, useRef } from 'react';
import { CardDef, CardInteractionOptions } from '@/types/card';
import { CARD_STATUS, FEEDBACK, SOUNDS } from '@/constants/constants';
import { useSoundEffects } from './useSound';

// Custom hook to handle card interactions and matching logic
export function useCardInteraction<T extends CardDef>(
  options: CardInteractionOptions<T>,
) {
  const [cards, setCards] = useState<T[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );
  const [isProcessingMatch, setIsProcessingMatch] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [moves, setMoves] = useState(0);
  const previousIndex = useRef<number | null>(null);

  const { playSound } = useSoundEffects();
  const { onMatch, onMismatch, cardFlipDelay = 500 } = options;

  // Process card match after delay and update state
  function processCardMatch(
    index: number,
    selectedCardIndex: number,
    isMatch: boolean,
  ) {
    try {
      const status = isMatch ? CARD_STATUS.MATCHED : CARD_STATUS.DEFAULT;
      setCards((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], status };
        updated[selectedCardIndex] = {
          ...updated[selectedCardIndex],
          status,
        };
        return updated;
      });
      // Execute callbacks based on match result
      if (isMatch) {
        try {
          onMatch?.();
        } catch (callbackError) {
          console.error('Error in onMatch callback:', callbackError);
        }
      } else {
        try {
          onMismatch?.();
        } catch (callbackError) {
          console.error('Error in onMismatch callback:', callbackError);
        }
      }
      setIsProcessingMatch(false);
    } catch (timerError) {
      console.error('Error processing card match in timeout:', timerError);
      setIsProcessingMatch(false);
    }
  }

  function handleCardClick(index: number, isInitialReveal = false) {
    // Skip if card cannot be clicked
    if (
      isInitialReveal ||
      isProcessingMatch ||
      index === previousIndex.current ||
      index === selectedCardIndex ||
      !cards[index] ||
      cards[index].status.includes('matched')
    ) {
      return;
    }

    // First card selection
    if (selectedCardIndex === null) {
      try {
        previousIndex.current = index;
        setCards((prev) => {
          const updated = [...prev];
          updated[index] = { ...updated[index], status: CARD_STATUS.ACTIVE };
          return updated;
        });
        setSelectedCardIndex(index);
        playSound(SOUNDS.CLICK);
      } catch (error) {
        console.error('Error handling first card selection:', error);
      }
      return;
    }

    // Prevent further clicks during matching process
    try {
      setIsProcessingMatch(true);
      // Check if cards match
      const currentCard = cards[index];
      const selectedCard = cards[selectedCardIndex];
      const isMatch = currentCard.pairId === selectedCard.pairId;

      // Set current card to active state
      setCards((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], status: CARD_STATUS.ACTIVE };
        return updated;
      });

      // Update both cards after delay
      setTimeout(() => {
        processCardMatch(index, selectedCardIndex, isMatch);
      }, cardFlipDelay);

      // Play sound and update feedback
      try {
        playSound(isMatch ? SOUNDS.CORRECT : SOUNDS.WRONG);
      } catch (soundError) {
        console.error('Error playing match sound:', soundError);
      }
      setFeedback(isMatch ? FEEDBACK.SUCCESS : FEEDBACK.ERROR);

      // Reset selection state and update move count
      setSelectedCardIndex(null);
      previousIndex.current = null;
      setMoves((prev) => prev + 1);
    } catch (error) {
      console.error('Error handling second card selection:', error);
      setIsProcessingMatch(false);
    }
  }

  return {
    cards,
    setCards,
    selectedCardIndex,
    setSelectedCardIndex,
    feedback,
    moves,
    handleCardClick,
    resetState: () => {
      try {
        setSelectedCardIndex(null);
        setFeedback('');
        setMoves(0);
        setIsProcessingMatch(false);
        previousIndex.current = null;
      } catch (error) {
        console.error('Error resetting card interaction state:', error);
      }
    },
  };
}
