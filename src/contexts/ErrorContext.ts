import { createContext } from 'react';

import type { AppError } from '@/types/api';

interface ErrorContextType {
  error: AppError | null;
  setError: (error: unknown, context?: string) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export default ErrorContext;
