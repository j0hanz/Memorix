import { useAppState } from '@/hooks/useAppState';
import Game from '@/components/Game';
import LoadingSpinner from '@/components/Spinner';
import { GameInstructions, LatestUpdates } from '@/components/Modal';
import { useGameHandlers } from '@/hooks/useGameHandlers';
import { GameProvider } from '@/contexts/GameProvider';
import { usePageTransition } from '@/hooks/usePageTransition';
import MainMenu from '@/components/MainMenu';

export default function App() {
  // Get app state and handlers
  const {
    isGameActive,
    isLoading,
    showInstructions,
    showLatestUpdates,
    setIsLoading,
    setIsGameActive,
    setShowInstructions,
    setShowLatestUpdates,
  } = useAppState();

  // Get page transition values
  const { pageVariants, pageTransition } = usePageTransition();

  // Destructure game handlers
  const {
    startGame,
    handleRestart,
    handleExit,
    openInstructions,
    closeInstructions,
    openLatestUpdates,
    closeLatestUpdates,
  } = useGameHandlers({
    setIsLoading,
    setIsGameActive,
    setShowInstructions,
    setShowLatestUpdates,
  });

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      {!isLoading && !isGameActive && (
        <MainMenu
          startGame={startGame}
          openInstructions={openInstructions}
          openLatestUpdates={openLatestUpdates}
          pageVariants={pageVariants}
          pageTransition={pageTransition}
        />
      )}
      {isGameActive && (
        <GameProvider onExit={handleExit}>
          <Game onRestart={handleRestart} />
        </GameProvider>
      )}
      <GameInstructions show={showInstructions} onClose={closeInstructions} />
      <LatestUpdates show={showLatestUpdates} onClose={closeLatestUpdates} />
    </>
  );
}
