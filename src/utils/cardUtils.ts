import { matchCheck } from './matchCheck';
import { playSound } from './soundManager';
import { CardDef } from '@/data/cardData';
import { FEEDBACK } from '@/utils/constants';

interface CardClickParams {
  index: number;
  cards: CardDef[];
  setCards: React.Dispatch<React.SetStateAction<CardDef[]>>;
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
export function canClickCard(
  index: number,
  cards: CardDef[],
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
export function handleCardClick({
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
}: CardClickParams): void {
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
