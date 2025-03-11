import { useState, useRef } from 'react';
import { CardDef } from '@/data/cardData';
import { CARD_STATUS, FEEDBACK, SOUNDS } from '@/utils/constants';
import { useSoundEffects } from './useSound';
import { updateCardStatus, updateMultipleCardStatus } from '@/utils/cardUtils';

// Custom hook to handle card interactions and matching logic
export function useCardInteraction<T extends CardDef>(options: {
  onMatch?: () => void;
  onMismatch?: () => void;
  cardFlipDelay?: number;
}) {
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

  // Handle selecting the first card
  function handleFirstCardSelection(index: number) {
    try {
      previousIndex.current = index;
      setCards((prev) => updateCardStatus(prev, index, CARD_STATUS.ACTIVE));
      setSelectedCardIndex(index);
      playSound(SOUNDS.CLICK);
    } catch (error) {
      console.error('Error handling first card selection:', error);
    }
  }

  // Process the match result after the appropriate delay
  function processMatchResult(index: number, isMatch: boolean) {
    setTimeout(() => {
      try {
        const status = isMatch ? CARD_STATUS.MATCHED : CARD_STATUS.DEFAULT;
        setCards((prev) =>
          updateMultipleCardStatus(
            prev,
            [index, selectedCardIndex as number],
            status,
          ),
        );

        // Execute callback based on match result
        if (isMatch) {
          try {
            onMatch?.();
          } catch (err) {
            console.error('Error in onMatch callback:', err);
          }
        } else {
          try {
            onMismatch?.();
          } catch (err) {
            console.error('Error in onMismatch callback:', err);
          }
        }

        setIsProcessingMatch(false);
      } catch (error) {
        console.error('Error processing card match in timeout:', error);
        setIsProcessingMatch(false);
      }
    }, cardFlipDelay);
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
      handleFirstCardSelection(index);
      return;
    }

    // Second card selection - prevent further clicks during matching process
    try {
      setIsProcessingMatch(true);

      // Check if cards match
      const currentCard = cards[index];
      const selectedCard = cards[selectedCardIndex];
      const isMatch = currentCard.pairId === selectedCard.pairId;

      // Set current card to active state
      setCards((prev) => updateCardStatus(prev, index, CARD_STATUS.ACTIVE));

      // Process match result after delay
      processMatchResult(index, isMatch);

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
