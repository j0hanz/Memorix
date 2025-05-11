import { CARD_STATUS } from '@/constants/constants';
import type { PairedCard } from '@/types/card';

export type CardState = '' | 'active' | 'active matched';

export const CARD_STATE: {
  Default: CardState;
  Active: CardState;
  Matched: CardState;
} = {
  Default: '',
  Active: 'active',
  Matched: 'active matched',
};

export function setCardStatus(
  cards: PairedCard[],
  index: number,
  status: string,
): PairedCard[] {
  if (index < 0 || index >= cards.length) return cards;
  const updated = [...cards];
  updated[index] = { ...updated[index], status };
  return updated;
}

export function setMultipleCardStatus(
  cards: PairedCard[],
  indexes: number[],
  status: string,
): PairedCard[] {
  const updated = [...cards];
  indexes.forEach((i) => {
    if (i >= 0 && i < updated.length) {
      updated[i] = { ...updated[i], status };
    }
  });
  return updated;
}

export function setAllCardsStatus(
  cards: PairedCard[],
  status: string,
): PairedCard[] {
  return cards.map((card) => ({ ...card, status }));
}

export function isCardMatched(card: PairedCard): boolean {
  return card.status.includes(CARD_STATUS.MATCHED);
}

export function isCardActive(card: PairedCard): boolean {
  return card.status === CARD_STATUS.ACTIVE;
}
