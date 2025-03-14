import { useAppState } from '@/hooks/useAppState';
import Game from '@/components/Game';
import LoadingSpinner from '@/components/Spinner';
import { GameInstructions, LatestUpdates } from '@/components/Modal';
import { GameProvider } from '@/components/GameProvider';
import { useMotions } from '@/hooks/useMotions';
import MainMenu from '@/components/MainMenu';
import { useNavigation } from '@/hooks/useNavigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useSoundEffects } from '@/hooks/useSound';
import { SOUNDS } from '@/constants/constants';

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

  // Get animations and sounds
  const { enterAnimation } = useMotions();
  const { playSound } = useSoundEffects();

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

  return (
    <ErrorBoundary
      onReset={handleAppReset}
      onError={(error) => {
        console.error("Application error:", error);
      }}
    >
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
        <ErrorBoundary
          onReset={handleGameReset}
          onError={(error) => {
            console.error("Game error:", error);
          }}
        >
          <GameProvider onExit={handleExit}>
            <Game onRestart={handleRestart} />
          </GameProvider>
        </ErrorBoundary>
      )}

      <GameInstructions show={showInstructions} onClose={closeInstructions} />
      <LatestUpdates show={showLatestUpdates} onClose={closeLatestUpdates} />
    </ErrorBoundary>
  );
}
