import { useState } from 'react';

import { useAuth } from '@/hooks/useProvider';
import { useSaveScore } from '@/hooks/useSaveScore';
import { useScore } from '@/hooks/useScore';
import type { UseScoreboardProps } from '@/types/hooks';

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
