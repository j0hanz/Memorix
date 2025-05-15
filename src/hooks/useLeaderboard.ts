import { useCallback } from 'react';

import { useFetch } from '@/hooks/useFetch';
import { gameService } from '@/services/gameService';
import type { LeaderboardEntry } from '@/types/api';

export function useLeaderboard(categoryId?: number) {
  const fetchLeaderboard = useCallback(
    async () => await gameService.getLeaderboard(categoryId),
    [categoryId],
  );

  const { data, loading, error } = useFetch<LeaderboardEntry[]>(
    fetchLeaderboard,
    {
      errorCategory: 'api',
    },
  );

  return {
    leaderboard: data || [],
    loading,
    error,
  };
}
