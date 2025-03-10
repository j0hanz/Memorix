import { useState } from 'react';
import Game from '@/components/Game';
import LoadingSpinner from '@/components/Spinner';
import { GameInstructions, LatestUpdates } from '@/components/Modal';
import { useGameHandlers } from '@/hooks/useGameHandlers';
import { GameProvider } from '@/contexts/GameProvider';
import { usePageTransition } from '@/hooks/usePageTransition';
import MainMenu from '@/components/MainMenu';

export default function App() {
  // App state for game control
  const [appState, setAppState] = useState({
    isGameActive: false,
    isLoading: false,
    showInstructions: false,
    showLatestUpdates: false,
  });

  // Get page transition animations
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
    setIsLoading: (val) =>
      setAppState((prev) => ({
        ...prev,
        isLoading: typeof val === 'function' ? val(prev.isLoading) : val,
      })),
    setIsGameActive: (val) =>
      setAppState((prev) => ({
        ...prev,
        isGameActive: typeof val === 'function' ? val(prev.isGameActive) : val,
      })),
    setShowInstructions: (val) =>
      setAppState((prev) => ({
        ...prev,
        showInstructions:
          typeof val === 'function' ? val(prev.showInstructions) : val,
      })),
    setShowLatestUpdates: (val) =>
      setAppState((prev) => ({
        ...prev,
        showLatestUpdates:
          typeof val === 'function' ? val(prev.showLatestUpdates) : val,
      })),
  });

  // Render components based on app state
  const { isLoading, isGameActive, showInstructions, showLatestUpdates } =
    appState;
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
