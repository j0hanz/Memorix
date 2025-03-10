import Cards from './Cards';
import ScoreboardModal from './Modal';
import { playSound } from '@/utils/soundManager';
import { useGameContext } from '@/hooks/useGameContext';
import { useEffect } from 'react';

interface GameProps {
  onRestart: () => void;
}

export default function Game({ onRestart }: GameProps) {
  // Get game state and handlers from context
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
  } = useGameContext();

  // Reset the game state
  const handleReset = () => {
    onRestart();
  };

  // Play sound when game is over
  useEffect(() => {
    if (isGameOver) {
      playSound('complete');
    }
  }, [isGameOver]);

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
