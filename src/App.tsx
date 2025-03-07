import { useState } from 'react';
import Game from '@/components/Game';
import LoadingSpinner from '@/components/Spinner';
import { GameInstructions, LatestUpdates } from '@/components/Modal';
import { useGameHandlers } from '@/hooks/useGameHandlers';
import { motion } from 'framer-motion';
import { GameProvider } from '@/contexts/GameProvider';
import { usePageTransition } from '@/hooks/usePageTransition';
import MainMenu from '@/components/MainMenu';

export default function App() {
  // State for controlling application flow and UI visibility
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showLatestUpdates, setShowLatestUpdates] = useState<boolean>(false);

  // Get animation settings for page transitions
  const { pageVariants, pageTransition } = usePageTransition();

  // Get game control functions from custom hook
  const {
    startGame,
    handleRestart,
    handleExit,
    openInstructions,
    closeInstructions,
    openLatestUpdates,
    closeLatestUpdates,
  } = useGameHandlers({
    setIsLoading,
    setIsGameActive,
    setShowInstructions,
    setShowLatestUpdates,
  });

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      {!isLoading && !isGameActive && (
        <MainMenu
          startGame={startGame}
          openInstructions={openInstructions}
          openLatestUpdates={openLatestUpdates}
          pageVariants={pageVariants}
          pageTransition={pageTransition}
        />
      )}
      {isGameActive && (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <GameProvider onExit={handleExit}>
            <Game onRestart={handleRestart} />
          </GameProvider>
        </motion.div>
      )}
      <GameInstructions show={showInstructions} onClose={closeInstructions} />
      <LatestUpdates show={showLatestUpdates} onClose={closeLatestUpdates} />
    </>
  );
}
