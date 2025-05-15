import { GameCategory } from '@/components/GameCatagory';
import { Pagination } from '@/components/Pagination';
import { ScoreRow } from '@/components/ScoreRow';
import { useGameHistory } from '@/hooks/useGameHistory';
import { useProfile } from '@/hooks/useProvider';

// This component displays the game history of a user profile.
export function ProfileGameHistory() {
  const { scores, loadingScores, scoresCount, scoresPage, setScoresPage } =
    useProfile();

  const {
    bestCategory,
    playedCategories,
    selectedBest,
    filterCategory,
    allCats,
    filteredScores,
    validPageScores,
    totalPages,
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
      {playedCategories.length > 0 && (
        <>
          <GameCategory
            id="best-score-category"
            label="Best Scores"
            options={playedCategories}
            value={bestCategory}
            onChange={handleBestCategoryChange}
            loading={false}
            showAllOption={false}
          />
          {selectedBest && (
            <ScoreRow
              key={selectedBest.id}
              score={selectedBest}
              highlight={true}
            />
          )}
        </>
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
