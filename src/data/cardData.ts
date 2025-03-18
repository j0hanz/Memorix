import { GAME_CONFIG, CATEGORIES } from '@/constants/constants';
import { shuffleCards } from '@/utils/deckUtils';
import { CardDef, PairedCard } from '@/types/card';

// Image paths for each category
const IMAGE_PATHS = {
  [CATEGORIES.ANIMALS]: Array.from(
    { length: 6 },
    (_, i) => `/img/animals/${i + 1}.gif`,
  ),
  [CATEGORIES.ASTRONOMY]: Array.from(
    { length: 6 },
    (_, i) => `/img/astronomy/${i + 1}.gif`,
  ),
  [CATEGORIES.PATTERN]: Array.from(
    { length: 6 },
    (_, i) => `/img/pattern/${i + 1}.gif`,
  ),
  [CATEGORIES.SUSHI]: Array.from(
    { length: 6 },
    (_, i) => `/img/sushi/${i + 1}.gif`,
  ),
};

// Generate a deck of paired cards based on the selected category
export function generateCards(category = CATEGORIES.ANIMALS): PairedCard[] {
  const totalPairs: number = GAME_CONFIG.TOTAL_PAIRS;
  if (!totalPairs) return [];

  const imagePaths = IMAGE_PATHS[category];

  // Generate base cards with pair IDs
  const baseCards = Array.from(
    { length: totalPairs },
    (_, i): CardDef => ({
      pairId: i,
      img: imagePaths[i],
      status: '',
      name: `Card ${i + 1}`,
    }),
  );

  // Pair cards by duplicating each card with a unique ID
  return baseCards.flatMap((card, idx) => [
    { ...card, id: idx * 2 },
    { ...card, id: idx * 2 + 1 },
  ]);
}

// Get a new deck of shuffled cards
export function getNewShuffledDeck(
  category = CATEGORIES.ANIMALS,
): PairedCard[] {
  return shuffleCards(generateCards(category));
}

export type { PairedCard };
