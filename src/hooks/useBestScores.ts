import { useEffect, useState } from 'react';

import { gameService } from '@/services/gameService';
import type { UserScore } from '@/types/api';

export function useBestScores() {
  const [bestScores, setBestScores] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    gameService
      .getUserBestScores()
      .then((data: UserScore[]) => {
        if (!controller.signal.aborted) {
          setBestScores(data);
        }
      })
      .catch((e: unknown) => {
        if (!controller.signal.aborted) {
          const msg = e instanceof Error ? e.message : String(e);
          console.error('Error fetching best scores:', e);
          setError(msg);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const categories: string[] = Array.from(
    new Set(bestScores.map((s) => s.category_name)),
  );

  return { bestScores, categories, loading, error };
}
