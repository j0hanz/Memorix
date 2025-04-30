import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppState } from '@/hooks/useAppState';
import Game from '@/components/Game';
import LoadingSpinner from '@/components/Spinner';
import {
  GameInstructions,
  LatestUpdates,
  LeaderboardModal,
} from '@/components/ModalComponents';
import { CategorySelection } from '@/components/ModalComponents';
import { GameProvider } from '@/components/GameProvider';
import { useMotions } from '@/hooks/useMotions';
import MainMenu from '@/components/MainMenu';
import { useNavigation } from '@/hooks/useNavigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AuthModal } from '@/components/ModalComponents';

export default function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);

  // Get app state and handlers
  const {
    isGameActive,
    isLoading,
    showInstructions,
    showLatestUpdates,
    showCategorySelection,
    selectedCategory,
    setIsLoading,
    setIsGameActive,
    setShowInstructions,
    setShowLatestUpdates,
    setShowCategorySelection,
    setSelectedCategory,
  } = useAppState();

  // Get animations and sounds
  const { enterAnimation } = useMotions();

  // Destructure game handlers
  const {
    startGame,
    handleRestart,
    handleExit,
    handleAppReset,
    handleGameReset,
    handleSelectCategory,
    openInstructions,
    closeInstructions,
    openLatestUpdates,
    closeLatestUpdates,
    closeCategorySelection,
    closeAuthModal,
    openLeaderboardModal,
    closeLeaderboardModal,
  } = useNavigation({
    setIsLoading,
    setIsGameActive,
    setShowInstructions,
    setShowLatestUpdates,
    setShowCategorySelection,
    setSelectedCategory,
    setShowAuthModal,
    setShowLeaderboardModal,
  });

  const handleStartGame = () => {
    startGame();
  };

  return (
    <Router>
      <ErrorBoundary
        onReset={handleAppReset}
        onError={(error) => {
          console.error('Application error:', error);
        }}
      >
        <LoadingSpinner isLoading={isLoading} />

        {!isLoading && !isGameActive && (
          <MainMenu
            startGame={handleStartGame}
            openInstructions={openInstructions}
            openLatestUpdates={openLatestUpdates}
            enterAnimation={enterAnimation}
            openAuthModal={() => setShowAuthModal(true)}
            openLeaderboardModal={openLeaderboardModal}
          />
        )}
        {isGameActive && (
          <ErrorBoundary
            onReset={handleGameReset}
            onError={(error) => {
              console.error('Game error:', error);
            }}
          >
            <GameProvider
              onExit={handleExit}
              selectedCategory={selectedCategory}
            >
              <Game onRestart={handleRestart} />
            </GameProvider>
          </ErrorBoundary>
        )}

        <GameInstructions show={showInstructions} onClose={closeInstructions} />
        <LatestUpdates show={showLatestUpdates} onClose={closeLatestUpdates} />
        <CategorySelection
          show={showCategorySelection}
          onClose={closeCategorySelection}
          onSelectCategory={handleSelectCategory}
        />
        <LeaderboardModal
          show={showLeaderboardModal}
          onClose={closeLeaderboardModal}
        />
      </ErrorBoundary>
      <AuthModal show={showAuthModal} onClose={closeAuthModal} />
    </Router>
  );
}
