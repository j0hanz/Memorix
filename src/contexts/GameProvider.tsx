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
  // Initialize game state as a single object for better organization
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
  const setCards = (value: React.SetStateAction<PairedCard[]>) => {
    setGameState((prev) => ({
      ...prev,
      cards: typeof value === 'function' ? value(prev.cards) : value,
    }));
  };

  // Updates the currently selected card index
  const setSelectedCardIndex = (value: React.SetStateAction<number | null>) => {
    setGameState((prev) => ({
      ...prev,
      selectedCardIndex:
        typeof value === 'function' ? value(prev.selectedCardIndex) : value,
    }));
  };

  // Increments or sets the number of matched card pairs
  const setMatchedPairs = (value: React.SetStateAction<number>) => {
    setGameState((prev) => ({
      ...prev,
      matchedPairs:
        typeof value === 'function' ? value(prev.matchedPairs) : value,
    }));
  };

  // Updates the count of player moves
  const setMoves = (value: React.SetStateAction<number>) => {
    setGameState((prev) => ({
      ...prev,
      moves: typeof value === 'function' ? value(prev.moves) : value,
    }));
  };

  // Sets whether the game is over
  const setIsGameOver = (value: React.SetStateAction<boolean>) => {
    setGameState((prev) => ({
      ...prev,
      isGameOver: typeof value === 'function' ? value(prev.isGameOver) : value,
    }));
  };

  // Controls the game timer state
  const setTimerActive = (value: React.SetStateAction<boolean>) => {
    setGameState((prev) => ({
      ...prev,
      timerActive:
        typeof value === 'function' ? value(prev.timerActive) : value,
    }));
  };

  // Sets feedback message for the player
  const setFeedback = (value: React.SetStateAction<string>) => {
    setGameState((prev) => ({
      ...prev,
      feedback: typeof value === 'function' ? value(prev.feedback) : value,
    }));
  };

  // Controls visibility of the game completion modal
  const setShowModal = (value: React.SetStateAction<boolean>) => {
    setGameState((prev) => ({
      ...prev,
      showModal: typeof value === 'function' ? value(prev.showModal) : value,
    }));
  };

  // Sets whether a match is currently being processed
  const setIsProcessingMatch = (value: React.SetStateAction<boolean>) => {
    setGameState((prev) => ({
      ...prev,
      isProcessingMatch:
        typeof value === 'function' ? value(prev.isProcessingMatch) : value,
    }));
  };

  // Show all cards initially, then hide them after delay
  const initializeCards = useCallback(
    (delay: number = GAME_CONFIG.INITIAL_REVEAL_TIME) => {
      setGameState((prev) => ({
        ...prev,
        isInitialReveal: true,
      }));
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
    [],
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
