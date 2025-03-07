import React, { useState, useRef, ReactNode, useEffect } from 'react';
import { getNewShuffledDeck, PairedCard } from '@/data/cardData';
import { handleCardClick } from '@/utils/cardOperations';
import { GameContext } from './GameContext';
import { GAME_CONFIG, CARD_STATUS } from '@/utils/constants';

interface GameProviderProps {
  children: ReactNode;
  onExit: () => void;
}

// Component to manage game state and logic
export const GameProvider = ({
  children,
  onExit,
}: GameProviderProps): React.ReactElement => {
  // Game state
  const [cards, setCards] = useState<PairedCard[]>(() => getNewShuffledDeck());
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);

  // UI state
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isInitialReveal, setIsInitialReveal] = useState<boolean>(true);

  // Time tracking
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completedTime, setCompletedTime] = useState<number>(0);

  // Refs
  const previousIndex = useRef<number | null>(null);

  // Show all cards initially, then hide them after delay
  function initializeCards(delay: number = GAME_CONFIG.INITIAL_REVEAL_TIME) {
    setIsInitialReveal(true);
    setCards((prevCards) =>
      prevCards.map((card) => ({ ...card, status: CARD_STATUS.ACTIVE })),
    );
    const timer = setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, status: CARD_STATUS.DEFAULT })),
      );
      setIsInitialReveal(false);
      setTimerActive(true);
      setStartTime(Date.now());
    }, delay);
    return timer;
  }

  // Initial card setup on component mount
  useEffect(() => {
    const timer = initializeCards();
    return () => clearTimeout(timer);
  }, []);

  // Check for win condition
  useEffect(() => {
    if (matchedPairs === GAME_CONFIG.TOTAL_PAIRS) {
      setTimerActive(false);
      if (startTime) {
        setCompletedTime(Math.floor((Date.now() - startTime) / 1000));
      }
      setShowModal(true);
      setIsGameOver(true);
    }
  }, [matchedPairs, startTime]);

  // Card selection handler
  function handleCardSelection(index: number) {
    handleCardClick<PairedCard>({
      index,
      cards,
      setCards,
      selectedCardIndex,
      setSelectedCardIndex,
      previousIndex,
      onMatch: () => setMatchedPairs((prev) => prev + 1),
      onMismatch: () => {},
      setFeedback,
      setMoves,
      isInitialReveal,
    });
  }

  // Reset game state
  function resetGameState() {
    setCards(getNewShuffledDeck());
    setSelectedCardIndex(null);
    setMatchedPairs(0);
    setIsGameOver(false);
    setMoves(0);
    setTimerActive(false);
    setFeedback('');
    setShowModal(false);
    setStartTime(null);
    previousIndex.current = null;
    setTimeout(() => {
      initializeCards();
    }, 100);
  }

  // Exit to main menu
  const exitToMainMenu = () => {
    onExit();
  };

  return (
    <GameContext.Provider
      value={{
        cards,
        setCards,
        selectedCardIndex,
        setSelectedCardIndex,
        matchedPairs,
        setMatchedPairs,
        moves,
        setMoves,
        isGameOver,
        setIsGameOver,
        timerActive,
        setTimerActive,
        feedback,
        setFeedback,
        showModal,
        setShowModal,
        previousIndex,
        completedTime,
        resetGameState,
        handleCardSelection,
        exitToMainMenu,
        isInitialReveal,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
