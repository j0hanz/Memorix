import { useMemo } from 'react';
import { SCORING } from '@/utils/constants';

export function useGameScore(moves: number, completedTime: number) {
  // Calculate the number of stars based on moves and time taken
  const stars = useMemo(() => {
    if (
      moves <= SCORING.FIVE_STAR.moves &&
      completedTime <= SCORING.FIVE_STAR.time
    )
      return 5;
    if (
      moves <= SCORING.FOUR_STAR.moves &&
      completedTime <= SCORING.FOUR_STAR.time
    )
      return 4;
    if (
      moves <= SCORING.THREE_STAR.moves &&
      completedTime <= SCORING.THREE_STAR.time
    )
      return 3;
    if (
      moves <= SCORING.TWO_STAR.moves &&
      completedTime <= SCORING.TWO_STAR.time
    )
      return 2;
    return 1;
  }, [moves, completedTime]);

  return { stars };
}
