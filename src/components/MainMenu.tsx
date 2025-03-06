import { motion, Variants } from 'framer-motion';
import StartButton from '@/components/StartButton';
import InstructionsButton from '@/components/InstructionsButton';
import SocialLinks from '@/components/SocialLinks';
import styles from '@/App.module.css';

interface MainMenuProps {
  startGame: () => void;
  openInstructions: () => void;
  openLatestUpdates: () => void;
  pageVariants: Variants;
  pageTransition: object;
}

export default function MainMenu({
  startGame,
  openInstructions,
  openLatestUpdates,
  pageVariants,
  pageTransition,
}: MainMenuProps) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className={styles.menu}>
        <div className={styles.gameTitle}>Memorix</div>
        <StartButton onClick={startGame} />
        <InstructionsButton onClick={openInstructions} />
        <SocialLinks onLatestUpdatesClick={openLatestUpdates} />
      </div>
    </motion.div>
  );
}
