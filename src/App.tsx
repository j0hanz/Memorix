import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
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
import AuthPage from '@/components/auth/AuthPage';
import ProtectedRoute from '@/utils/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

export default function App() {
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

          <Routes>
            <Route
              path="/auth"
              element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />}
            />

            <Route
              path="/game"
              element={
                <ProtectedRoute>
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
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                !isLoading && !isGameActive ? (
                  <MainMenu
                    startGame={startGame}
                    openInstructions={openInstructions}
                    openLatestUpdates={openLatestUpdates}
                    enterAnimation={enterAnimation}
                  />
                ) : (
                  <Navigate to={isGameActive ? '/game' : '/'} />
                )
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

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
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}
