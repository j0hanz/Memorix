import { useState, useCallback } from 'react';
import { PairedCard, generateCards } from '@/data/cardData';
import { shuffleCards } from '@/utils/deckUtils';

export function useShuffledDeck() {
  // Generate and shuffle deck of cards
  const [deck, setDeck] = useState<PairedCard[]>(() =>
    shuffleCards(generateCards()),
  );

  // Refresh deck with new shuffled cards
  const refreshDeck = useCallback(() => {
    setDeck(shuffleCards(generateCards()));
  }, []);

  return { deck, setDeck, refreshDeck };
}
