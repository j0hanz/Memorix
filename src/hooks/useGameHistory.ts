import { useEffect, useState } from 'react';

import { useBestScores } from '@/hooks/useBestScores';
import type { UserScore } from '@/types/api';
import type { GameOptions } from '@/types/components';
import type { UseGameHistoryProps } from '@/types/components';
import { CATEGORY_OPTIONS } from '@/utils/categoryUtils';

const ITEMS_PER_PAGE = 5;

export function useGameHistory({
  scores = [],
  scoresCount,
  scoresPage,
  setScoresPage,
}: UseGameHistoryProps) {
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [bestCategory, setBestCategory] = useState<string>('');
  const [allCats, setAllCats] = useState<GameOptions[]>([]);

  const {
    bestScores,
    categories: bestCats,
    loading: loadingBest,
  } = useBestScores();

  useEffect(() => {
    setAllCats(
      CATEGORY_OPTIONS.map((c) => ({
        value: c.value,
        label: c.label,
      })),
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

  // Filter scores by category if filterCategory is set
  const filteredScores: UserScore[] = filterCategory
    ? scores.filter(
        (s) => s.category_name.toLowerCase() === filterCategory.toLowerCase(),
      )
    : scores;

  // Always at least 1 page
  const totalPages: number = Math.max(
    1,
    Math.ceil(
      (filterCategory ? filteredScores.length : scoresCount) / ITEMS_PER_PAGE,
    ),
  );

  // Set scoresPage to 1 if it exceeds totalPages
  const validPageScores: UserScore[] = filterCategory
    ? filteredScores.slice(
        (scoresPage - 1) * ITEMS_PER_PAGE,
        scoresPage * ITEMS_PER_PAGE,
      )
    : scores.slice(
        (scoresPage - 1) * ITEMS_PER_PAGE,
        scoresPage * ITEMS_PER_PAGE,
      );

  // Set bestCategory to the first category in bestScores if it's empty
  const selectedBest: UserScore | undefined = bestScores.find(
    (s) => s.category_name.toLowerCase() === bestCategory.toLowerCase(),
  );

  const handleBestCategoryChange = (value: string) => {
    setBestCategory(value);
    setScoresPage(1);
  };

  const handleFilterCategoryChange = (value: string) => {
    setFilterCategory(value);
    setScoresPage(1);
  };

  const handlePreviousPage = () => {
    setScoresPage(Math.max(1, scoresPage - 1));
  };

  const handleNextPage = () => {
    setScoresPage(Math.min(totalPages, scoresPage + 1));
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
    handleBestCategoryChange,
    handleFilterCategoryChange,
    handlePreviousPage,
    handleNextPage,
  };
}
