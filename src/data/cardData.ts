import img01 from '@/assets/img/01.gif';
import img02 from '@/assets/img/02.gif';
import img03 from '@/assets/img/03.gif';
import img04 from '@/assets/img/04.gif';
import img05 from '@/assets/img/05.gif';
import img06 from '@/assets/img/06.gif';
import { GAME_CONFIG } from '@/utils/constants';
import { shuffleCards } from '@/utils/deckUtils';

const imageAssets: string[] = [img01, img02, img03, img04, img05, img06];

export interface CardDef {
  pairId: number;
  img: string;
  status: string;
  name: string;
}

export interface PairedCard extends CardDef {
  id: number;
}

// Generate paired cards
export function generateCards(): PairedCard[] {
  const totalPairs: number = GAME_CONFIG.TOTAL_PAIRS;

  if (!totalPairs) return [];

  const baseCards = Array.from(
    { length: totalPairs },
    (_, i): CardDef => ({
      pairId: i,
      img: imageAssets[i],
      status: '',
      name: `Card ${i + 1}`,
    }),
  );

  // Pair cards
  const pairedCards = baseCards.flatMap((card, idx) => [
    { ...card, id: idx * 2 },
    { ...card, id: idx * 2 + 1 },
  ]);

  return pairedCards;
}

// Get a new deck of shuffled cards
export function getNewShuffledDeck(): PairedCard[] {
  return shuffleCards(generateCards());
}
