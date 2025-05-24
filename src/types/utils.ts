import type { CardDef } from './data';

export type VoidCallback = () => void;
export type ValueCallback<T> = (value: T) => void;

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

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

export type ValidationRule = (
  value: string,
  formValues?: Record<string, string>,
) => string | null;
export type ValidationRules = Record<string, ValidationRule>;
