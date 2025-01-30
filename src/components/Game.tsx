import { useCallback, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useGameLogic } from '@/hooks/useGameLogic';
import Cards from './Cards';
import ScoreboardModal from './Modal';
import { playSound } from '@/utils/soundManager';

interface GameLogicProps {
  onRestart: () => void;
  onExit: () => void;
}

export default function GameLogic({ onRestart, onExit }: GameLogicProps) {
  const {
    cards,
    setCards,
    selectedCardIndex,
    setSelectedCardIndex,
    matchedPairs,
    setMatchedPairs,
    isGameOver,
    setIsGameOver,
    moves,
    setMoves,
    completedTime,
    previousIndex,
    showModal,
    setShowModal,
    modalMessage,
    timerActive,
    feedback,
    setFeedback,
  } = useGameState(onRestart);

  const { handleCardSelection } = useGameLogic({
    cards,
    setCards,
    selectedCardIndex,
    setSelectedCardIndex,
    matchedPairs,
    setMatchedPairs,
    previousIndex,
    setIsGameOver,
    setMoves,
    setFeedback,
  });

  // Handle game reset
  const handleReset = useCallback(() => {
    onRestart();
  }, [onRestart]);

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
        onExit={onExit}
        timerActive={timerActive}
        feedback={feedback}
      />
      {isGameOver && (
        <ScoreboardModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onReset={handleReset}
          onExit={onExit}
          completedTime={completedTime.toString()}
          moves={moves}
          score={matchedPairs}
        >
          {modalMessage}
        </ScoreboardModal>
      )}
    </>
  );
}
