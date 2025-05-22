import { CATEGORIES, GAME_CONFIG } from '@/constants/constants';
import type { CardDef, PairedCard } from '@/types/data';

const IMAGE_PATHS = {
  [CATEGORIES.ANIMALS]: Array.from(
    { length: 6 },
    (_, i) => `/img/animals/${String(i + 1)}.webp`,
  ),
  [CATEGORIES.NATURE]: Array.from(
    { length: 6 },
    (_, i) => `/img/nature/${String(i + 1)}.webp`,
  ),
  [CATEGORIES.VEHICLES]: Array.from(
    { length: 6 },
    (_, i) => `/img/vehicles/${String(i + 1)}.webp`,
  ),
  [CATEGORIES.FOOD]: Array.from(
    { length: 6 },
    (_, i) => `/img/food/${String(i + 1)}.webp`,
  ),
  [CATEGORIES.SHAPES]: Array.from(
    { length: 6 },
    (_, i) => `/img/shapes/${String(i + 1)}.webp`,
  ),
  [CATEGORIES.NUMBERS]: Array.from(
    { length: 6 },
    (_, i) => `/img/numbers/${String(i + 1)}.webp`,
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
