import { useEffect, useState } from 'react';

import { ProfileModal } from '@/components/auth/ProfileModal';
import { AuthModal } from '@/components/AuthModal';
import { CategorySelection } from '@/components/CategorySelection';
import ErrorBoundary from '@/components/ErrorBoundary';
import Game from '@/components/Game';
import { GameInstructions } from '@/components/GameInstructions';
import { LatestUpdates } from '@/components/LatestUpdates';
import { LeaderboardModal } from '@/components/LeaderboardModal';
import MainMenu from '@/components/MainMenu';
import { GameProvider } from '@/components/Provider';
import { LoadingCardSpinner } from '@/components/Spinner';
import { useMotions } from '@/hooks/useMotions';
import { useNavigation, useModal } from '@/hooks/useProvider';

const App = () => {
  const [showInitialLoading, setShowInitialLoading] = useState(false);
  const { enterAnimation } = useMotions();
  const navigation = useNavigation();
  const { openModal, closeModal, activeModal } = useModal();

  const useAuthModal = () => {
    openModal('auth');
  };

  useEffect(() => {
    setShowInitialLoading(false);
  }, []);

  const isLoading = navigation.loading.isLoading;

  return (
    <ErrorBoundary
      onReset={navigation.handleAppReset}
      onError={(error) => {
        console.error('Game error:', error);
      }}
    >
      {isLoading && (
        <LoadingCardSpinner
          isLoading={true}
          message={
            showInitialLoading ? 'Loading...' : navigation.loading.message
          }
        />
      )}
      {!isLoading && (
        <>
          {!navigation.isGameActive && (
            <MainMenu
              startGame={navigation.startGame}
              openInstructions={navigation.openInstructions}
              openLatestUpdates={navigation.openLatestUpdates}
              enterAnimation={enterAnimation}
              openAuthModal={useAuthModal}
              openLeaderboardModal={navigation.openLeaderboardModal}
              handleAccountClick={navigation.handleAccountClick}
            />
          )}

          {navigation.isGameActive && (
            <ErrorBoundary
              onReset={navigation.handleAppReset}
              onError={(error) => {
                console.error('Game error:', error);
              }}
            >
              <GameProvider
                onExit={navigation.handleExit}
                selectedCategory={navigation.selectedCategory}
              >
                <Game onRestart={navigation.handleRestart} />
              </GameProvider>
            </ErrorBoundary>
          )}

          {/* Modals */}
          <GameInstructions
            show={activeModal === 'instructions'}
            onClose={closeModal}
          />
          <LatestUpdates
            show={activeModal === 'latestUpdates'}
            onClose={closeModal}
          />
          <CategorySelection
            show={activeModal === 'categorySelection'}
            onClose={closeModal}
            onSelectCategory={navigation.handleSelectCategory}
          />
          <LeaderboardModal
            show={navigation.showLeaderboardModal}
            onClose={navigation.closeLeaderboardModal}
          />
          <ProfileModal
            show={activeModal === 'profile'}
            onClose={closeModal}
            logout={navigation.handleLogout}
          />
          <AuthModal show={activeModal === 'auth'} onClose={closeModal} />
        </>
      )}
    </ErrorBoundary>
  );
};

export default App;
