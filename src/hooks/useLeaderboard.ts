import { useEffect, useState } from 'react';

import { gameService } from '@/services/gameService';
import type { LeaderboardEntry } from '@/types/api';

export function useLeaderboard(categoryId?: number) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const fetchLeaderboard = async () => {
      try {
        const data = await gameService.getLeaderboard(categoryId);
        if (!controller.signal.aborted) {
          setLeaderboard(data);
          setError(null);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error('Failed to fetch leaderboard:', err);
          setError('Failed to load leaderboard data');
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
  }, [categoryId]);

  return { leaderboard, loading, error };
}
