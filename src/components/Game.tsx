import Cards from './Cards';
import ScoreboardModal from './ModalComponents';
import { GameProps } from '@/types/components';
import { useGameState } from '@/hooks/useGameState';

export default function Game({ onRestart }: GameProps) {
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
  } = useGameState();

  // Reset the game state
  const handleReset = () => {
    resetGameState();
    onRestart();
  };

  // Close the modal
  const handleModalClose = () => {
    dispatch({ type: 'TOGGLE_MODAL', payload: { show: false } });
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
          completedTime={completedTime.toString()}
          moves={moves}
        />
      )}
    </>
  );
}
