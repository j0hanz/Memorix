import { useEffect, useState } from 'react';

import { useError } from '@/hooks/useError';
import { gameService } from '@/services/gameService';
import type { LeaderboardEntry } from '@/types/api';
import { getUserFriendlyMessage, logError } from '@/utils/errorUtils';

export function useLeaderboard(categoryId?: number) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setError: setGlobalError } = useError();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const fetchLeaderboard = async () => {
      try {
        const data = await gameService.getLeaderboard(categoryId);
        if (!controller.signal.aborted) {
          setLeaderboard(data);
          setError(null);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          const friendlyMessage = getUserFriendlyMessage(err);
          setError(friendlyMessage);
          logError(err, 'Leaderboard', 'error');
          setGlobalError(err, 'Leaderboard');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchLeaderboard();

    return () => {
      controller.abort();
    };
  }, [categoryId, setGlobalError]);

  return { leaderboard, loading, error };
}
