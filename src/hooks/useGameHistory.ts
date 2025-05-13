import { useEffect, useState } from 'react';

import { useBestScores } from '@/hooks/useBestScores';
import { useToast } from '@/hooks/useToast';
import { gameService } from '@/services/gameService';
import type { UserScore } from '@/types/api';
import type { GameOptions } from '@/types/components';
import type { UseGameHistoryProps } from '@/types/components';
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
  const [filteredScores, setFilteredScores] = useState<UserScore[]>(scores);
  const [filteredCount, setFilteredCount] = useState<number>(scoresCount);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(5);

  const {
    bestScores,
    categories: bestCats,
    loading: loadingBest,
  } = useBestScores();

  const { showToast } = useToast();

  useEffect(() => {
    setAllCats(
      getCategoryOptions().map(({ value, label }) => ({
        value,
        label,
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

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      try {
        if (filterCategory) {
          const response = await gameService.getUserScores(
            scoresPage,
            filterCategory,
          );
          setFilteredScores(response.results);
          setFilteredCount(response.count);
          if (response.results.length > 0) {
            setPageSize(response.results.length);
          }
        } else {
          setFilteredScores(scores);
          setFilteredCount(scoresCount);
        }
      } catch (error) {
        console.error('Error fetching filtered scores:', error);
        showToast('Failed to fetch filtered scores. Please try again.');
        setFilteredScores([]);
        setFilteredCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchScores();
  }, [filterCategory, scores, scoresCount, scoresPage, showToast]);

  const totalPages: number = Math.max(1, Math.ceil(filteredCount / pageSize));

  const validPageScores: UserScore[] = filteredScores;

  const selectedBest: UserScore | undefined = bestScores.find(
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
    if (scoresPage > 1) {
      setScoresPage(scoresPage - 1);
    }
  };

  const handleNextPage = () => {
    if (scoresPage < totalPages) {
      setScoresPage(scoresPage + 1);
    }
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
