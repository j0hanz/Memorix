import { useState } from 'react';
import { PairedCard, generateCards } from '@/data/cardData';

// Custom hook to shuffle a list of cards
function shuffleCards<T>(cards: T[]): T[] {
  if (!Array.isArray(cards)) {
    throw new TypeError('Input must be an array');
  }
  if (cards.length === 0) return [];

  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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
    shuffleCards,
  };
}

export { shuffleCards };
