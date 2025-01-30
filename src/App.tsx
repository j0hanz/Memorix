import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global/variables.css';
import { Button } from 'react-bootstrap';
import styles from './styles/global/App.module.css';
import Game from './components/Game';
import LoadingSpinner from './components/Spinner';
import { GameInstructions, LatestUpdates } from './components/Modal';
import StartButton from './components/StartButton';
import InstructionsButton from './components/InstructionsButton';
import { handleButtonClick } from './utils/soundManager';
import { HiNewspaper } from 'react-icons/hi2';
import { LiaGithub } from 'react-icons/lia';
import { useGameHandlers } from './utils/gameHandlers';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showLatestUpdates, setShowLatestUpdates] = useState<boolean>(false);

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

  const pageVariants: Record<string, object> = {
    initial: {
      opacity: 0,
      scale: 0.7,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 0.7,
    },
  };

  const pageTransition: object = {
    type: 'spring',
    stiffness: 50,
    damping: 20,
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      {!isLoading && !isGameActive && (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="d-flex flex-column align-items-center"
        >
          <div className={styles.gameTitle}>
            Pick <span className={styles.symbol}>&</span> Pair
          </div>
          <StartButton onClick={startGame} />
          <InstructionsButton onClick={openInstructions} />
          <div className={`${styles.smallButtonsDiv} my-4`}>
            <Button
              onClick={handleButtonClick(openLatestUpdates)}
              className={styles.btnUpdates}
            >
              <HiNewspaper />
            </Button>
            <Button
              onClick={() =>
                window.open('https://github.com/j0hanz/pick-and-pair', '_blank')
              }
              className={styles.btnUpdates}
            >
              <LiaGithub />
            </Button>
          </div>
        </motion.div>
      )}
      {isGameActive && (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Game
            onRestart={handleRestart}
            onExit={handleExit}
            startGame={startGame}
          />
        </motion.div>
      )}
      <GameInstructions show={showInstructions} onClose={closeInstructions} />
      <LatestUpdates show={showLatestUpdates} onClose={closeLatestUpdates} />
    </>
  );
}

export default App;
