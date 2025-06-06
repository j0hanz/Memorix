import { Cards } from '@/components/cards/Cards';
import { ScoreboardModal } from '@/components/modals/ScoreboardModal';
import { useGameState } from '@/hooks/shared/useProvider';
import type { GameProps } from '@/types/components';
import { gameActions } from '@/utils/game/gameActions';

export function Game({ onRestart }: GameProps) {
  const {
    cards,
    selectCard,
    matchedPairs,
    moves,
    isGameOver,
    showModal,
    dispatch,
    timerActive,
    feedback,
    completedTime,
    exitGame,
    resetGame,
    selectedCategory,
  } = useGameState();

  // Reset the game state
  const handleReset = () => {
    resetGame();
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
        handleCardSelection={selectCard}
        matchedPairs={matchedPairs}
        moves={moves}
        onReset={handleReset}
        onExit={exitGame}
        timerActive={timerActive}
        feedback={feedback}
      />
      {isGameOver && (
        <ScoreboardModal
          show={showModal}
          onClose={handleModalClose}
          onReset={handleReset}
          onExit={exitGame}
          completedTime={completedTime}
          moves={moves}
          categoryCode={selectedCategory ?? ''}
        />
      )}
    </>
  );
}
