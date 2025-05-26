import { useEffect, useState } from 'react';

import { Game } from '@/components/game/Game';
import { ModalRegistry } from '@/components/modals/ModalRegistry';
import { MainMenu } from '@/components/navigation/MainMenu';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { GameProvider } from '@/components/ui/Provider';
import { LoadingCardSpinner } from '@/components/ui/Spinner';
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
              enterAnimation={{
                initial: enterAnimation.variants.initial,
                animate: enterAnimation.variants.animate,
                transition: enterAnimation.transition,
              }}
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
