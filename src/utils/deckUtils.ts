// Shuffle an array of cards to randomize their order.
export function shuffleCards<T>(cards: T[]): T[] {
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
