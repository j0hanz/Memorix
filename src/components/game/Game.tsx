import { Cards } from '@/components/cards/Cards';
import { ScoreboardModal } from '@/components/modals/ScoreboardModal';
import { useGameState } from '@/hooks/useProvider';
import type { GameProps } from '@/types/components';
import { gameActions } from '@/utils/gameActions';

export function Game({ onRestart }: GameProps) {
  const {
    cards,
    handleCardSelection,
    matchedPairs,
    moves,
    isGameOver,
    showModal,
    dispatch,
    timerActive,
    feedback,
    completedTime,
    exitToMainMenu,
    resetGameState,
    selectedCategory,
  } = useGameState();

  // Reset the game state
  const handleReset = () => {
    resetGameState();
    onRestart();
  };

  // Close the modal
  const handleModalClose = () => {
    dispatch(gameActions.toggleModal(false));
  };

  return (
    <>
      <Cards
        cards={cards}
        handleCardSelection={handleCardSelection}
        matchedPairs={matchedPairs}
        moves={moves}
        onReset={handleReset}
        onExit={exitToMainMenu}
        timerActive={timerActive}
        feedback={feedback}
      />
      {isGameOver && (
        <ScoreboardModal
          show={showModal}
          onClose={handleModalClose}
          onReset={handleReset}
          onExit={exitToMainMenu}
          completedTime={completedTime}
          moves={moves}
          categoryCode={selectedCategory ?? ''}
        />
      )}
    </>
  );
}
