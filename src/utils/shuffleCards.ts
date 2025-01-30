import { Card } from '../data/cardData';

export const shuffleCards = (cards: Card[]): Card[] => {
  if (!Array.isArray(cards)) {
    // Ensure input is an array
    throw new TypeError('Input must be an array');
  }
  // Return empty array if no cards are provided
  if (cards.length === 0) return [];

  const shuffled = [...cards];
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
