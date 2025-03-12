import img01 from '@/assets/img/01.gif';
import img02 from '@/assets/img/02.gif';
import img03 from '@/assets/img/03.gif';
import img04 from '@/assets/img/04.gif';
import img05 from '@/assets/img/05.gif';
import img06 from '@/assets/img/06.gif';
import { GAME_CONFIG } from '@/constants/constants';
import { shuffleCards } from '@/utils/deckUtils';
import { CardDef, PairedCard } from '@/types/card';

const imageAssets: string[] = [img01, img02, img03, img04, img05, img06];

// Generate paired cards based on the total pairs
export function generateCards(): PairedCard[] {
  const totalPairs: number = GAME_CONFIG.TOTAL_PAIRS;
  if (!totalPairs) return [];

  // Generate base cards with pair IDs
  const baseCards = Array.from(
    { length: totalPairs },
    (_, i): CardDef => ({
      pairId: i,
      img: imageAssets[i],
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
export function getNewShuffledDeck(): PairedCard[] {
  return shuffleCards(generateCards());
}

export type { PairedCard };
