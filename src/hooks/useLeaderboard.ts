import { useEffect, useState } from 'react';

import { gameService } from '@/services/gameService';
import type { LeaderboardEntry } from '@/types/api';

export function useLeaderboard(categoryId?: number) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await gameService.getLeaderboard(categoryId);
        setLeaderboard(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    void fetchLeaderboard();
  }, [categoryId]);

  return { leaderboard, loading, error };
}
