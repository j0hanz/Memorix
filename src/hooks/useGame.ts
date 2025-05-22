import clsx from 'clsx';
import { useCallback, useEffect, useReducer, useRef } from 'react';

import {
  CARD_STATUS,
  CATEGORIES,
  DELAYS,
  FEEDBACK,
  GAME_CONFIG,
  TIMER,
} from '@/constants/constants';
import { useDeck } from '@/hooks/useDeck';
import { useSound } from '@/hooks/useProvider';
import { gameReducer, initialGameState } from '@/reducers/gameReducer';
import type { CardData } from '@/types/data';
import type { CSSModuleClasses } from '@/types/hooks';

export function useGame(
  onExit: () => void,
  selectedCategory = CATEGORIES.ANIMALS,
) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const { deck, refreshDeck } = useDeck(selectedCategory);
  const { playSound } = useSound();
  const previousIndex = useRef<number | null>(null);

  // Initialize the game board and reveal sequence
  const initializeGame = useCallback((): (() => void) => {
    dispatch({ type: 'INITIALIZE_GAME', payload: { cards: deck } });

    // Start initial reveal sequence
    const revealTimer = setTimeout(() => {
      dispatch({ type: 'REVEAL_ALL_CARDS' });

      const hideTimer = setTimeout(() => {
        dispatch({ type: 'HIDE_ALL_CARDS' });
        dispatch({ type: 'START_TIMER' });
      }, DELAYS.INITIAL_REVEAL_TIME);

      // Return cleanup function for hideTimer
      return () => {
        clearTimeout(hideTimer);
      };
    }, DELAYS.INITIAL_REVEAL);

    // Return cleanup function for revealTimer
    return () => {
      clearTimeout(revealTimer);
    };
  }, [deck]);

  // Initialize game with shuffled deck
  useEffect(() => {
    const cleanup = initializeGame();
    return cleanup;
  }, [initializeGame]);

  // Check for game completion
  useEffect(() => {
    function calculateElapsedTime(): number {
      return state.startTime
        ? Math.floor((Date.now() - state.startTime) / TIMER.INTERVAL)
        : 0;
    }

    function setGameOver(completedTime: number): void {
      dispatch({
        type: 'SET_GAME_OVER',
        payload: { completedTime },
      });
      dispatch({ type: 'TOGGLE_MODAL', payload: { show: true } });
    }

    if (
      state.matchedPairs === GAME_CONFIG.TOTAL_PAIRS &&
      state.matchedPairs > 0
    ) {
      const timeElapsed = calculateElapsedTime();
      setGameOver(timeElapsed);
      playSound('complete');
    }
  }, [state.matchedPairs, playSound, state.startTime]);

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
  function handleFirstCardSelection(index: number): void {
    dispatch({ type: 'SELECT_CARD', payload: { index } });
    previousIndex.current = index;
    playSound('click');
  }

  // Handle second card selection
  function handleSecondCardSelection(index: number): void {
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
  function updateGameState(isMatch: boolean): void {
    const feedbackType = isMatch ? FEEDBACK.SUCCESS : FEEDBACK.ERROR;

    dispatch({
      type: 'SET_FEEDBACK',
      payload: { feedback: feedbackType },
    });
    dispatch({ type: 'INCREMENT_MOVES' });
    playSound(isMatch ? 'correct' : 'wrong');
  }

  // Process match after delay
  function processMatchAfterDelay(index: number, isMatch: boolean): void {
    setTimeout(() => {
      dispatch({
        type: 'PROCESS_MATCH',
        payload: { index, isMatch },
      });
      previousIndex.current = null;
    }, DELAYS.MATCH_PROCESSING);
  }

  // Handle card selection
  function selectCard(index: number): void {
    if (!isCardSelectable(index)) {
      return;
    }

    if (state.selectedCardIndex === null) {
      handleFirstCardSelection(index);
    } else {
      handleSecondCardSelection(index);
    }
  }

  // Handle card click with fallback logic
  function handleCardClick(
    index: number,
    clickHandler?: (index: number) => void,
    card?: CardData,
    imageLoaded?: boolean,
    imageError?: boolean,
  ): void {
    const clickable = isCardClickable(card, index, imageLoaded, imageError);
    if (!clickable || typeof index !== 'number') {
      return;
    }
    if (clickHandler) {
      clickHandler(index);
    } else {
      selectCard(index);
    }
  }

  // Reset game state
  function resetGame(): void {
    refreshDeck();
    dispatch({ type: 'RESET_GAME', payload: { cards: deck } });
  }

  // Exit to main menu
  function exitGame(): void {
    playSound('button');
    onExit();
  }

  // Utility functions with proper return types
  function getCardAnimation(card?: CardData): string {
    if (!card) return 'hidden';
    if (card.status === CARD_STATUS.MATCHED) return 'matched';
    if (card.status === CARD_STATUS.ACTIVE) return 'active';
    return 'hidden';
  }

  function getCardFrontAnimation(card?: CardData): string {
    if (!card) return 'initial';
    if (card.status === CARD_STATUS.MATCHED) return 'matched';
    if (card.status === CARD_STATUS.ACTIVE) return 'flipped';
    return 'initial';
  }

  function getCardStyleClasses(
    styles: CSSModuleClasses,
    card?: CardData,
    imageLoaded?: boolean,
    imageError?: boolean,
  ): string {
    return clsx(styles.card, {
      [styles.loading]: !imageLoaded && !imageError,
      [styles.matched]: card?.status.includes(CARD_STATUS.MATCHED),
      [styles.active]: card?.status === CARD_STATUS.ACTIVE,
    });
  }

  function getStatsTopClass(
    styles: CSSModuleClasses,
    feedback?: string,
  ): string {
    return clsx(styles.statsTop, {
      [styles.statsTopSuccess]: feedback === FEEDBACK.SUCCESS,
      [styles.statsTopError]: feedback === FEEDBACK.ERROR,
    });
  }

  function isCardClickable(
    card?: CardData,
    index?: number,
    imageLoaded?: boolean,
    imageError?: boolean,
  ): boolean {
    return !!(
      card &&
      typeof index === 'number' &&
      (imageLoaded || imageError) &&
      !state.isInitialReveal &&
      !card.status.includes(CARD_STATUS.MATCHED) &&
      !state.isProcessingMatch
    );
  }

  return {
    // Game state
    ...state,

    // Game actions
    selectCard,
    handleCardSelection: selectCard,
    handleCardClick,
    resetGame,
    resetGameState: resetGame,
    exitGame,
    exitToMainMenu: exitGame,
    isCardSelectable,

    // Utility functions
    getCardAnimation,
    getCardFrontAnimation,
    getCardStyleClasses,
    getStatsTopClass,
    isCardClickable,

    // Direct reducer dispatch
    dispatch,
  };
}
