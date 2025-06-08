import { useEffect } from 'react';

import { logError } from '@/utils/shared/errorUtils';

export function useErrorLogging(error: unknown, context?: string) {
  useEffect(() => {
    logError(error, context || 'ErrorBoundary', 'error');
  }, [error, context]);
}
