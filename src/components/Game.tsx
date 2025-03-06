import { useEffect } from 'react';
import Cards from './Cards';
import ScoreboardModal from './Modal';
import { playSound } from '@/utils/soundManager';
import { useGameContext } from '@/hooks/useGameContext';

interface GameLogicProps {
  onRestart: () => void;
}

export default function GameLogic({ onRestart }: GameLogicProps) {
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
    handleExit,
  } = useGameContext();

  // Handle game reset
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
        onExit={handleExit}
        timerActive={timerActive}
        feedback={feedback}
      />
      {isGameOver && (
        <ScoreboardModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onReset={handleReset}
          onExit={handleExit}
          completedTime={completedTime.toString()}
          moves={moves}
        />
      )}
    </>
  );
}
