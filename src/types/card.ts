import { ReactNode } from 'react';

export interface CardDef {
  pairId: number;
  img: string;
  status: string;
  name: string;
}

export interface PairedCard extends CardDef {
  id: number;
}

export interface CardData {
  img: string;
  name: string;
  status: string;
}

export interface GameCardProps {
  card: CardData;
  index: number;
  clickHandler?: (index: number) => void;
}

export interface CardProps {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  role?: string;
  ariaLabel?: string;
  ariaSelected?: boolean;
  ariaHidden?: boolean;
  disabled?: boolean;
}

export interface CardInteractionOptions<T extends CardDef> {
  onMatch?: (matchedCards?: T[]) => void;
  onMismatch?: (unmatchedCards?: T[]) => void;
  cardFlipDelay?: number;
  cards?: T[];
}

export interface CardRevealOptions {
  initialDelay?: number;
  revealDuration?: number;
  onRevealComplete?: () => void;
}
