import type { CardDef } from './data';

export type VoidCallback = () => void;
export type ValueCallback<T> = (value: T) => void;
export type AsyncCallback<T = void> = () => Promise<T>;

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface PaginationState {
  page: number;
  totalPages: number;
  count: number;
}

export interface PaginatedData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
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

export interface FormState<T = Record<string, string>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}
