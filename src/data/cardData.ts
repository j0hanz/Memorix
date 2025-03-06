import img01 from '@/assets/img/01.gif';
import img02 from '@/assets/img/02.gif';
import img03 from '@/assets/img/03.gif';
import img04 from '@/assets/img/04.gif';
import img05 from '@/assets/img/05.gif';
import img06 from '@/assets/img/06.gif';

const imageAssets: string[] = [img01, img02, img03, img04, img05, img06];

export interface CardDef {
  pairId: number;
  img: string;
  status: string;
  name: string;
}

interface PairedCard extends CardDef {
  id: number;
}

function createPairedCards(defs: CardDef[]): PairedCard[] {
  return defs.flatMap((def, index) => [
    { ...def, id: index * 2 },
    { ...def, id: index * 2 + 1 },
  ]);
}

export const initialCards: PairedCard[] = createPairedCards([
  { pairId: 0, img: img01, status: '', name: 'Card 1' },
  { pairId: 1, img: img02, status: '', name: 'Card 2' },
  { pairId: 2, img: img03, status: '', name: 'Card 3' },
  { pairId: 3, img: img04, status: '', name: 'Card 4' },
  { pairId: 4, img: img05, status: '', name: 'Card 5' },
  { pairId: 5, img: img06, status: '', name: 'Card 6' },
]);

export function generateCards(): PairedCard[] {
  const totalPairs: number = 6;

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

  const pairedCards = baseCards.flatMap((card, idx) => [
    { ...card, id: idx * 2 },
    { ...card, id: idx * 2 + 1 },
  ]);

  return pairedCards;
}
