import React, {
  useState,
  useRef,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { getNewShuffledDeck, PairedCard } from '@/data/cardData';
import { handleCardClick } from '@/utils/cardOperations';
import { GameContext, GameState } from './GameContext';
import { GAME_CONFIG, CARD_STATUS } from '@/utils/constants';

interface GameProviderProps {
  children: ReactNode;
  onExit: () => void;
}

export const GameProvider = ({
  children,
  onExit,
}: GameProviderProps): React.ReactElement => {
  // Initialize game state as a single object
  const [gameState, setGameState] = useState<GameState>({
    cards: getNewShuffledDeck(),
    selectedCardIndex: null,
    matchedPairs: 0,
    moves: 0,
    isGameOver: false,
    timerActive: false,
    feedback: '',
    isInitialReveal: true,
    isProcessingMatch: false,
    completedTime: 0,
    startTime: null,
    showModal: false,
  });

  // Refs
  const previousIndex = useRef<number | null>(null);

  // Create individual state setters with proper typing
  const updateValue =
    <K extends keyof GameState>(key: K) =>
    (value: React.SetStateAction<GameState[K]>) =>
      setGameState((prev) => ({
        ...prev,
        [key]: typeof value === 'function' ? value(prev[key]) : value,
      }));

  // Update cards state
  const setCards = updateValue('cards');
  // Update selected card index
  const setSelectedCardIndex = updateValue('selectedCardIndex');
  // Update matched pairs count
  const setMatchedPairs = updateValue('matchedPairs');
  // Update moves count
  const setMoves = updateValue('moves');
  // Update game over status
  const setIsGameOver = updateValue('isGameOver');
  // Update timer state
  const setTimerActive = updateValue('timerActive');
  // Update feedback message
  const setFeedback = updateValue('feedback');
  // Update modal visibility
  const setShowModal = updateValue('showModal');
  // Update match processing state
  const setIsProcessingMatch = updateValue('isProcessingMatch');

  // Reveal all cards initially, then hide them after a delay
  const initializeCards = useCallback(
    (delay: number = GAME_CONFIG.INITIAL_REVEAL_TIME) => {
      setGameState((prev) => ({ ...prev, isInitialReveal: true }));
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, status: CARD_STATUS.ACTIVE })),
      );
      const timer = setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) => ({ ...card, status: CARD_STATUS.DEFAULT })),
        );
        setGameState((prev) => ({
          ...prev,
          isInitialReveal: false,
          timerActive: true,
          startTime: Date.now(),
        }));
      }, delay);
      return timer;
    },
    [setCards],
  );

  // Initialize cards on mount
  useEffect(() => {
    const timer = initializeCards();
    return () => clearTimeout(timer);
  }, [initializeCards]);

  // Check for game completion
  useEffect(() => {
    if (gameState.matchedPairs === GAME_CONFIG.TOTAL_PAIRS) {
      const completedTime = gameState.startTime
        ? Math.floor((Date.now() - gameState.startTime) / 1000)
        : 0;
      setGameState((prev) => ({
        ...prev,
        timerActive: false,
        completedTime,
        showModal: true,
        isGameOver: true,
      }));
    }
  }, [gameState.matchedPairs, gameState.startTime]);

  // Handle card selection
  function handleCardSelection(index: number) {
    handleCardClick<PairedCard>({
      index,
      cards: gameState.cards,
      setCards,
      selectedCardIndex: gameState.selectedCardIndex,
      setSelectedCardIndex,
      previousIndex,
      onMatch: () => setMatchedPairs((prev) => prev + 1),
      onMismatch: () => {},
      setFeedback,
      setMoves,
      isInitialReveal: gameState.isInitialReveal,
      isProcessingMatch: gameState.isProcessingMatch,
      setIsProcessingMatch,
    });
  }

  // Reset game state
  function resetGameState() {
    setGameState({
      cards: getNewShuffledDeck(),
      selectedCardIndex: null,
      matchedPairs: 0,
      moves: 0,
      isGameOver: false,
      timerActive: false,
      feedback: '',
      isInitialReveal: true,
      isProcessingMatch: false,
      completedTime: 0,
      startTime: null,
      showModal: false,
    });
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
        ...gameState,
        setCards,
        setSelectedCardIndex,
        setMatchedPairs,
        setMoves,
        setIsGameOver,
        setTimerActive,
        setFeedback,
        setShowModal,
        previousIndex,
        resetGameState,
        handleCardSelection,
        exitToMainMenu,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
