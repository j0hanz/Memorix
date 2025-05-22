import { useEffect, useState } from 'react';

import { useFetch } from '@/hooks/useFetch';
import { gameService } from '@/services/gameService';
import type { GameOptions, UseGameHistoryProps } from '@/types/components';
import type { PaginatedUserScores, UserScore } from '@/types/services';
import { getCategoryOptions } from '@/utils/categoryUtils';

export function useGameHistory({
  scores = [],
  loadingScores,
  scoresCount,
  scoresPage,
  setScoresPage,
}: UseGameHistoryProps) {
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [bestCategory, setBestCategory] = useState<string>('');
  const [allCats, setAllCats] = useState<GameOptions[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [stablePlayedCategories, setStablePlayedCategories] = useState<
    GameOptions[]
  >([]);

  // Merged useBestScores functionality
  const { data: bestScoresData, loading: loadingBest } = useFetch<UserScore[]>(
    async () => {
      return await gameService.getUserBestScores();
    },
    {
      errorCategory: 'api',
      showToastOnError: true,
    },
  );

  const bestScores = bestScoresData || [];

  // Extract unique category names from bestScores
  const bestCats: string[] = Array.from(
    new Set(bestScores.map((s) => s.category_name)),
  );

  const { data: filteredScoresData, loading: isLoading } =
    useFetch<PaginatedUserScores>(
      async () => {
        if (!filterCategory) {
          return {
            results: scores,
            count: scoresCount,
            next: null,
            previous: null,
          };
        }
        return await gameService.getUserScores(scoresPage, filterCategory);
      },
      {
        showToastOnError: true,
        errorCategory: 'api',
        onSuccess: (data) => {
          if (data.results.length > 0) {
            setPageSize(data.results.length);
          }
        },
      },
    );

  const filteredScores = filteredScoresData?.results || [];
  const filteredCount = filteredScoresData?.count || 0;

  useEffect(() => {
    setAllCats(
      getCategoryOptions().map(({ value, label }) => ({ value, label })),
    );
  }, []);

  // Set the best category to the first one if not set
  useEffect(() => {
    if (bestCats.length > 0) {
      const categories = bestCats.map((c) => ({
        value: c,
        label: c,
      }));
      setStablePlayedCategories(categories);
      if (!bestCategory && categories.length > 0) {
        setBestCategory(categories[0].value);
      }
      if (!initialLoadComplete) {
        setInitialLoadComplete(true);
      }
    }
  }, [bestCats, bestCategory, initialLoadComplete]);

  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
  const validPageScores: UserScore[] = filteredScores;

  // Find the selected best score only once after filtering
  const selectedBest = bestScores.find(
    (s) => s.category_name.toLowerCase() === bestCategory.toLowerCase(),
  );

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
    filteredScores,
    validPageScores,
    totalPages,
    loadingBest: loadingBest && !initialLoadComplete,
    loading: isLoading || loadingScores,
    handleBestCategoryChange,
    handleFilterCategoryChange,
    handlePreviousPage,
    handleNextPage,
  };
}
