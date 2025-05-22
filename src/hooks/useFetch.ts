import { useEffect, useRef, useState } from 'react';

import { useError, useToast } from '@/hooks/useProvider';
import type { ErrorCategory, ErrorSeverity } from '@/types/services';
import { getUserFriendlyMessage, logError } from '@/utils/errorUtils';

export type Fetcher<T> = (signal: AbortSignal) => Promise<T>;

export interface FetcherOptions<T> {
  onSuccess?: (data: T) => void;
  showToastOnError?: boolean;
  errorCategory?: ErrorCategory;
  errorSeverity?: ErrorSeverity;
  retryCount?: number;
  retryDelay?: number;
  skipFetch?: boolean;
  initialData?: T | null;
}

export function useFetch<T>(
  fetcher: Fetcher<T>,
  options: FetcherOptions<T> = {},
) {
  const {
    onSuccess,
    showToastOnError = false,
    errorCategory = 'api',
    errorSeverity = 'error',
    retryCount = 0,
    retryDelay = 1000,
    skipFetch = false,
    initialData = null,
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(!skipFetch);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const { setError: setGlobalError } = useError();
  const { showToast } = useToast();

  const refetch = () => {
    abortRef.current?.abort();
    setTrigger((t) => t + 1);
  };

  useEffect(() => {
    if (skipFetch && trigger === 0) {
      setLoading(false);
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchData = async (attempt: number): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcher(controller.signal);
        if (!controller.signal.aborted) {
          setData(result);
          onSuccess?.(result);
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          const friendly = getUserFriendlyMessage(err);
          setError(friendly);
          if (showToastOnError) showToast(friendly);
          logError(err, errorCategory, errorSeverity);
          setGlobalError(err, errorCategory);

          if (attempt < retryCount) {
            setTimeout(() => void fetchData(attempt + 1), retryDelay);
            return;
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchData(0);
    return () => {
      controller.abort();
    };
  }, [
    trigger,
    skipFetch,
    retryCount,
    retryDelay,
    fetcher,
    onSuccess,
    showToastOnError,
    errorCategory,
    errorSeverity,
    setGlobalError,
    showToast,
  ]);

  return { data, loading, error, setData, refetch };
}
