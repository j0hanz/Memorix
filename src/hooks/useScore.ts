import { SCORING } from '@/constants/constants';

export function useScore(moves: number, completedTime: number) {
  // Calculate the score based on moves and time
  const stars = calculateStars(moves, completedTime);
  return { stars };
}

// This function determine the score based on the number of moves and time taken
function calculateStars(moves: number, completedTime: number): number {
  const scoreThresholds = [
    { threshold: SCORING.FIVE_STAR, stars: 5 },
    { threshold: SCORING.FOUR_STAR, stars: 4 },
    { threshold: SCORING.THREE_STAR, stars: 3 },
    { threshold: SCORING.TWO_STAR, stars: 2 },
  ];

  for (const { threshold, stars } of scoreThresholds) {
    if (moves <= threshold.moves && completedTime <= threshold.time) {
      return stars;
    }
  }

  return 1; // Default to 1 star
}
