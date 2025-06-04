import { useEffect, useState } from 'react';

import { useFetch } from '@/hooks/api/useFetch';
import { useServices } from '@/hooks/api/useServices';
import type { GameOptions } from '@/types/components';
import type { LeaderboardEntry } from '@/types/services';
import { getCategoryOptions } from '@/utils/game/categoryUtils';

export function useLeaderboard(initialCategoryId?: number) {
  const { game } = useServices();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(initialCategoryId);
  const [categories, setCategories] = useState<GameOptions[]>([]);

  // Fetch leaderboard data
  const {
    data: leaderboardData,
    loading,
    error,
    refetch,
  } = useFetch<LeaderboardEntry[]>(
    async () => {
      return await game.getLeaderboard(selectedCategoryId);
    },
    {
      errorCategory: 'api',
      showToastOnError: true,
    },
  );

  const leaderboard = leaderboardData || [];

  // Set up categories on mount
  useEffect(() => {
    const categoryOptions = getCategoryOptions();
    setCategories(categoryOptions);

    if (!selectedCategoryId && categoryOptions.length > 0) {
      setSelectedCategoryId(categoryOptions[0].id);
    }
  }, [selectedCategoryId]);

  const handleCategoryChange = (categoryId: string) => {
    const numericId = parseInt(categoryId, 10);
    setSelectedCategoryId(numericId);
    refetch();
  };

  // Map categories to options
  const categoryOptions = categories.map((cat) => ({
    value: cat.id?.toString() || cat.value,
    label: cat.label,
  }));

  return {
    leaderboard,
    loading,
    error,
    categories,
    categoryOptions,
    selectedCategoryId,
    selectedCategory: selectedCategoryId,
    handleCategoryChange,
    refetch,
  };
}
