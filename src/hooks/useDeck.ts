import { useState } from 'react';
import { generateCards } from '@/data/cardData';
import { shuffleCards } from '@/utils/deckUtils';
import { CATEGORIES } from '@/constants/constants';
import type { PairedCard } from '@/types/card';

export function useDeck(category = CATEGORIES.ANIMALS) {
  const [deck, setDeck] = useState<PairedCard[]>(() => {
    try {
      const cards = generateCards(category);
      return shuffleCards(cards);
    } catch (error) {
      console.error('Error generating or shuffling cards:', error);
      return [];
    }
  });

  function refreshDeck(newCategory?: string) {
    try {
      const cat = newCategory || category;
      const newDeck = shuffleCards(generateCards(cat));
      setDeck(newDeck);
    } catch (error) {
      console.error('Error refreshing deck:', error);
    }
  }

  return {
    deck,
    setDeck,
    refreshDeck,
  };
}
