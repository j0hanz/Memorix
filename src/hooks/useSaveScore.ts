import { useEffect, useRef } from 'react';

import gameService from '@/services/gameService';
import type { UseSaveScoreProps } from '@/types/hooks';

export function useSaveScore({
  show,
  isAuthenticated,
  scoreSaved,
  setScoreSaved,
  setSaveError,
  categoryCode,
  moves,
  completedTime,
  stars,
}: UseSaveScoreProps) {
  const isSaving = useRef(false);

  useEffect(() => {
    const saveScore = async () => {
      if (show && isAuthenticated && !scoreSaved && !isSaving.current) {
        isSaving.current = true;
        try {
          await gameService.saveGameResult({
            category: categoryCode.toUpperCase(),
            moves,
            time_seconds: completedTime,
            stars,
          });
          setScoreSaved(true);
        } catch (error) {
          console.error('Failed to save score:', error);
          setSaveError('Failed to save your score. Try again later.');
        } finally {
          isSaving.current = false;
        }
      }
    };

    saveScore();
  }, [
    show,
    isAuthenticated,
    scoreSaved,
    categoryCode,
    completedTime,
    moves,
    stars,
    setScoreSaved,
    setSaveError,
  ]);
}
