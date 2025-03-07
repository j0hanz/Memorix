import { CardDef } from '@/data/cardData';
import { GAME_CONFIG, CARD_STATUS } from '@/utils/constants';

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

interface UpdateCardStatusParams {
  cards: CardDef[];
  setCards: React.Dispatch<React.SetStateAction<CardDef[]>>;
  currentCardIndex: number;
  selectedCardIndex: number;
  isMatch: boolean;
  onMatch: () => void;
  onMismatch: () => void;
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
}: UpdateCardStatusParams): void {
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

interface MatchCheckParams {
  currentCardIndex: number;
  cards: CardDef[];
  setCards: React.Dispatch<React.SetStateAction<CardDef[]>>;
  selectedCardIndex: number;
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onMatch: () => void;
  onMismatch: () => void;
}

// Check if selected cards match
export function matchCheck({
  currentCardIndex,
  cards,
  setCards,
  selectedCardIndex,
  setSelectedCardIndex,
  onMatch,
  onMismatch,
}: MatchCheckParams): boolean {
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
