import clsx from 'clsx';

import { CARD_STATUS, FEEDBACK } from '@/constants/game';
import { CSS_CLASSES } from '@/constants/styles';
import type { CardData, PairedCard } from '@/types/data';
import type { CSSModuleClasses } from '@/types/hooks';

// Existing card status manipulation functions
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

// New utility functions moved from useGame.ts
export function getCardAnimation(card?: CardData): string {
  if (!card) return 'hidden';
  if (card.status === CARD_STATUS.MATCHED) return 'matched';
  if (card.status === CARD_STATUS.ACTIVE) return 'active';
  return 'hidden';
}

export function getCardFrontAnimation(card?: CardData): string {
  if (!card) return 'initial';
  if (card.status === CARD_STATUS.MATCHED) return 'matched';
  if (card.status === CARD_STATUS.ACTIVE) return 'flipped';
  return 'initial';
}

export function getCardStyleClasses(
  styles: CSSModuleClasses,
  card?: CardData,
  imageLoaded?: boolean,
  imageError?: boolean,
): string {
  return clsx(styles.card, {
    [styles[CSS_CLASSES.LOADING]]: !imageLoaded && !imageError,
    [styles[CSS_CLASSES.MATCHED]]: card?.status.includes(CARD_STATUS.MATCHED),
    [styles[CSS_CLASSES.ACTIVE]]: card?.status === CARD_STATUS.ACTIVE,
  });
}

export function getStatsTopClass(
  styles: CSSModuleClasses,
  feedback?: string,
): string {
  return clsx(styles.statsTop, {
    [styles.statsTopSuccess]: feedback === FEEDBACK.SUCCESS,
    [styles.statsTopError]: feedback === FEEDBACK.ERROR,
  });
}

export function isCardClickable(
  card?: CardData,
  index?: number,
  imageLoaded?: boolean,
  imageError?: boolean,
  isInitialReveal?: boolean,
  isProcessingMatch?: boolean,
): boolean {
  return !!(
    card &&
    typeof index === 'number' &&
    (imageLoaded || imageError) &&
    !isInitialReveal &&
    !card.status.includes(CARD_STATUS.MATCHED) &&
    !isProcessingMatch
  );
}
