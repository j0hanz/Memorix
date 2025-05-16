import { useEffect, useState } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Game } from '@/components/Game';
import { MainMenu } from '@/components/MainMenu';
import { ModalRegistry } from '@/components/ModalRegistry';
import { GameProvider } from '@/components/Provider';
import { LoadingCardSpinner } from '@/components/Spinner';
import { useMotions } from '@/hooks/useMotions';
import { useModal, useNavigation } from '@/hooks/useProvider';

export const App = () => {
  const [showInitialLoading, setShowInitialLoading] = useState(false);
  const { enterAnimation } = useMotions();
  const navigation = useNavigation();
  const { openModal } = useModal();

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
          <ModalRegistry />
        </>
      )}
    </ErrorBoundary>
  );
};
