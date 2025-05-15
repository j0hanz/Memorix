import { useCallback, useEffect, useReducer, useRef } from 'react';

import {
  CATEGORIES,
  DELAYS,
  FEEDBACK,
  GAME_CONFIG,
  TIMER,
} from '@/constants/constants';
import { useDeck } from '@/hooks/useDeck';
import { useSound } from '@/hooks/useProvider';
import { gameReducer, initialGameState } from '@/reducers/gameReducer';

export function useGameReducer(
  onExit: () => void,
  selectedCategory = CATEGORIES.ANIMALS,
) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const { deck, refreshDeck } = useDeck(selectedCategory);
  const { playSound } = useSound();

  // Store previous card index for matching logic
  const previousIndex = useRef<number | null>(null);

  // Initialize the game board and reveal sequence
  const initializeGame = useCallback(() => {
    dispatch({ type: 'INITIALIZE_GAME', payload: { cards: deck } });

    // Start initial reveal sequence
    const revealTimer = setTimeout(() => {
      dispatch({ type: 'REVEAL_ALL_CARDS' });

      const hideTimer = setTimeout(() => {
        dispatch({ type: 'HIDE_ALL_CARDS' });
        dispatch({ type: 'START_TIMER' });
      }, DELAYS.INITIAL_REVEAL_TIME);

      return () => {
        clearTimeout(hideTimer);
      };
    }, DELAYS.INITIAL_REVEAL);

    return () => {
      clearTimeout(revealTimer);
    };
  }, [deck, dispatch]);

  // Initialize game with shuffled deck
  useEffect(() => {
    const cleanup = initializeGame();
    return cleanup;
  }, [initializeGame]);

  // Check for game completion
  useEffect(() => {
    // Calculate the elapsed time
    function calculateElapsedTime() {
      return state.startTime
        ? Math.floor((Date.now() - state.startTime) / TIMER.INTERVAL)
        : 0;
    }

    // Set game over state
    function setGameOver(completedTime: number) {
      dispatch({
        type: 'SET_GAME_OVER',
        payload: { completedTime },
      });
      dispatch({ type: 'TOGGLE_MODAL', payload: { show: true } });
    }

    // Check if the game is completed
    if (
      state.matchedPairs === GAME_CONFIG.TOTAL_PAIRS &&
      state.matchedPairs > 0
    ) {
      const timeElapsed = calculateElapsedTime();
      setGameOver(timeElapsed);
      playSound('complete');
    }
  }, [state.matchedPairs, playSound, state.startTime, dispatch]);

  // Check if a card is selectable
  function isCardSelectable(index: number): boolean {
    return !(
      state.isInitialReveal ||
      state.isProcessingMatch ||
      state.cards[index].status.includes('matched') ||
      index === state.selectedCardIndex
    );
  }

  // Handle first card selection
  function handleFirstCardSelection(index: number) {
    dispatch({ type: 'SELECT_CARD', payload: { index } });
    previousIndex.current = index;
    playSound('click');
  }

  // Handle second card selection
  function handleSecondCardSelection(index: number) {
    dispatch({
      type: 'SET_PROCESSING_MATCH',
      payload: { isProcessing: true },
    });
    dispatch({ type: 'SELECT_CARD', payload: { index } });

    const isMatch = checkForMatch(index);
    updateGameState(isMatch);
    processMatchAfterDelay(index, isMatch);
  }

  // Check if selected cards match
  function checkForMatch(index: number): boolean {
    const currentCard = state.cards[index];
    const selectedCard = state.cards[state.selectedCardIndex as number];
    return currentCard.pairId === selectedCard.pairId;
  }

  // Update game state based on match result
  function updateGameState(isMatch: boolean) {
    const feedbackType = isMatch ? FEEDBACK.SUCCESS : FEEDBACK.ERROR;

    dispatch({
      type: 'SET_FEEDBACK',
      payload: { feedback: feedbackType },
    });
    dispatch({ type: 'INCREMENT_MOVES' });
    playSound(isMatch ? 'correct' : 'wrong');
  }

  // Process match after delay
  function processMatchAfterDelay(index: number, isMatch: boolean) {
    setTimeout(() => {
      dispatch({
        type: 'PROCESS_MATCH',
        payload: { index, isMatch },
      });
      previousIndex.current = null;
    }, DELAYS.MATCH_PROCESSING);
  }

  // Handle card selection
  function handleCardSelection(index: number) {
    if (!isCardSelectable(index)) {
      return;
    }

    if (state.selectedCardIndex === null) {
      handleFirstCardSelection(index);
    } else {
      handleSecondCardSelection(index);
    }
  }

  // Reset game state
  function resetGameState() {
    refreshDeck();
    dispatch({ type: 'RESET_GAME', payload: { cards: deck } });
  }

  // Exit to main menu
  function exitToMainMenu() {
    playSound('button');
    onExit();
  }

  return {
    state,
    dispatch,
    handleCardSelection,
    resetGameState,
    exitToMainMenu,
  };
}
