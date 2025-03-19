import { SCORING } from '@/constants/constants';

export function useScore(moves: number, completedTime: number) {
  // Calculate the score based on moves and time
  const stars = calculateStars(moves, completedTime);
  return { stars };
}

// This function determine the score based on the number of moves and time taken
function calculateStars(moves: number, completedTime: number): number {
  try {
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
  } catch (error) {
    console.error('Error calculating stars:', error);
    // Fallback to 1 star in case of error
    return 1;
  }
}
