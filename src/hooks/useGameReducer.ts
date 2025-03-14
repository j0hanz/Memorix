import { useReducer, useEffect, useCallback, useRef } from 'react';
import { gameReducer, initialGameState } from '@/reducers/gameReducer';
import { useShuffledDeck } from '@/hooks/useShuffledDeck';
import { DELAYS, FEEDBACK, SOUNDS, GAME_CONFIG } from '@/constants/constants';
import { useSoundEffects } from '@/hooks/useSound';

export function useGameReducer(onExit: () => void) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const { deck, refreshDeck } = useShuffledDeck();
  const { playSound } = useSoundEffects();

  // Store previous card index for matching logic
  const previousIndex = useRef<number | null>(null);

  // Initialize game with shuffled deck
  useEffect(() => {
    dispatch({ type: 'INITIALIZE_GAME', payload: { cards: deck } });

    // Start initial reveal sequence
    const revealTimer = setTimeout(() => {
      dispatch({ type: 'REVEAL_ALL_CARDS' });

      const hideTimer = setTimeout(() => {
        dispatch({ type: 'HIDE_ALL_CARDS' });
        dispatch({ type: 'START_TIMER' });
      }, DELAYS.INITIAL_REVEAL_TIME);

      return () => clearTimeout(hideTimer);
    }, DELAYS.INITIAL_REVEAL);

    return () => clearTimeout(revealTimer);
  }, [deck]);

  // Check for game completion
  useEffect(() => {
    if (
      state.matchedPairs === GAME_CONFIG.TOTAL_PAIRS &&
      state.matchedPairs > 0
    ) {
      const timeElapsed = state.startTime
        ? Math.floor((Date.now() - state.startTime) / 1000)
        : 0;

      dispatch({
        type: 'SET_GAME_OVER',
        payload: { completedTime: timeElapsed },
      });
      dispatch({ type: 'TOGGLE_MODAL', payload: { show: true } });
      playSound(SOUNDS.COMPLETE);
    }
  }, [state.matchedPairs, state.startTime, playSound]);

  // Card selection handler
  const handleCardSelection = useCallback(
    (index: number) => {
      if (
        state.isInitialReveal ||
        state.isProcessingMatch ||
        state.cards[index].status.includes('matched') ||
        index === state.selectedCardIndex
      ) {
        return;
      }

      // First card selection
      if (state.selectedCardIndex === null) {
        dispatch({ type: 'SELECT_CARD', payload: { index } });
        previousIndex.current = index;
        playSound(SOUNDS.CLICK);
        return;
      }

      // Second card selection
      dispatch({
        type: 'SET_PROCESSING_MATCH',
        payload: { isProcessing: true },
      });
      dispatch({ type: 'SELECT_CARD', payload: { index } });

      // Check for match
      const currentCard = state.cards[index];
      const selectedCard = state.cards[state.selectedCardIndex];
      const isMatch = currentCard.pairId === selectedCard.pairId;

      // Set feedback and increment moves
      dispatch({
        type: 'SET_FEEDBACK',
        payload: { feedback: isMatch ? FEEDBACK.SUCCESS : FEEDBACK.ERROR },
      });
      dispatch({ type: 'INCREMENT_MOVES' });

      // Play sound based on match result
      playSound(isMatch ? SOUNDS.CORRECT : SOUNDS.WRONG);

      // Process match after delay
      setTimeout(() => {
        dispatch({
          type: 'PROCESS_MATCH',
          payload: { index, isMatch },
        });
        previousIndex.current = null;
      }, DELAYS.MATCH_PROCESSING);
    },
    [
      state.cards,
      state.selectedCardIndex,
      state.isInitialReveal,
      state.isProcessingMatch,
      playSound,
      dispatch,
    ],
  );

  // Reset game state
  const resetGameState = useCallback(() => {
    refreshDeck();
    dispatch({ type: 'RESET_GAME', payload: { cards: deck } });
  }, [refreshDeck, deck]);

  // Exit to main menu
  const exitToMainMenu = useCallback(() => {
    playSound(SOUNDS.BUTTON);
    onExit();
  }, [onExit, playSound]);

  return {
    state,
    dispatch,
    handleCardSelection,
    resetGameState,
    exitToMainMenu,
  };
}
