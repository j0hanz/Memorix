import { createContext } from 'react';

import type { AppError } from '@/types/api';

interface ErrorContextType {
  error: AppError | null;
  setError: (error: unknown, context?: string) => void;
  clearError: () => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined,
);
