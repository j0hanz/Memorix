import { useFetch } from '@/hooks/useFetch';
import { gameService } from '@/services/gameService';
import type { UserScore } from '@/types/api';

export function useBestScores() {
  const { data, loading, error } = useFetch<UserScore[]>(
    async () => {
      return await gameService.getUserBestScores();
    },
    {
      errorCategory: 'BestScores',
      showToastOnError: true,
    },
  );

  const bestScores = data || [];

  // Extract unique category names from bestScores
  const categories: string[] = Array.from(
    new Set(bestScores.map((s) => s.category_name)),
  );

  return { bestScores, categories, loading, error };
}
