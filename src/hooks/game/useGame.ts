import { useEffect, useReducer, useRef } from 'react';

import {
  CATEGORIES,
  DELAYS,
  FEEDBACK,
  GAME_CONFIG,
  TIMER,
} from '@/constants/game';
import { useDeck } from '@/hooks/game/useDeck';
import { useSound } from '@/hooks/shared/useProvider';
import { gameReducer, initialGameState } from '@/reducers/gameReducer';
import type { CardData } from '@/types/data';
import { isCardClickable } from '@/utils/game/cardUtils';
import { gameActions } from '@/utils/game/gameActions';

export function useGame(
  onExit: () => void,
  selectedCategory = CATEGORIES.ANIMALS,
) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const { deck, refreshDeck } = useDeck(selectedCategory);
  const { playSound } = useSound();
  const previousIndex = useRef<number | null>(null);

  useEffect(() => {
    // Initialize the game with the selected deck
    const initializeGame = (): (() => void) => {
      dispatch(gameActions.initializeGame(deck));
      // Set initial game state
      let hideTimer: ReturnType<typeof setTimeout>;
      const revealTimer = setTimeout(() => {
        dispatch(gameActions.revealAllCards());
        hideTimer = setTimeout(() => {
          dispatch(gameActions.hideAllCards());
          dispatch(gameActions.startTimer());
        }, DELAYS.INITIAL_REVEAL_TIME);
      }, DELAYS.INITIAL_REVEAL);
      // Cleanup both timers
      return () => {
        clearTimeout(revealTimer);
        if (hideTimer) clearTimeout(hideTimer);
      };
    };

    const cleanup = initializeGame();
    return cleanup;
  }, [deck]);

  // Check for game completion
  useEffect(() => {
    function calculateElapsedTime(): number {
      return state.startTime
        ? Math.floor((Date.now() - state.startTime) / TIMER.INTERVAL)
        : 0;
    }

    function setGameOver(completedTime: number): void {
      dispatch(gameActions.setGameOver(completedTime));
      dispatch(gameActions.toggleModal(true));
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
    dispatch(gameActions.selectCard(index));
    previousIndex.current = index;
    playSound('click');
  }

  // Handle second card selection
  function handleSecondCardSelection(index: number): void {
    dispatch(gameActions.setProcessingMatch(true));
    dispatch(gameActions.selectCard(index));

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

    dispatch(gameActions.setFeedback(feedbackType));
    dispatch(gameActions.incrementMoves());
    playSound(isMatch ? 'correct' : 'wrong');
  }

  // Process match after delay
  function processMatchAfterDelay(index: number, isMatch: boolean): void {
    setTimeout(() => {
      dispatch(gameActions.processMatch(index, isMatch));
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
    const clickable = isCardClickable(
      card,
      index,
      imageLoaded,
      imageError,
      state.isInitialReveal,
      state.isProcessingMatch,
    );
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
    dispatch(gameActions.resetGame(deck));
  }

  // Exit to main menu
  function exitGame(): void {
    playSound('button');
    onExit();
  }

  return {
    ...state,
    selectCard,
    handleCardClick,
    resetGame,
    exitGame,
    isCardSelectable,
    dispatch,
  };
}
