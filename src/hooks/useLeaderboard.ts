import { useFetch } from '@/hooks/useFetch';
import { gameService } from '@/services/gameService';
import type { LeaderboardEntry } from '@/types/api';

export function useLeaderboard(categoryId?: number) {
  const { data, loading, error } = useFetch<LeaderboardEntry[]>(
    async () => {
      return await gameService.getLeaderboard(categoryId);
    },
    {
      errorCategory: 'Leaderboard',
      dependencies: [categoryId],
    },
  );

  return {
    leaderboard: data || [],
    loading,
    error,
  };
}
