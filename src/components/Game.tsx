import Cards from './Cards';
import ScoreboardModal from './Modal';
import { GameProps } from '@/types/components';
import { useGameUI } from '@/hooks/useGameUI';

export default function Game({ onRestart }: GameProps) {
  const {
    cards,
    handleCardSelection,
    matchedPairs,
    moves,
    isGameOver,
    showModal,
    setShowModal,
    timerActive,
    feedback,
    completedTime,
    exitToMainMenu,
    handleReset,
  } = useGameUI(onRestart);

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
          onClose={() => setShowModal(false)}
          onReset={handleReset}
          onExit={exitToMainMenu}
          completedTime={completedTime.toString()}
          moves={moves}
        />
      )}
    </>
  );
}
