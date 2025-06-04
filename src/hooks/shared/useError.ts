import { useState } from 'react';

import type { AppError } from '@/types/services';
import { createAppError, logError } from '@/utils/errorUtils';

// Error state handler
export function useErrorHandler() {
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

  return {
    error,
    setError,
    clearError,
  };
}
