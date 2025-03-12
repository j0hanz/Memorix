import { useState } from 'react';
import { PairedCard, generateCards } from '@/data/cardData';
import { shuffleCards } from '@/utils/deckUtils';

export function useShuffledDeck() {
  // Generate and shuffle deck initially
  const [deck, setDeck] = useState<PairedCard[]>(() => {
    try {
      const cards = generateCards();
      return shuffleCards(cards);
    } catch (error) {
      console.error(
        'Error generating or shuffling cards on initialization:',
        error,
      );
      return [];
    }
  });

  // Refresh deck with a new shuffle
  function refreshDeck() {
    try {
      const newDeck = shuffleCards(generateCards());
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
