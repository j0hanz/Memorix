import { useState, useRef, useCallback } from 'react';
import { CardDef } from '@/data/cardData';
import { CARD_STATUS, FEEDBACK, SOUNDS } from '@/utils/constants';
import { useSoundEffects } from './useSound';

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

  const handleCardClick = useCallback(
    (index: number, isInitialReveal = false) => {
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
        previousIndex.current = index;
        setCards((prev) => {
          const updated = [...prev];
          updated[index] = { ...updated[index], status: CARD_STATUS.ACTIVE };
          return updated;
        });
        setSelectedCardIndex(index);
        playSound(SOUNDS.CLICK);
        return;
      }

      // Prevent further clicks during matching process
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

        if (isMatch) {
          onMatch?.();
        } else {
          onMismatch?.();
        }
        setIsProcessingMatch(false);
      }, cardFlipDelay);

      // Play sound and update feedback
      playSound(isMatch ? SOUNDS.CORRECT : SOUNDS.WRONG);
      setFeedback(isMatch ? FEEDBACK.SUCCESS : FEEDBACK.ERROR);

      // Reset selection state
      setSelectedCardIndex(null);
      previousIndex.current = null;
      setMoves((prev) => prev + 1);
    },
    [
      cards,
      selectedCardIndex,
      isProcessingMatch,
      onMatch,
      onMismatch,
      cardFlipDelay,
      playSound,
    ],
  );

  return {
    cards,
    setCards,
    selectedCardIndex,
    setSelectedCardIndex,
    feedback,
    moves,
    handleCardClick,
    resetState: () => {
      setSelectedCardIndex(null);
      setFeedback('');
      setMoves(0);
      setIsProcessingMatch(false);
      previousIndex.current = null;
    },
  };
}
