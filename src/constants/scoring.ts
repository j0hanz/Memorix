export const SCORING_THRESHOLDS = [
  { stars: 5, moves: 6, time: 15 },
  { stars: 4, moves: 7, time: 30 },
  { stars: 3, moves: 8, time: 45 },
  { stars: 2, moves: 9, time: 60 },
  { stars: 1, moves: Infinity, time: Infinity },
];

export function calculateStars(moves: number, completedTime: number): number {
  for (const { stars, moves: m, time: t } of SCORING_THRESHOLDS) {
    if (moves <= m && completedTime <= t) {
      return stars;
    }
  }
  return 1;
}
