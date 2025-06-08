import { useCallback, useEffect, useState } from 'react';

import { useFetch } from '@/hooks/api/useFetch';
import { useServices } from '@/hooks/api/useServices';
import { useToast } from '@/hooks/shared/useProvider';
import type { GameOptions } from '@/types/components';
import type { PaginatedUserScores, UserScore } from '@/types/services';

export function useProfileScore(initialPage = 1) {
  const { game } = useServices();
  const { showToast } = useToast();
  const [page, setPage] = useState<number>(initialPage);
  // State for the category filter of paged scores
  const [pagedCategoryFilter, setPagedCategoryFilter] = useState<string>('');
  // State for the selected category to display its best score
  const [selectedBestCategory, setSelectedBestCategory] = useState<string>('');

  // Clear scores state
  const [isClearingScores, setIsClearingScores] = useState(false);
  const [clearScoresError, setClearScoresError] = useState<string | null>(null);
  const [confirmClearAction, setConfirmClearAction] = useState<
    { type: 'category'; code: string } | { type: 'all' } | null
  >(null);
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
  const playedCategories: GameOptions[] = allBestScores
    ? Array.from(new Set(allBestScores.map((s) => s.category_name))).map(
        (name) => ({
          value: name.toLowerCase(), // Use lowercase for consistency with API
          label: name,
        }),
      )
    : [];

  // Effect to initialize selectedBestCategory once allBestScores are loaded
  useEffect(() => {
    if (allBestScores && allBestScores.length > 0 && !selectedBestCategory) {
      const firstScore = allBestScores[0];
      setSelectedBestCategory(firstScore.category_name.toLowerCase());
    }
  }, [allBestScores, selectedBestCategory]);

  const initiateClearCategoryScores = (categoryName: string) => {
    setConfirmClearAction({ type: 'category', code: categoryName });
  };

  const initiateClearAllScores = () => {
    setConfirmClearAction({ type: 'all' });
  };

  const cancelClearScores = () => {
    setConfirmClearAction(null);
  };

  const executeClearScores = async () => {
    if (!confirmClearAction) return;

    setIsClearingScores(true);
    setClearScoresError(null);

    try {
      let message = '';
      if (confirmClearAction.type === 'category') {
        const response = await game.clearUserScoresByCategory(
          confirmClearAction.code,
        );
        message = response.detail || 'Scores for category cleared.';
        if (
          pagedCategoryFilter.toLowerCase() ===
          confirmClearAction.code.toLowerCase()
        ) {
          setPagedCategoryFilter(''); // Reset filter if it was the one cleared
        }
      } else {
        const response = await game.clearAllUserScores();
        message = response.detail || 'All scores cleared.';
        setPagedCategoryFilter(''); // Reset filter
      }
      showToast(message);
      // Reset page to 1 after clearing, as current page might be out of bounds
      setPage(1);
    } catch (error: unknown) {
      let errorMessage = 'Failed to clear scores.';
      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message: unknown }).message === 'string'
      ) {
        errorMessage = (error as { message: string }).message;
      }
      setClearScoresError(errorMessage);
      showToast(errorMessage);
    } finally {
      setIsClearingScores(false);
      setConfirmClearAction(null);
    }
  };

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
    initiateClearCategoryScores,
    initiateClearAllScores,
    executeClearScores,
    cancelClearScores,
    confirmClearAction,
    isClearingScores,
    clearScoresError,
  };
}
