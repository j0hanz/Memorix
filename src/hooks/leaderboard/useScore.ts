import { useEffect, useState } from 'react';

import { useServices } from '@/hooks/api/useServices';
import { useAuth } from '@/hooks/shared/useProvider';
import type { UserScore } from '@/types/services';

export function useScore() {
  const { user, isAuthenticated } = useAuth();
  const { game } = useServices();
  const [scores, setScores] = useState<UserScore[]>([]);
  const [scoresCount, setScoresCount] = useState(0);
  const [scoresPage, setScoresPage] = useState(1);
  const [loadingScores, setLoadingScores] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      if (user && isAuthenticated) {
        setLoadingScores(true);
        try {
          const data = await game.getUserScores(scoresPage);
          setScores(data.results);
          setScoresCount(data.count);
        } catch {
          // Silent fail
        } finally {
          setLoadingScores(false);
        }
      }
    };

    void fetchScores();
  }, [user, isAuthenticated, scoresPage, game]);

  return {
    scores,
    scoresCount,
    scoresPage,
    setScoresPage,
    loadingScores,
  };
}
