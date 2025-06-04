import { useEffect, useState } from 'react';

import { CATEGORIES } from '@/constants/game';
import { generateCards } from '@/data/cardData';
import type { PairedCard } from '@/types/data';
import { shuffleCards } from '@/utils/game/deckUtils';

export function useDeck(category = CATEGORIES.ANIMALS) {
  const [deck, setDeck] = useState<PairedCard[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Generate and shuffle deck when category changes
  useEffect(() => {
    try {
      const cards = generateCards(category);
      setDeck(shuffleCards(cards));
      setError(null);
    } catch (err: unknown) {
      console.error('Error generating or shuffling cards:', err);
      setError(err instanceof Error ? err.message : String(err));
      setDeck([]);
    }
  }, [category]);

  function refreshDeck(newCategory?: string) {
    try {
      const cat = newCategory || category;
      const cards = generateCards(cat);
      setDeck(shuffleCards(cards));
      setError(null);
    } catch (err: unknown) {
      console.error('Error refreshing deck:', err);
      setError(err instanceof Error ? err.message : String(err));
      setDeck([]);
    }
  }

  return {
    deck,
    error,
    refreshDeck,
  };
}
