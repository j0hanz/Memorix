import { GAME_CONFIG, SOUNDS } from '@/constants/constants';
import { GameHandlerOptions } from '@/types/hooks';
import { useSoundEffects } from './useSound';

export const useNavigation = ({
  setIsLoading,
  setIsGameActive,
  setShowInstructions,
  setShowLatestUpdates,
  setShowCategorySelection,
  setSelectedCategory,
  setShowAuthModal,
}: GameHandlerOptions & { setShowAuthModal: (value: boolean) => void }) => {
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

  // Close the auth modal
  const closeAuthModal = () => {
    playSound(SOUNDS.BUTTON);
    setShowAuthModal(false);
  };

  // Start game with category selection
  const startGame = () => {
    playSound(SOUNDS.BUTTON);
    setShowCategorySelection(true);
  };

  // Start game with selected category
  const startGameWithCategory = () => {
    setShowCategorySelection(false);
    showLoadingAndStartGame();
  };

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

  // Handle app-level error recovery
  const handleAppReset = () => {
    playSound(SOUNDS.BUTTON);
    setIsGameActive(false);
    setIsLoading(false);
  };

  // Handle game-specific error recovery
  const handleGameReset = () => {
    playSound(SOUNDS.BUTTON);
    handleRestart();
  };

  // Handle category selection
  const handleSelectCategory = (category: string) => {
    playSound(SOUNDS.BUTTON);
    setSelectedCategory(category);
    startGameWithCategory();
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

  // Close category selection modal
  const closeCategorySelection = () => {
    playSound(SOUNDS.BUTTON);
    setShowCategorySelection(false);
  };

  return {
    startGame,
    startGameWithCategory,
    handleRestart,
    handleExit,
    handleAppReset,
    handleGameReset,
    handleSelectCategory,
    openInstructions,
    closeInstructions,
    closeAuthModal,
    openLatestUpdates,
    closeLatestUpdates,
    closeCategorySelection,
  };
};
