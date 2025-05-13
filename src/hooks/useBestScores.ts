import { useEffect, useState } from 'react';

import { useError } from '@/hooks/useError';
import { gameService } from '@/services/gameService';
import type { UserScore } from '@/types/api';
import { getUserFriendlyMessage, logError } from '@/utils/errorUtils';

export function useBestScores() {
  const [bestScores, setBestScores] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setError: setGlobalError } = useError();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const fetchScores = async () => {
      try {
        const data = await gameService.getUserBestScores();
        if (!controller.signal.aborted) {
          setBestScores(data);
        }
      } catch (e: unknown) {
        if (!controller.signal.aborted) {
          const friendlyMessage = getUserFriendlyMessage(e);
          setError(friendlyMessage);
          logError(e, 'BestScores', 'error');
          setGlobalError(e, 'BestScores');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    // Fix floating promise with void operator
    void fetchScores();

    return () => {
      controller.abort();
    };
  }, [setGlobalError]);

  const categories: string[] = Array.from(
    new Set(bestScores.map((s) => s.category_name)),
  );

  return { bestScores, categories, loading, error };
}
