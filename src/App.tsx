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
import { ProfileModal } from '@/components/ProfileModal';
import { GameProvider } from '@/components/GameProvider';
import MainMenu from '@/components/MainMenu';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/hooks/useAuth';

const App = () => {
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showInitialLoading, setShowInitialLoading] = useState(true);

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

  const { activeModal, closeModal, openModal } = useModal();
  const { logout, isAuthenticated } = useAuth();

  const useAuthModal = () => openModal('auth');

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
    openLeaderboardModal,
    closeLeaderboardModal,
    handleLogout,
    handleAccountClick,
  } = useNavigation({
    setIsLoading,
    setIsGameActive,
    setShowInstructions,
    setShowLatestUpdates,
    setShowCategorySelection,
    setSelectedCategory,
    setShowAuthModal: useAuthModal,
    setShowLeaderboardModal,
    logout,
    isAuthenticated,
    openModal,
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
