import { useEffect, useState } from 'react';

import { useFetch } from '@/hooks/api/useFetch';
import { useServices } from '@/hooks/api/useServices';
import type { GameOptions } from '@/types/components';
import type { LeaderboardEntry } from '@/types/services';
import { getCategoryOptions } from '@/utils/game/categoryUtils';

export function useLeaderboard(initialCategoryCode?: string) {
  const { game } = useServices();
  const [selectedCategoryCode, setSelectedCategoryCode] = useState<
    string | undefined
  >(initialCategoryCode);
  const [categories, setCategories] = useState<GameOptions[]>([]);

  // Fetch leaderboard data
  const {
    data: leaderboardData,
    loading,
    error,
    refetch,
  } = useFetch<LeaderboardEntry[]>(
    async () => {
      return await game.getLeaderboard(selectedCategoryCode);
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

    if (!selectedCategoryCode && categoryOptions.length > 0) {
      setSelectedCategoryCode(categoryOptions[0].value);
    }
  }, [selectedCategoryCode]);

  const handleCategoryChange = (categoryCode: string) => {
    setSelectedCategoryCode(categoryCode);
    refetch();
  };

  // Map categories to options
  const categoryOptions = categories.map((cat) => ({
    value: cat.value,
    label: cat.label,
  }));

  return {
    leaderboard,
    loading,
    error,
    categories,
    categoryOptions,
    selectedCategoryCode,
    selectedCategory: selectedCategoryCode,
    handleCategoryChange,
    refetch,
  };
}
