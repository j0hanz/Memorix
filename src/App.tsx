import { useAppState } from '@/hooks/useAppState';
import Game from '@/components/Game';
import LoadingSpinner from '@/components/Spinner';
import { GameInstructions, LatestUpdates } from '@/components/Modal';
import { GameProvider } from '@/components/GameProvider';
import { useMotions } from '@/hooks/useMotions';
import MainMenu from '@/components/MainMenu';
import { useNavigation } from '@/hooks/useNavigation';

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

  // Get animations
  const { enterAnimation } = useMotions();

  // Destructure game handlers
  const {
    startGame,
    handleRestart,
    handleExit,
    openInstructions,
    closeInstructions,
    openLatestUpdates,
    closeLatestUpdates,
  } = useNavigation({
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
          enterAnimation={enterAnimation}
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
