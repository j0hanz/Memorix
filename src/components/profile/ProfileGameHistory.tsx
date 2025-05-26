import { Suspense } from 'react';

import { GameCategory } from '@/components/game/GameCatagory';
import { ScoreRow } from '@/components/leaderboard/ScoreRow';
import { Pagination } from '@/components/ui/Pagination';
import { LoadingSpinner } from '@/components/ui/Spinner';
import { useProfileScore } from '@/hooks/useProfileScore';

export function ProfileGameHistory() {
  const {
    currentDisplayBestScore,
    loadingBest,
    scores,
    total,
    page,
    setPage,
    pagedCategoryFilter,
    setPagedCategoryFilter,
    selectedBestCategory,
    setSelectedBestCategory,
    playedCategories,
  } = useProfileScore();

  const GameHistorySection = () => {
    const showNoHistory = playedCategories.length > 0 && scores.length === 0;
    return (
      <>
        <GameCategory
          id="filter-category"
          label="Filter by Category"
          hideLabel={true}
          options={playedCategories}
          value={pagedCategoryFilter || ''}
          onChange={(v) => {
            setPagedCategoryFilter(v);
            setPage(1);
          }}
          showAllOption={true}
        />

        {scores.length > 0 ? (
          <>
            {scores.map((s) => (
              <ScoreRow key={s.id} score={s} />
            ))}
            {total > 3 && (
              <Pagination
                page={page}
                totalPages={Math.ceil(total / 3)}
                onPrev={() => {
                  setPage(page - 1);
                }}
                onNext={() => {
                  setPage(page + 1);
                }}
              />
            )}
          </>
        ) : showNoHistory ? (
          <div className="text-center p-3 mt-3">
            {pagedCategoryFilter
              ? `No game history found for ${playedCategories.find((pc) => pc.value === pagedCategoryFilter)?.label || pagedCategoryFilter}.`
              : 'No game history found.'}
          </div>
        ) : null}
      </>
    );
  };

  return (
    <>
      {playedCategories.length > 0 && (
        <Suspense fallback={<LoadingSpinner />}>
          <GameCategory
            id="best-score-category"
            label="Best Scores"
            options={playedCategories}
            value={selectedBestCategory}
            onChange={(v) => {
              setSelectedBestCategory(v);
            }}
            loading={loadingBest}
            showAllOption={false}
          />
          {currentDisplayBestScore && (
            <ScoreRow
              key={currentDisplayBestScore.id}
              score={currentDisplayBestScore}
              highlight={true}
            />
          )}
          {!loadingBest && !currentDisplayBestScore && selectedBestCategory && (
            <div className="text-center p-3 mt-1">
              No best score recorded for{' '}
              {playedCategories.find((pc) => pc.value === selectedBestCategory)
                ?.label || selectedBestCategory}
              .
            </div>
          )}
        </Suspense>
      )}

      <Suspense fallback={<LoadingSpinner />}>
        <GameHistorySection />
      </Suspense>
    </>
  );
}
