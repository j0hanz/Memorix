import { useState, useRef, useEffect, useCallback } from 'react';
import { shuffleCards } from '@/utils/shuffleCards';
import { generateCards, CardDef } from '@/data/cardData';

// Hook to manage the game state
export function useGameState(onRestart: () => void) {
  const [cards, setCards] = useState<CardDef[]>(() =>
    shuffleCards(generateCards()),
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [completedTime, setCompletedTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const previousIndex = useRef<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');

  const totalPairs = 6;

  // Initial card flip effect
  useEffect(() => {
    setCards((prevCards) =>
      prevCards.map((card) => ({ ...card, status: 'active' })),
    );
    const initialFlipTimer = setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, status: '' })),
      );
      setTimerActive(true);
      setStartTime(Date.now());
    }, 3000);
    return () => clearTimeout(initialFlipTimer);
  }, [setCards]);

  // Check for victory condition
  useEffect(() => {
    if (matchedPairs === totalPairs) {
      setTimerActive(false);
      setCompletedTime(Math.floor((Date.now() - startTime!) / 1000));
      setShowModal(true);
      setIsGameOver(true);
    }
  }, [
    matchedPairs,
    totalPairs,
    setModalMessage,
    setShowModal,
    setIsGameOver,
    startTime,
  ]);

  // Handle game restart
  const handleRestart = useCallback(() => {
    setIsGameOver(false);
    setShowModal(false);
    setModalMessage('');
    setStartTime(null);
    setMoves(0);
    setTimerActive(false);
    setFeedback('');
    onRestart();
  }, [onRestart]);

  return {
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
    startTime,
    previousIndex,
    showModal,
    setShowModal,
    modalMessage,
    timerActive,
    handleRestart,
    feedback,
    setFeedback,
  };
}
