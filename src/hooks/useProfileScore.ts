import { useCallback, useEffect, useMemo, useState } from 'react';

import { useFetch } from '@/hooks/useFetch';
import { useServices } from '@/hooks/useServices';
import type { GameOptions } from '@/types/components';
import type { PaginatedUserScores, UserScore } from '@/types/services';

export function useProfileScore(initialPage = 1) {
  const { game } = useServices();
  const [page, setPage] = useState<number>(initialPage);
  // State for the category filter of paged scores
  const [pagedCategoryFilter, setPagedCategoryFilter] = useState<string>('');
  // State for the selected category to display its best score
  const [selectedBestCategory, setSelectedBestCategory] = useState<string>('');

  // Best scores fetcher
  const fetchAllBestScores = useCallback(
    (signal?: AbortSignal) => game.getUserBestScores(signal),
    [game],
  );
  const { data: allBestScores = [], loading: loadingBest } = useFetch<
    UserScore[]
  >(fetchAllBestScores, {
    initialData: [],
    showToastOnError: true,
    errorCategory: 'api',
  });

  // Paged scores fetcher
  const fetchPagedScores = useCallback(
    (signal?: AbortSignal) =>
      game.getUserScores(page, pagedCategoryFilter || undefined, signal),
    [game, page, pagedCategoryFilter],
  );
  const {
    data: pagedData = { results: [], count: 0, next: null, previous: null },
    loading: loadingPaged,
  } = useFetch<PaginatedUserScores>(fetchPagedScores, {
    initialData: { results: [], count: 0, next: null, previous: null },
    showToastOnError: false,
    errorCategory: 'api',
  });

  // Derive the list of categories the user has played from all their best scores
  const playedCategories = useMemo<GameOptions[]>(() => {
    return Array.from(new Set(allBestScores.map((s) => s.category_name))).map(
      (label) => ({ value: label.toLowerCase(), label }),
    );
  }, [allBestScores]);

  // Effect to initialize selectedBestCategory once playedCategories are loaded
  useEffect(() => {
    if (playedCategories.length > 0 && !selectedBestCategory) {
      setSelectedBestCategory(playedCategories[0].value);
    }
  }, [playedCategories, selectedBestCategory]);

  // Determine the current best score to display based on selectedBestCategory
  const currentDisplayBestScore = useMemo(() => {
    if (!selectedBestCategory || allBestScores.length === 0) {
      return null;
    }
    return (
      allBestScores.find(
        (score) =>
          score.category_name.toLowerCase() ===
          selectedBestCategory.toLowerCase(),
      ) || null
    );
  }, [allBestScores, selectedBestCategory]);

  return {
    currentDisplayBestScore,
    loadingBest,
    scores: pagedData.results,
    total: pagedData.count,
    page,
    setPage,
    pagedCategoryFilter,
    setPagedCategoryFilter,
    selectedBestCategory,
    setSelectedBestCategory,
    loadingPaged,
    playedCategories,
  };
}
