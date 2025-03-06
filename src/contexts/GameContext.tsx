import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from 'react';
import { shuffleCards } from '@/utils/shuffleCards';
import { generateCards, CardDef } from '@/data/cardData';
import { handleCardClick } from '@/utils/cardUtils';

interface GameContextType {
  cards: CardDef[];
  setCards: React.Dispatch<React.SetStateAction<CardDef[]>>;
  selectedCardIndex: number | null;
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>;
  matchedPairs: number;
  setMatchedPairs: React.Dispatch<React.SetStateAction<number>>;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  moves: number;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  timerActive: boolean;
  setTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
  feedback: string;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
  previousIndex: React.RefObject<number | null>;
  restartGame: () => void;
  handleCardSelection: (index: number) => void;
  completedTime: number;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleExit: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
  onExit: () => void;
}

export const GameProvider = ({
  children,
  onExit,
}: GameProviderProps): React.ReactElement => {
  const [cards, setCards] = useState<CardDef[]>(() =>
    shuffleCards(generateCards()),
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const previousIndex = useRef<number | null>(null);
  const [completedTime, setCompletedTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const totalPairs = 6;

  // Initial card flip effect on component mount
  useEffect(() => {
    // Show all cards initially
    setCards((prevCards) =>
      prevCards.map((card) => ({ ...card, status: 'active' })),
    );

    const initialFlipTimer = setTimeout(() => {
      // Hide all cards after the initial preview period
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, status: '' })),
      );
      setTimerActive(true);
      setStartTime(Date.now());
    }, 3000);

    return () => clearTimeout(initialFlipTimer);
  }, []);

  // Check for victory condition
  useEffect(() => {
    if (matchedPairs === totalPairs) {
      setTimerActive(false);
      if (startTime) {
        setCompletedTime(Math.floor((Date.now() - startTime) / 1000));
      }
      setShowModal(true);
      setIsGameOver(true);
    }
  }, [matchedPairs, startTime]);

  const handleCardSelection = (index: number) => {
    handleCardClick(
      index,
      cards,
      setCards,
      selectedCardIndex,
      setSelectedCardIndex,
      previousIndex,
      () => setMatchedPairs((prev) => prev + 1),
      () => {
        /* No additional action on non-match */
      },
      setFeedback,
      setMoves,
    );
  };

  const restartGame = () => {
    // Reset game state
    setCards(shuffleCards(generateCards()));
    setSelectedCardIndex(null);
    setMatchedPairs(0);
    setIsGameOver(false);
    setMoves(0);
    setTimerActive(false);
    setFeedback('');
    setShowModal(false);
    setStartTime(null);
    previousIndex.current = null;

    // Initial card flip effect with brief delay
    setTimeout(() => {
      // Show all cards
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, status: 'active' })),
      );

      // Hide cards after preview period
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) => ({ ...card, status: '' })),
        );
        setTimerActive(true);
        setStartTime(Date.now());
      }, 3000);
    }, 100);
  };

  const handleExit = () => {
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
        previousIndex,
        restartGame,
        handleCardSelection,
        completedTime,
        showModal,
        setShowModal,
        handleExit,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
