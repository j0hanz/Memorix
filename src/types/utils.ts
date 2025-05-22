import type { CardDef } from './data';

export interface TokenState {
  isRefreshing: boolean;
  subscribers: ((token: string) => void)[];
}

export interface DecodedToken {
  exp: number;
  [key: string]: unknown;
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
