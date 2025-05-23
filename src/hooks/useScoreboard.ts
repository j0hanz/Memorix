import { useEffect, useRef, useState } from 'react';

import { SCORING_THRESHOLDS } from '@/constants/scoring';
import { useAuth } from '@/hooks/useProvider';
import { useServices } from '@/hooks/useServices';
import type { UseSaveScoreProps, UseScoreboardProps } from '@/types/hooks';

// Calculate stars based on moves and time
export function calculateStars(moves: number, completedTime: number): number {
  for (const { stars, moves: m, time: t } of SCORING_THRESHOLDS) {
    if (moves <= m && completedTime <= t) {
      return stars;
    }
  }
  return 1;
}

// Hook for calculating score stars
export function useScore(moves: number, completedTime: number) {
  const stars = calculateStars(moves, completedTime);
  return { stars };
}

// Hook for saving scores to the server
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
  const { game } = useServices();
  const isSaving = useRef(false);

  useEffect(() => {
    const saveScore = async () => {
      if (show && isAuthenticated && !scoreSaved && !isSaving.current) {
        isSaving.current = true;
        try {
          await game.saveGameResult({
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

    void saveScore();
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
    game,
  ]);
}

// Hook for managing scoreboard state
export function useScoreboard({
  moves,
  completedTime,
  categoryCode,
}: UseScoreboardProps) {
  const { isAuthenticated } = useAuth();
  const { stars } = useScore(moves, completedTime);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useSaveScore({
    show: true,
    isAuthenticated,
    scoreSaved,
    setScoreSaved,
    setSaveError,
    categoryCode,
    moves,
    completedTime,
    stars,
  });

  return {
    isAuthenticated,
    stars,
    scoreSaved,
    setScoreSaved,
    saveError,
    setSaveError,
  };
}
