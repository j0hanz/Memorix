import { CardDef } from '@/data/cardData';

// Fisher-Yates shuffle algorithm
export function shuffleCards<T>(cards: T[]): T[] {
  if (!Array.isArray(cards)) {
    throw new TypeError('Input must be an array');
  }

  // Return empty array if no cards are provided
  if (cards.length === 0) return [];

  const shuffled = [...cards];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// Get a new deck of shuffled cards
export function getNewShuffledDeck(generateCards: () => CardDef[]): CardDef[] {
  return shuffleCards(generateCards());
}
