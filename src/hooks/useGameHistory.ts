import { useEffect, useState } from 'react';

import { useBestScores } from '@/hooks/useBestScores';
import { useFetch } from '@/hooks/useFetch';
import { gameService } from '@/services/gameService';
import type { PaginatedUserScores, UserScore } from '@/types/api';
import type { GameOptions, UseGameHistoryProps } from '@/types/components';
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

  const {
    bestScores,
    categories: bestCats,
    loading: loadingBest,
  } = useBestScores();

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
        errorCategory: 'GameHistory',
        dependencies: [filterCategory, scores, scoresCount, scoresPage],
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

  const playedCategories: GameOptions[] = bestCats.map((c) => ({
    value: c,
    label: c,
  }));

  useEffect(() => {
    if (playedCategories.length === 1) {
      setBestCategory(playedCategories[0].value);
    }
  }, [playedCategories]);

  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
  const validPageScores: UserScore[] = filteredScores;
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
    playedCategories,
    selectedBest,
    filteredScores,
    validPageScores,
    totalPages,
    loadingBest,
    loading: isLoading || loadingScores,
    handleBestCategoryChange,
    handleFilterCategoryChange,
    handlePreviousPage,
    handleNextPage,
  };
}
