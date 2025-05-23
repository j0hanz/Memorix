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

  // Fetch user scores
  const { data: bestScoresData, loading: loadingBest } = useFetch<UserScore[]>(
    async () => {
      return await game.getUserBestScores();
    },
    {
      errorCategory: 'api',
      showToastOnError: true,
    },
  );

  // Filter scores by category
  const filteredScores = filterCategory
    ? scores.filter((s) => s.category_name === filterCategory)
    : scores;

  const filteredCount = filterCategory ? filteredScores.length : scoresCount;

  // Set initial categories
  useEffect(() => {
    setAllCats(
      getCategoryOptions().map(({ value, label }) => ({ value, label })),
    );
  }, []);

  // Set played categories
  useEffect(() => {
    const bestScores = bestScoresData || [];
    const bestCats = [
      ...new Set(bestScores.map((score) => score.category_name)),
    ];

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
  }, [bestScoresData, bestCategory, initialLoadComplete]);

  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
  const validPageScores: UserScore[] = filteredScores;

  // Find the selected best score only once after filtering
  const selectedBest = (bestScoresData || []).find(
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
    handleBestCategoryChange,
    handleFilterCategoryChange,
    handlePreviousPage,
    handleNextPage,
  };
}
