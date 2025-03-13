import { GAME_CONFIG, SOUNDS } from '@/constants/constants';
import { GameHandlerOptions } from '@/types/hooks';
import { useSoundEffects } from './useSound';

export const useNavigation = ({
  setIsLoading,
  setIsGameActive,
  setShowInstructions,
  setShowLatestUpdates,
}: GameHandlerOptions) => {
  const { playSound } = useSoundEffects();

  // Common loading logic with sound
  const showLoadingAndStartGame = (callback?: () => void) => {
    playSound(SOUNDS.BUTTON);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsGameActive(true);
      callback?.();
    }, GAME_CONFIG.LOADING_DELAY);
  };

  // Start a new game with loading screen
  const startGame = () => showLoadingAndStartGame();

  // Restart game with loading screen
  const handleRestart = () => {
    playSound(SOUNDS.BUTTON);
    setIsGameActive(false);
    showLoadingAndStartGame();
  };

  // Exit to main menu
  const handleExit = () => {
    playSound(SOUNDS.BUTTON);
    setIsGameActive(false);
  };

  // Modal control functions
  const openInstructions = () => {
    playSound(SOUNDS.BUTTON);
    setShowInstructions(true);
  };

  // Close instructions modal
  const closeInstructions = () => {
    playSound(SOUNDS.BUTTON);
    setShowInstructions(false);
  };

  // Open latest updates modal
  const openLatestUpdates = () => {
    playSound(SOUNDS.BUTTON);
    setShowLatestUpdates(true);
  };

  // Close latest updates modal
  const closeLatestUpdates = () => {
    playSound(SOUNDS.BUTTON);
    setShowLatestUpdates(false);
  };

  return {
    startGame,
    handleRestart,
    handleExit,
    openInstructions,
    closeInstructions,
    openLatestUpdates,
    closeLatestUpdates,
  };
};
