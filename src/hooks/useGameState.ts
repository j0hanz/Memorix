import { useState, useRef, useEffect } from 'react';
import { PairedCard } from '@/types/card';
import { GAME_CONFIG, DELAYS } from '@/constants/constants';
import { useShuffledDeck } from '@/hooks/useShuffledDeck';
import { useCardDisplay } from '@/hooks/useCardDisplay';
import { useCardMatching } from '@/hooks/useCardMatching';

export const useGameState = (onExit: () => void) => {
  // Use shuffled deck hook
  const { deck, refreshDeck } = useShuffledDeck();

  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [isInitialReveal, setIsInitialReveal] = useState(true);
  const [completedTime, setCompletedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Use card interaction hook
  const {
    cards,
    setCards,
    selectedCardIndex,
    setSelectedCardIndex,
    feedback,
    moves,
    handleCardClick,
    resetState: resetCardInteraction,
  } = useCardMatching<PairedCard>({
    onMatch: () => {
      setMatchedPairs((prev) => prev + 1);
    },
    onMismatch: () => {},
  });

  // Use card reveal hook
  const { isRevealing, revealCards } = useCardDisplay(cards, setCards, {
    initialDelay: DELAYS.INITIAL_REVEAL,
    revealDuration: DELAYS.INITIAL_REVEAL_TIME,
    onRevealComplete: () => {
      setIsInitialReveal(false);
      setTimerActive(true);
      setStartTime(Date.now());
    },
  });

  // Refs
  const previousIndex = useRef<number | null>(null);

  // Initialize cards on mount
  useEffect(() => {
    setCards(deck);
    revealCards();
  }, [deck, setCards, revealCards]);

  // Check for game completion
  useEffect(() => {
    if (matchedPairs === GAME_CONFIG.TOTAL_PAIRS) {
      const timeElapsed = startTime
        ? Math.floor((Date.now() - startTime) / 1000)
        : 0;
      setTimerActive(false);
      setCompletedTime(timeElapsed);
      setShowModal(true);
      setIsGameOver(true);
    }
  }, [matchedPairs, startTime]);

  // Handle card selection
  function handleCardSelection(index: number) {
    handleCardClick(index, isInitialReveal);
  }

  // Reset game state
  function resetGameState() {
    refreshDeck();
    setCards(deck);
    resetCardInteraction();
    setMatchedPairs(0);
    setIsGameOver(false);
    setTimerActive(false);
    setIsInitialReveal(true);
    setCompletedTime(0);
    setStartTime(null);
    setShowModal(false);
    previousIndex.current = null;

    // Allow a brief delay before revealing cards again
    setTimeout(() => {
      revealCards();
    }, 100);
  }

  // Exit to main menu
  const exitToMainMenu = () => {
    onExit();
  };

  return {
    cards,
    selectedCardIndex,
    matchedPairs,
    moves,
    isGameOver,
    timerActive,
    feedback,
    isInitialReveal,
    isProcessingMatch: isRevealing,
    completedTime,
    startTime,
    showModal,
    setCards,
    setSelectedCardIndex,
    setMatchedPairs,
    setMoves: resetCardInteraction,
    setIsGameOver,
    setTimerActive,
    setFeedback: () => {},
    setShowModal,
    previousIndex,
    resetGameState,
    handleCardSelection,
    exitToMainMenu,
  };
};
