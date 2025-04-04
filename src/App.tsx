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
import { useSoundEffects } from '@/hooks/useSound';
import { SOUNDS } from '@/constants/constants';
import { AuthProvider } from '@/contexts/AuthProvider';
import AuthModal from '@/components/auth/AuthModal';
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
  const { playSound } = useSoundEffects();
  const { isAuthenticated } = useAuth();

  // Destructure game handlers
  const {
    startGame,
    startGameWithCategory,
    handleRestart,
    handleExit,
    openInstructions,
    closeInstructions,
    openLatestUpdates,
    closeLatestUpdates,
    closeCategorySelection,
  } = useNavigation({
    setIsLoading,
    setIsGameActive,
    setShowInstructions,
    setShowLatestUpdates,
    setShowCategorySelection,
    setSelectedCategory,
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

  // Handle category selection
  const handleSelectCategory = (category: string) => {
    playSound(SOUNDS.BUTTON);
    setSelectedCategory(category);
    startGameWithCategory();
  };

  // Handle starting a game (check authentication first)
  const handleStartGame = () => {
    if (isAuthenticated) {
      startGame();
    } else {
      playSound(SOUNDS.BUTTON);
      setShowAuthModal(true);
    }
  };

  // Close the auth modal
  const closeAuthModal = () => {
    playSound(SOUNDS.BUTTON);
    setShowAuthModal(false);
  };

  return (
    <Router>
      <AuthProvider>
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

          <GameInstructions
            show={showInstructions}
            onClose={closeInstructions}
          />
          <LatestUpdates
            show={showLatestUpdates}
            onClose={closeLatestUpdates}
          />
          <CategorySelection
            show={showCategorySelection}
            onClose={closeCategorySelection}
            onSelectCategory={handleSelectCategory}
          />
          <AuthModal show={showAuthModal} onClose={closeAuthModal} />
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}
