import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppState } from '@/hooks/useAppState';
import { useMotions } from '@/hooks/useMotions';
import { useNavigation } from '@/hooks/useNavigation';
import Game from '@/components/Game';
import { LoadingCardSpinner } from '@/components/Spinner';
import { GameInstructions } from '@/components/GameInstructions';
import { LatestUpdates } from '@/components/LatestUpdates';
import { LeaderboardModal } from '@/components/LeaderboardModal';
import { CategorySelection } from '@/components/CategorySelection';
import { AuthModal } from '@/components/AuthModal';
import { ProfileModal } from '@/components/auth/ProfileModal';
import { GameProvider } from '@/components/GameProvider';
import MainMenu from '@/components/MainMenu';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/hooks/useAuth';
import Toast from '@/components/Toast';

const App = () => {
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showInitialLoading, setShowInitialLoading] = useState(true);

  // Toast state for auth status
  const { logout, isAuthenticated } = useAuth();
  const [showAuthToast, setShowAuthToast] = useState(false);
  const [authMessage, setAuthMessage] = useState('');

  // Get app state and handlers
  const {
    isGameActive,
    isLoading,
    selectedCategory,
    setIsLoading,
    setIsGameActive,
    setSelectedCategory,
  } = useAppState();

  // Get animations and sounds
  const { enterAnimation } = useMotions();
  const { activeModal, closeModal, openModal } = useModal();

  const useAuthModal = () => openModal('auth');

  const {
    startGame,
    handleRestart,
    handleExit,
    handleAppReset,
    handleSelectCategory,
    openInstructions,
    closeInstructions,
    openLatestUpdates,
    closeLatestUpdates,
    closeCategorySelection,
    openLeaderboardModal,
    closeLeaderboardModal,
    handleLogout,
    handleAccountClick,
  } = useNavigation({
    setIsLoading,
    setIsGameActive,
    setSelectedCategory,
    setShowLeaderboardModal,
    logout,
    isAuthenticated,
  });

  const handleStartGame = () => {
    startGame();
  };

  useEffect(() => {
    setShowInitialLoading(true);
    const timer = setTimeout(() => {
      setShowInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle authentication status changes
  useEffect(() => {
    if (isAuthenticated) {
      setAuthMessage('Logged in');
      setShowAuthToast(true);
      const timer = setTimeout(() => setShowAuthToast(false), 2000);
      return () => clearTimeout(timer);
    }
    setShowAuthToast(false);
  }, [isAuthenticated]);

  return (
    <Router>
      <ErrorBoundary
        onReset={handleAppReset}
        onError={(error) => {
          console.error('Application error:', error);
        }}
      >
        <LoadingCardSpinner
          isLoading={showInitialLoading}
          message="Loading..."
        />
        <LoadingCardSpinner
          isLoading={!showInitialLoading && isLoading}
          message={isLoading ? 'Starting...' : undefined}
        />
        <Toast
          message={authMessage}
          show={showAuthToast}
          placement="top"
          onClose={() => setShowAuthToast(false)}
        />
        {!showInitialLoading && !isLoading && !isGameActive && (
          <MainMenu
            startGame={handleStartGame}
            openInstructions={openInstructions}
            openLatestUpdates={openLatestUpdates}
            enterAnimation={enterAnimation}
            openAuthModal={useAuthModal}
            openLeaderboardModal={openLeaderboardModal}
            handleAccountClick={handleAccountClick}
          />
        )}
        {isGameActive && !showInitialLoading && (
          <ErrorBoundary
            onReset={handleAppReset}
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
        <GameInstructions
          show={activeModal === 'instructions'}
          onClose={closeInstructions}
        />
        <LatestUpdates
          show={activeModal === 'latestUpdates'}
          onClose={closeLatestUpdates}
        />
        <CategorySelection
          show={activeModal === 'categorySelection'}
          onClose={closeCategorySelection}
          onSelectCategory={handleSelectCategory}
        />
        <LeaderboardModal
          show={showLeaderboardModal}
          onClose={closeLeaderboardModal}
        />
        <ProfileModal
          show={activeModal === 'profile'}
          onClose={closeModal}
          logout={handleLogout}
        />
        <AuthModal show={activeModal === 'auth'} onClose={closeModal} />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
