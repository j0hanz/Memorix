import { useEffect, useState } from 'react';

import { gameService } from '@/services/gameService';
import type { UserScore } from '@/types/api';

export function useBestScores() {
  const [bestScores, setBestScores] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    gameService
      .getUserBestScores()
      .then((data: UserScore[]) => {
        if (mounted) {
          setBestScores(data);
        }
      })
      .catch((e: unknown) => {
        console.error('Error fetching best scores:', e);
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const categories: string[] = Array.from(
    new Set(bestScores.map((s) => s.category_name)),
  );

  return { bestScores, categories, loading };
}
