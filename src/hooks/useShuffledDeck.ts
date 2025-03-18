import { useState } from 'react';
import { PairedCard, generateCards } from '@/data/cardData';
import { shuffleCards } from '@/utils/deckUtils';
import { CATEGORIES } from '@/constants/constants';

export function useShuffledDeck(category = CATEGORIES.ANIMALS) {
  // Generate and shuffle deck initially with the selected category
  const [deck, setDeck] = useState<PairedCard[]>(() => {
    try {
      const cards = generateCards(category);
      return shuffleCards(cards);
    } catch (error) {
      console.error(
        'Error generating or shuffling cards on initialization:',
        error,
      );
      return [];
    }
  });

  // Refresh deck with a new shuffle using the same category
  function refreshDeck() {
    try {
      const newDeck = shuffleCards(generateCards(category));
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
