import { playSound } from './soundManager';
import { CardDef } from '@/data/cardData';
import { FEEDBACK, GAME_CONFIG, CARD_STATUS, SOUNDS } from '@/utils/constants';

// Updates status for specified card indices
function applyCardStatus<T extends CardDef>(
  cards: T[],
  indices: number[],
  status: string,
): T[] {
  const indicesSet = new Set(indices);
  return cards.map((card, idx) =>
    indicesSet.has(idx) ? { ...card, status } : card,
  );
}

interface UpdateCardStatusParams<T extends CardDef> {
  cards: T[];
  setCards: React.Dispatch<React.SetStateAction<T[]>>;
  currentCardIndex: number;
  selectedCardIndex: number;
  isMatch: boolean;
  onMatch: () => void;
  onMismatch: () => void;
}

function updateCardStatus<T extends CardDef>({
  cards,
  setCards,
  currentCardIndex,
  selectedCardIndex,
  isMatch,
  onMatch,
  onMismatch,
}: UpdateCardStatusParams<T>): void {
  setTimeout(() => {
    // Update card status based on match result
    const status = isMatch ? CARD_STATUS.MATCHED : CARD_STATUS.DEFAULT;
    setCards(
      applyCardStatus(cards, [currentCardIndex, selectedCardIndex], status),
    );
    // Execute callback based on match result
    if (isMatch) {
      onMatch();
    } else {
      onMismatch();
    }
  }, GAME_CONFIG.CARD_FLIP_DELAY);
}

interface MatchCheckParams<T extends CardDef> {
  currentCardIndex: number;
  cards: T[];
  setCards: React.Dispatch<React.SetStateAction<T[]>>;
  selectedCardIndex: number;
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onMatch: () => void;
  onMismatch: () => void;
}

// Checks if two cards match and handles the result
export function matchCheck<T extends CardDef>({
  currentCardIndex,
  cards,
  setCards,
  selectedCardIndex,
  setSelectedCardIndex,
  onMatch,
  onMismatch,
}: MatchCheckParams<T>): boolean {
  // Validate card indices
  if (
    currentCardIndex === selectedCardIndex ||
    !cards[currentCardIndex] ||
    !cards[selectedCardIndex]
  ) {
    console.error('Invalid card indices or card data');
    return false;
  }
  // Retrieve card data
  const currentCard = cards[currentCardIndex];
  const selectedCard = cards[selectedCardIndex];
  // Check if cards share the same pairId
  const isMatch = currentCard.pairId === selectedCard.pairId;
  // Set current card to active state
  setCards((prev) => {
    const updated = [...prev];
    updated[currentCardIndex] = {
      ...updated[currentCardIndex],
      status: CARD_STATUS.ACTIVE,
    };
    return updated;
  });
  // Update both cards after delay
  updateCardStatus({
    cards,
    setCards,
    currentCardIndex,
    selectedCardIndex,
    isMatch,
    onMatch,
    onMismatch,
  });
  // Reset selected card index
  setSelectedCardIndex(null);
  return isMatch;
}

interface CardClickParams<T extends CardDef> {
  index: number;
  cards: T[];
  setCards: React.Dispatch<React.SetStateAction<T[]>>;
  selectedCardIndex: number | null;
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>;
  previousIndex: React.RefObject<number | null>;
  onMatch: () => void;
  onMismatch: () => void;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  isInitialReveal?: boolean;
  isProcessingMatch?: boolean;
  setIsProcessingMatch: React.Dispatch<React.SetStateAction<boolean>>;
}

// Determines if a card can be clicked based on game state
export function canClickCard<T extends CardDef>(
  index: number,
  cards: T[],
  selectedCardIndex: number | null,
  previousIndex: React.RefObject<number | null>,
  isInitialReveal: boolean,
  isProcessingMatch: boolean,
): boolean {
  return (
    !isInitialReveal &&
    !isProcessingMatch &&
    index !== previousIndex.current &&
    index !== selectedCardIndex &&
    cards[index] &&
    !cards[index].status.includes('matched')
  );
}

// Main card click handler for the memory game
export function handleCardClick<T extends CardDef>({
  index,
  cards,
  setCards,
  selectedCardIndex,
  setSelectedCardIndex,
  previousIndex,
  onMatch,
  onMismatch,
  setFeedback,
  setMoves,
  isInitialReveal = false,
  isProcessingMatch = false,
  setIsProcessingMatch,
}: CardClickParams<T>): void {
  // Skip if card cannot be clicked
  if (
    !canClickCard(
      index,
      cards,
      selectedCardIndex,
      previousIndex,
      isInitialReveal,
      isProcessingMatch,
    )
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

  // Check for match after second card selection
  const isMatch = matchCheck({
    currentCardIndex: index,
    cards,
    setCards,
    selectedCardIndex,
    setSelectedCardIndex,
    onMatch: () => {
      onMatch();
      setIsProcessingMatch(false);
    },
    onMismatch: () => {
      onMismatch();
      setIsProcessingMatch(false);
    },
  });

  // Play appropriate sound based on match result
  playSound(isMatch ? SOUNDS.CORRECT : SOUNDS.WRONG);
  // Update feedback message
  setFeedback(isMatch ? FEEDBACK.SUCCESS : FEEDBACK.ERROR);
  // Reset previous index reference
  previousIndex.current = null;
  // Increment move counter
  setMoves((prev) => prev + 1);
}
