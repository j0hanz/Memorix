import { useCallback, useEffect, useState } from 'react';

import { useFetch } from '@/hooks/api/useFetch';
import { useServices } from '@/hooks/api/useServices';
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
    () => game.getUserBestScores(),
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
    () => game.getUserScores(page, pagedCategoryFilter || undefined),
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
  const playedCategories: GameOptions[] = allBestScores
    ? Array.from(new Set(allBestScores.map((s) => s.category_name))).map(
        (label) => ({ value: label.toLowerCase(), label }),
      )
    : [];

  // Effect to initialize selectedBestCategory once allBestScores are loaded
  useEffect(() => {
    if (allBestScores && allBestScores.length > 0 && !selectedBestCategory) {
      const firstCategory = allBestScores[0].category_name.toLowerCase();
      setSelectedBestCategory(firstCategory);
    }
  }, [allBestScores, selectedBestCategory]);

  // Determine the current best score to display based on selectedBestCategory
  const currentDisplayBestScore =
    !selectedBestCategory || !allBestScores || allBestScores.length === 0
      ? null
      : allBestScores.find(
          (score) =>
            score.category_name.toLowerCase() ===
            selectedBestCategory.toLowerCase(),
        ) || null;
  return {
    currentDisplayBestScore,
    loadingBest,
    scores: pagedData?.results || [],
    total: pagedData?.count || 0,
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
