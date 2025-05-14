import { GameCategory } from '@/components/GameCatagory';
import { Pagination } from '@/components/Pagination';
import { ScoreRow } from '@/components/ScoreRow';
import { useGameHistory } from '@/hooks/useGameHistory';
import type { ProfileGameHistoryProps } from '@/types/components';

export function ProfileGameHistory({
  scores = [],
  loadingScores,
  scoresCount,
  scoresPage,
  setScoresPage,
}: ProfileGameHistoryProps & {
  scoresCount: number;
  scoresPage: number;
  setScoresPage: (page: number) => void;
}) {
  const {
    bestCategory,
    playedCategories,
    selectedBest,
    filterCategory,
    allCats,
    filteredScores,
    validPageScores,
    totalPages,
    loadingBest,
    handleBestCategoryChange,
    handleFilterCategoryChange,
    handlePreviousPage,
    handleNextPage,
  } = useGameHistory({
    scores,
    loadingScores,
    scoresCount,
    scoresPage,
    setScoresPage,
  });

  return (
    <>
      <GameCategory
        id="best-score-category"
        label="Best Scores"
        options={playedCategories}
        value={bestCategory}
        onChange={handleBestCategoryChange}
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
        onChange={handleFilterCategoryChange}
        showAllOption={true}
      />

      {loadingScores ? (
        <div className="text-center p-4">Loading game history...</div>
      ) : filteredScores.length > 0 ? (
        <>
          {validPageScores.map((s) => (
            <ScoreRow key={s.id} score={s} />
          ))}
          {totalPages > 1 && (
            <Pagination
              page={scoresPage}
              totalPages={totalPages}
              onPrev={handlePreviousPage}
              onNext={handleNextPage}
            />
          )}
        </>
      ) : (
        <div className="text-center p-3 mt-3">No game history found.</div>
      )}
    </>
  );
}
