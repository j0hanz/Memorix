import { useEffect, useState } from 'react';

import { useLeaderboard } from '@/hooks/useLeaderboard';
import { getCategoryOptions } from '@/utils/categoryUtils';

export function useLeaderboardData() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined,
  );
  // Generate category options for the select input
  const categoryOptions = getCategoryOptions().map((cat) => ({
    value: cat.id.toString(),
    label: cat.label,
  }));
  // Set the default selected category to the first one in the list
  useEffect(() => {
    if (categoryOptions.length > 0 && selectedCategory === undefined) {
      setSelectedCategory(parseInt(categoryOptions[0].value, 10));
    }
  }, [categoryOptions, selectedCategory]);

  const { leaderboard, loading, error } = useLeaderboard(selectedCategory);

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
