import { matchCheck } from "./matchCheck";
import { playSound } from "./soundManager";
import { CardDef } from "../data/cardData";

// Check if a card can be clicked
export function canClickCard(
  index: number,
  cards: CardDef[],
  selectedCardIndex: number | null,
  previousIndex: React.MutableRefObject<number | null>,
): boolean {
  return (
    index !== previousIndex.current &&
    index !== selectedCardIndex &&
    cards[index] &&
    cards[index].status !== "active matched"
  );
}

// Handle the logic when a card is clicked
export function handleCardClick(
  index: number,
  cards: CardDef[],
  setCards: React.Dispatch<React.SetStateAction<CardDef[]>>,
  selectedCardIndex: number | null,
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>,
  previousIndex: React.MutableRefObject<number | null>,
  handleMatchUpdate: () => void,
  handleMismatchUpdate: () => void,
  setFeedback: React.Dispatch<React.SetStateAction<string>>,
  setMoves: React.Dispatch<React.SetStateAction<number>>,
): void {
  if (!canClickCard(index, cards, selectedCardIndex, previousIndex)) {
    return;
  }

  const newCards = [...cards];

  if (selectedCardIndex === null) {
    // First card selected
    previousIndex.current = index;
    newCards[index].status = "active";
    setCards(newCards);
    setSelectedCardIndex(index);
    playSound("click");
    return;
  }

  // Check match
  const isMatch = matchCheck(
    index,
    newCards,
    setCards,
    selectedCardIndex,
    setSelectedCardIndex,
    handleMatchUpdate,
    handleMismatchUpdate,
  );

  playSound(isMatch ? "correct" : "wrong");
  setFeedback(isMatch ? "success" : "error");
  previousIndex.current = null;
  setMoves((prev) => prev + 1);
}
