import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppState } from '@/hooks/useAppState';
import Game from '@/components/Game';
import LoadingSpinner from '@/components/Spinner';
import { GameInstructions, LatestUpdates } from '@/components/Modal';
import { CategorySelection } from '@/components/Modal';
import { GameProvider } from '@/components/GameProvider';
import { useMotions } from '@/hooks/useMotions';
import MainMenu from '@/components/MainMenu';
import { useNavigation } from '@/hooks/useNavigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AuthModal } from '@/components/Modal';
import ProtectedRoute from '@/utils/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

export default function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

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
  const { isAuthenticated } = useAuth();

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
  } = useNavigation({
    setIsLoading,
    setIsGameActive,
    setShowInstructions,
    setShowLatestUpdates,
    setShowCategorySelection,
    setSelectedCategory,
    setShowAuthModal,
  });

  const handleStartGame = () => {
    if (isAuthenticated) {
      startGame();
    } else {
      setShowAuthModal(true);
    }
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
          />
        )}

        {isGameActive && (
          <ProtectedRoute onAuthRequired={() => setShowAuthModal(true)}>
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
          </ProtectedRoute>
        )}

        <GameInstructions show={showInstructions} onClose={closeInstructions} />
        <LatestUpdates show={showLatestUpdates} onClose={closeLatestUpdates} />
        <CategorySelection
          show={showCategorySelection}
          onClose={closeCategorySelection}
          onSelectCategory={handleSelectCategory}
        />
      </ErrorBoundary>
      <AuthModal show={showAuthModal} onClose={closeAuthModal} />
    </Router>
  );
}
