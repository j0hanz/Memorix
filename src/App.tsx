import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ProfileModal } from '@/components/auth/ProfileModal';
import { AuthModal } from '@/components/AuthModal';
import { CategorySelection } from '@/components/CategorySelection';
import ErrorBoundary from '@/components/ErrorBoundary';
import Game from '@/components/Game';
import { GameInstructions } from '@/components/GameInstructions';
import { GameProvider } from '@/components/GameProvider';
import { LatestUpdates } from '@/components/LatestUpdates';
import { LeaderboardModal } from '@/components/LeaderboardModal';
import MainMenu from '@/components/MainMenu';
import { LoadingCardSpinner } from '@/components/Spinner';
import { useAppState } from '@/hooks/useAppState';
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';
import { useMotions } from '@/hooks/useMotions';
import { useNavigation } from '@/hooks/useNavigation';

const App = () => {
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showInitialLoading, setShowInitialLoading] = useState(true);

  const { logout, isAuthenticated } = useAuth();

  // Get app state and handlers
  const {
    isGameActive,
    isLoading,
    selectedCategory,
    setIsLoading,
    setIsGameActive,
    setSelectedCategory,
  } = useAppState();

  // Get modal state and handlers
  const { enterAnimation } = useMotions();
  const { activeModal, closeModal, openModal } = useModal();

  const useAuthModal = () => {
    openModal('auth');
  };

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
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
