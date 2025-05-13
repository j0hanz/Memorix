import { useState } from 'react';

import ErrorContext from '@/contexts/ErrorContext';
import type { AppError } from '@/types/api';
import { createAppError, logError } from '@/utils/errorUtils';

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setAppError] = useState<AppError | null>(null);

  const setError = (err: unknown, context?: string) => {
    const appError =
      err instanceof Error
        ? createAppError(err.message, { details: err })
        : createAppError(String(err));

    logError(err, context);
    setAppError(appError);
  };

  const clearError = () => {
    setAppError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}
