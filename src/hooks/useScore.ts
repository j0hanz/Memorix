import { calculateStars } from '@/constants/scoring';

export function useScore(moves: number, completedTime: number) {
  const stars = calculateStars(moves, completedTime);
  return { stars };
}
