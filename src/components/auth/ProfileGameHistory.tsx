import { useEffect, useState } from 'react';

import type { GameOptions } from '@/components/GameCatagory';
import { GameCategory } from '@/components/GameCatagory';
import { Pagination } from '@/components/Pagination';
import { ScoreRow } from '@/components/ScoreRow';
import { useBestScores } from '@/hooks/useBestScores';
import { usePaginated } from '@/hooks/usePaginated';
import type { UserScore } from '@/types/api';
import { CATEGORY_OPTIONS } from '@/utils/categoryUtils';

const ITEMS_PER_PAGE = 5;

export interface ProfileGameHistoryProps {
  scores: UserScore[];
  loadingScores: boolean;
}

export function ProfileGameHistory({
  scores = [],
  loadingScores,
}: ProfileGameHistoryProps) {
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [bestCategory, setBestCategory] = useState<string>('');
  const [allCats, setAllCats] = useState<GameOptions[]>([]);

  const {
    bestScores,
    categories: bestCats,
    loading: loadingBest,
  } = useBestScores();

  useEffect(() => {
    setAllCats(
      CATEGORY_OPTIONS.map((c) => ({
        value: c.value,
        label: c.label,
      })),
    );
  }, []);

  // Only show categories the user has played for best scores
  const playedCategories: GameOptions[] = bestCats.map((c) => ({
    value: c,
    label: c,
  }));

  // Auto-select if only one played category
  useEffect(() => {
    if (playedCategories.length === 1) {
      setBestCategory(playedCategories[0].value);
    }
  }, [playedCategories]);

  const { filtered, totalPages, validPageScores } = usePaginated(
    scores,
    filterCategory,
    page,
    ITEMS_PER_PAGE,
  );

  const selectedBest = bestScores.find((s) => s.category_name === bestCategory);

  return (
    <>
      <GameCategory
        id="best-score-category"
        label="Best Scores"
        options={playedCategories}
        value={bestCategory}
        onChange={(v) => {
          setBestCategory(v);
          setPage(1);
        }}
        loading={loadingBest}
        showAllOption={false}
      />
      {selectedBest && (
        <ScoreRow key={selectedBest.id} score={selectedBest} highlight={true} />
      )}

      <GameCategory
        id="filter-category"
        label="Filter by Category"
        hideLabel={true}
        options={allCats}
        value={filterCategory}
        onChange={(v) => {
          setFilterCategory(v);
          setPage(1);
        }}
        showAllOption={true}
      />

      {loadingScores ? (
        <div className="text-center p-4">Loading game history...</div>
      ) : filtered.length > 0 ? (
        <>
          {validPageScores.map((s) => (
            <ScoreRow key={s.id} score={s} />
          ))}
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPrev={() => {
                setPage((p) => Math.max(1, p - 1));
              }}
              onNext={() => {
                setPage((p) => Math.min(totalPages, p + 1));
              }}
            />
          )}
        </>
      ) : (
        <div className="text-center p-3 mt-3">No game history found.</div>
      )}
    </>
  );
}

export default ProfileGameHistory;
