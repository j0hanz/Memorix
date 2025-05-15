import { useCallback, useEffect, useState } from 'react';

import { useError, useToast } from '@/hooks/useProvider';
import type { ErrorCategory, ErrorSeverity } from '@/types/api';
import { getUserFriendlyMessage, logError } from '@/utils/errorUtils';

type FetcherOptions<T> = {
  onSuccess?: (data: T) => void;
  showToastOnError?: boolean;
  errorCategory?: string;
  errorSeverity?: ErrorSeverity;
  dependencies?: unknown[];
};

export function useFetch<T>(
  fetcher: (controller: AbortController) => Promise<T>,
  options: FetcherOptions<T> = {},
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setError: setGlobalError } = useError();
  const { showToast } = useToast();

  const {
    onSuccess,
    showToastOnError = false,
    errorCategory = 'api',
    errorSeverity = 'error',
    dependencies = [],
  } = options;

  const fetchWithDependencies = useCallback(
    async (controller: AbortController) => {
      try {
        const result = await fetcher(controller);
        if (!controller.signal.aborted) {
          setData(result);
          setError(null);
          if (onSuccess) onSuccess(result);
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          const friendly = getUserFriendlyMessage(err);
          setError(friendly);
          if (showToastOnError) showToast(friendly);
          logError(err, errorCategory as ErrorCategory, errorSeverity);
          setGlobalError(err, errorCategory as ErrorCategory);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [
      fetcher,
      onSuccess,
      showToastOnError,
      showToast,
      errorCategory,
      errorSeverity,
      setGlobalError,
    ],
  );

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    void fetchWithDependencies(controller);
    return () => {
      controller.abort();
    };
  }, [fetchWithDependencies, dependencies]);

  return { data, loading, error, setData };
}
