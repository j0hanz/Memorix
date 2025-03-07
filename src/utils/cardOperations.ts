import { playSound } from './soundManager';
import { CardDef } from '@/data/cardData';
import { FEEDBACK, GAME_CONFIG, CARD_STATUS } from '@/utils/constants';

// Function to apply status to specified cards
function applyCardStatus<T extends CardDef>(
  cards: T[],
  indices: number[],
  status: string,
): void {
  indices.forEach((index) => {
    if (cards[index]) {
      cards[index].status = status;
    }
  });
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

// Update card status based on match result
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
    if (isMatch) {
      // Apply matched status to both cards
      applyCardStatus(
        cards,
        [currentCardIndex, selectedCardIndex],
        CARD_STATUS.MATCHED,
      );
      setCards([...cards]);
      onMatch();
    } else {
      applyCardStatus(
        cards,
        [currentCardIndex, selectedCardIndex],
        CARD_STATUS.DEFAULT,
      );
      setCards([...cards]);
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

// Check if selected cards match
export function matchCheck<T extends CardDef>({
  currentCardIndex,
  cards,
  setCards,
  selectedCardIndex,
  setSelectedCardIndex,
  onMatch,
  onMismatch,
}: MatchCheckParams<T>): boolean {
  if (
    currentCardIndex === selectedCardIndex ||
    !cards[currentCardIndex] ||
    !cards[selectedCardIndex]
  ) {
    console.error('Invalid card indices or card data');
    return false;
  }

  const updatedCards = [...cards];
  const currentCard = updatedCards[currentCardIndex];
  const selectedCard = updatedCards[selectedCardIndex];

  const isMatch = currentCard.pairId === selectedCard.pairId;

  // Apply active status to the current card being clicked
  updatedCards[currentCardIndex].status = CARD_STATUS.ACTIVE;
  setCards(updatedCards);
  updateCardStatus({
    cards: updatedCards,
    setCards,
    currentCardIndex,
    selectedCardIndex,
    isMatch,
    onMatch,
    onMismatch,
  });

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
}

// Check if a card can be clicked
export function canClickCard<T extends CardDef>(
  index: number,
  cards: T[],
  selectedCardIndex: number | null,
  previousIndex: React.RefObject<number | null>,
  isInitialReveal: boolean,
): boolean {
  return (
    !isInitialReveal &&
    index !== previousIndex.current &&
    index !== selectedCardIndex &&
    cards[index] &&
    !cards[index].status.includes('matched')
  );
}

// Handle the logic when a card is clicked
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
}: CardClickParams<T>): void {
  if (
    !canClickCard(
      index,
      cards,
      selectedCardIndex,
      previousIndex,
      isInitialReveal,
    )
  ) {
    return;
  }

  const newCards = [...cards];

  if (selectedCardIndex === null) {
    // First card selected
    previousIndex.current = index;
    newCards[index].status = 'active';
    setCards(newCards);
    setSelectedCardIndex(index);
    playSound('click');
    return;
  }

  // Check match
  const isMatch = matchCheck({
    currentCardIndex: index,
    cards: newCards,
    setCards,
    selectedCardIndex,
    setSelectedCardIndex,
    onMatch,
    onMismatch,
  });

  playSound(isMatch ? 'correct' : 'wrong');
  setFeedback(isMatch ? FEEDBACK.SUCCESS : FEEDBACK.ERROR);
  previousIndex.current = null;
  setMoves((prev) => prev + 1);
}
