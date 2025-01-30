import { useCallback, useEffect } from 'react';
import { handleCardClick } from '@/utils/cardUtils';
import { CardDef } from '@/data/cardData';

interface UseGameLogicProps {
  cards: CardDef[];
  setCards: React.Dispatch<React.SetStateAction<CardDef[]>>;
  selectedCardIndex: number | null;
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>;
  matchedPairs: number;
  setMatchedPairs: React.Dispatch<React.SetStateAction<number>>;
  previousIndex: React.MutableRefObject<number | null>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
}

// Custom hook to manage game logic
export function useGameLogic({
  cards,
  setCards,
  selectedCardIndex,
  setSelectedCardIndex,
  matchedPairs,
  setMatchedPairs,
  previousIndex,
  setIsGameOver,
  setMoves,
  setFeedback,
}: UseGameLogicProps) {
  const totalPairs = 6;

  // Function to handle card selection
  const handleCardSelection = useCallback(
    (index: number) => {
      handleCardClick(
        index,
        cards,
        setCards,
        selectedCardIndex,
        setSelectedCardIndex,
        previousIndex,
        () => setMatchedPairs((prev) => prev + 1),
        () => {},
        setFeedback,
        setMoves,
      );
    },
    [
      cards,
      selectedCardIndex,
      setCards,
      setSelectedCardIndex,
      previousIndex,
      setMatchedPairs,
      setFeedback,
      setMoves,
    ],
  );

  useEffect(() => {
    if (matchedPairs === totalPairs) {
      setIsGameOver(true);
    }
  }, [matchedPairs, totalPairs, setIsGameOver]);

  return {
    handleCardSelection,
  };
}
