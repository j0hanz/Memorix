import { CardDef } from '@/data/cardData';

// Function to apply status to specified cards
function applyCardStatus(
  cards: CardDef[],
  indices: number[],
  status: string,
): void {
  indices.forEach((index) => {
    if (cards[index]) {
      cards[index].status = status;
    }
  });
}

// Update card status based on match result
function updateCardStatus({
  cards,
  setCards,
  currentCardIndex,
  selectedCardIndex,
  isMatch,
  onMatch,
  onMismatch,
}: {
  cards: CardDef[];
  setCards: React.Dispatch<React.SetStateAction<CardDef[]>>;
  currentCardIndex: number;
  selectedCardIndex: number;
  isMatch: boolean;
  onMatch: () => void;
  onMismatch: () => void;
}): void {
  setTimeout(() => {
    if (isMatch) {
      onMatch();
    } else {
      applyCardStatus(cards, [currentCardIndex, selectedCardIndex], '');
      setCards([...cards]);
      onMismatch();
    }
  }, 500);
}

// Check if selected cards match
export function matchCheck(
  currentCardIndex: number,
  cards: CardDef[],
  setCards: React.Dispatch<React.SetStateAction<CardDef[]>>,
  selectedCardIndex: number,
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>,
  onMatch: () => void,
  onMismatch: () => void,
): boolean {
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

  applyCardStatus(
    updatedCards,
    [currentCardIndex, selectedCardIndex],
    isMatch ? 'active matched' : 'active',
  );

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
