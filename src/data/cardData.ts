import { CATEGORIES, GAME_CONFIG } from '@/constants/constants';
import type { CardDef, PairedCard } from '@/types/card';

const IMAGE_PATHS = {
  [CATEGORIES.ANIMALS]: Array.from(
    { length: 6 },
    (_, i) => `/img/animals/${String(i + 1)}.gif`,
  ),
  [CATEGORIES.ASTRONOMY]: Array.from(
    { length: 6 },
    (_, i) => `/img/astronomy/${String(i + 1)}.gif`,
  ),
  [CATEGORIES.PATTERN]: Array.from(
    { length: 6 },
    (_, i) => `/img/pattern/${String(i + 1)}.gif`,
  ),
  [CATEGORIES.FOOD]: Array.from(
    { length: 6 },
    (_, i) => `/img/food/${String(i + 1)}.gif`,
  ),
};

export function generateCards(category = CATEGORIES.ANIMALS): PairedCard[] {
  const totalPairs: number = GAME_CONFIG.TOTAL_PAIRS;
  if (!totalPairs) return [];

  const imagePaths = IMAGE_PATHS[category];

  const baseCards = Array.from(
    { length: totalPairs },
    (_, i): CardDef => ({
      pairId: i,
      img: imagePaths[i],
      status: '',
      name: `Card ${String(i + 1)}`,
    }),
  );

  return baseCards.flatMap((card, idx) => [
    { ...card, id: idx * 2 },
    { ...card, id: idx * 2 + 1 },
  ]);
}

export type { PairedCard };
