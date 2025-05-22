import type { UserScore } from '@/types/services';

export function usePaginated(
  scores: UserScore[],
  filterCategory: string,
  page: number,
  itemsPerPage: number,
) {
  const filtered = filterCategory
    ? scores.filter((s) => s.category_name === filterCategory)
    : scores;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const pageScores = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );
  const validPageScores = pageScores.filter(
    (s): s is UserScore =>
      typeof s.id === 'number' &&
      typeof s.category_name === 'string' &&
      typeof s.moves === 'number' &&
      typeof s.time_seconds === 'number' &&
      typeof s.stars === 'number' &&
      typeof s.completed_at === 'string',
  );
  return { filtered, totalPages, validPageScores };
}
