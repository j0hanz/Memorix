import { useState } from 'react';

import { useLeaderboard } from '@/hooks/useLeaderboard';
import { getCategoryOptions } from '@/utils/categoryUtils';

export function useLeaderboardData() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined,
  );
  const { leaderboard, loading, error } = useLeaderboard(selectedCategory);

  const categoryOptions = getCategoryOptions().map((cat) => ({
    value: cat.id.toString(),
    label: cat.label,
  }));

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value ? parseInt(value, 10) : undefined);
  };

  return {
    selectedCategory,
    leaderboard,
    loading,
    error,
    categoryOptions,
    handleCategoryChange,
  };
}
