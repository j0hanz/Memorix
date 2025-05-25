import { useEffect, useState } from 'react';

import { useFetch } from '@/hooks/useFetch';
import { useServices } from '@/hooks/useServices';
import type { GameOptions, UseGameHistoryProps } from '@/types/components';
import type { UserScore } from '@/types/services';
import { getCategoryOptions } from '@/utils/categoryUtils';

export function useGameHistory({
  scores = [],
  scoresCount,
  scoresPage,
  setScoresPage,
  loadingScores,
}: UseGameHistoryProps) {
  const { game } = useServices();
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [bestCategory, setBestCategory] = useState<string>('');
  const [allCats, setAllCats] = useState<GameOptions[]>([]);
  const [pageSize] = useState<number>(5);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [stablePlayedCategories, setStablePlayedCategories] = useState<
    GameOptions[]
  >([]);

  // Fetch user best scores
  const { data: bestScoresData, loading: loadingBest } = useFetch<UserScore[]>(
    async () => {
      return await game.getUserBestScores();
    },
    {
      errorCategory: 'api',
      showToastOnError: true,
    },
  );

  // Fetch filtered scores when filter category changes
  const { data: filteredScoresData, loading: loadingFiltered } = useFetch<{
    results: UserScore[];
    count: number;
  }>(
    async () => {
      if (!filterCategory) {
        // Return current scores if no filter
        return { results: scores, count: scoresCount };
      }
      // Get filtered data from server with category and page
      const data = await game.getUserScores(scoresPage, filterCategory);
      return data;
    },
    {
      errorCategory: 'api',
      skipFetch: !filterCategory,
      initialData: { results: scores, count: scoresCount },
    },
  );

  // Set initial categories
  useEffect(() => {
    setAllCats(
      getCategoryOptions().map(({ value, label }) => ({ value, label })),
    );
  }, []);

  // Set played categories from best scores
  useEffect(() => {
    const bestScores = bestScoresData || [];
    const bestCats = [
      ...new Set(bestScores.map((score) => score.category_name)),
    ];

    if (bestCats.length > 0) {
      const categories = bestCats.map((categoryName) => {
        const categoryOption = getCategoryOptions().find(
          (opt) => opt.label === categoryName,
        );
        return {
          value: categoryOption?.value || categoryName.toLowerCase(),
          label: categoryName,
        };
      });
      setStablePlayedCategories(categories);
      if (!bestCategory && categories.length > 0) {
        setBestCategory(categories[0].value);
      }
      if (!initialLoadComplete) {
        setInitialLoadComplete(true);
      }
    }
  }, [bestScoresData, bestCategory, initialLoadComplete]);

  // Get display results based on filter state
  const displayScores = filterCategory
    ? filteredScoresData?.results || []
    : scores;

  // Calculate total count based on filter state
  const displayCount = filterCategory
    ? filteredScoresData?.count || 0
    : scoresCount;

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(displayCount / pageSize));

  // Find the selected best score
  const selectedBest = (bestScoresData || []).find((s) => {
    const categoryOption = getCategoryOptions().find(
      (opt) => opt.value === bestCategory,
    );
    return s.category_name === (categoryOption?.label || bestCategory);
  });

  const handleBestCategoryChange = (value: string) => {
    setBestCategory(value);
  };

  const handleFilterCategoryChange = (value: string) => {
    setFilterCategory(value);
    setScoresPage(1);
  };

  const handlePreviousPage = () => {
    if (scoresPage > 1) setScoresPage(scoresPage - 1);
  };

  const handleNextPage = () => {
    if (scoresPage < totalPages) setScoresPage(scoresPage + 1);
  };

  return {
    filterCategory,
    bestCategory,
    allCats,
    playedCategories: stablePlayedCategories,
    selectedBest,
    filteredScores: displayScores,
    validPageScores: displayScores,
    totalPages,
    loadingBest: loadingBest && !initialLoadComplete,
    loadingScores: loadingScores || loadingFiltered,
    handleBestCategoryChange,
    handleFilterCategoryChange,
    handlePreviousPage,
    handleNextPage,
  };
}
