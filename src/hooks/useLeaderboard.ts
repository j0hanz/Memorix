import { useEffect, useState } from 'react';

import { useFetch } from '@/hooks/useFetch';
import { gameService } from '@/services/gameService';
import type { LeaderboardEntry } from '@/types/api';
import type { GameOptions } from '@/types/components';
import { getCategoryOptions } from '@/utils/categoryUtils';

export function useLeaderboard(initialCategoryId?: number) {
  // State for tracking the selected category filter
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    initialCategoryId,
  );
  // State for storing category options
  const [categoryOptions, setCategoryOptions] = useState<GameOptions[]>([]);

  // Load category options on mount
  useEffect(() => {
    const options = getCategoryOptions().map((cat) => ({
      value: cat.id.toString(),
      label: cat.label,
    }));
    setCategoryOptions(options);
  }, []);

  // Set default category if none selected and options are available
  useEffect(() => {
    if (categoryOptions.length > 0 && selectedCategory === undefined) {
      setSelectedCategory(parseInt(categoryOptions[0].value, 10));
    }
  }, [categoryOptions, selectedCategory]);

  // Fetch leaderboard data based on selected category
  const { data, loading, error } = useFetch<LeaderboardEntry[]>(
    async () => await gameService.getLeaderboard(selectedCategory),
    {
      errorCategory: 'api',
      skipFetch:
        selectedCategory === undefined && initialCategoryId === undefined,
    },
  );

  // Handler for category selection change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value ? parseInt(value, 10) : undefined);
  };

  return {
    selectedCategory,
    leaderboard: data || [],
    loading,
    error,
    categoryOptions,
    handleCategoryChange,
  };
}
