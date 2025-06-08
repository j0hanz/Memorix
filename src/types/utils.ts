import type { SoundKey } from '@/constants/sounds';

import type { CardDef } from './data';

// ============================================================================
// CALLBACK TYPES
// ============================================================================

export type VoidCallback = () => void;
export type ValueCallback<T> = (value: T) => void;

// ============================================================================
// ASYNC STATE INTERFACES
// ============================================================================

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface PaginatedData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ============================================================================
// SOUND INTERFACES
// ============================================================================

export type SoundMapType = Record<SoundKey, () => void>;

// ============================================================================
// CARD INTERACTION INTERFACES
// ============================================================================

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

// ============================================================================
// VALIDATION INTERFACES
// ============================================================================

export type ValidationRule = (
  value: string,
  formValues?: Record<string, string>,
) => string | null;

export type ValidationRules = Record<string, ValidationRule>;
