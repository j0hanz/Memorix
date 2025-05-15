import { useEffect, useState } from 'react';

import { GameCategory } from '@/components/GameCatagory';
import { Pagination } from '@/components/Pagination';
import { ScoreRow } from '@/components/ScoreRow';
import { useGameHistory } from '@/hooks/useGameHistory';
import { useProfile } from '@/hooks/useProvider';

export function ProfileGameHistory() {
  const { scores, loadingScores, scoresCount, scoresPage, setScoresPage } =
    useProfile();

  // Add local state to prevent flickering
  const [isStable, setIsStable] = useState(false);

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

  // Set component as stable once we have categories
  useEffect(() => {
    if (playedCategories.length > 0 && !isStable) {
      setIsStable(true);
    }
  }, [playedCategories, isStable]);

  // Don't render selector until we have data
  if (!isStable && loadingBest) {
    return <div className="text-center p-3">Loading best scores...</div>;
  }

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
