import { motion, Variants } from 'framer-motion';
import Button from '@/components/Button';
import { useState, useEffect } from 'react';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from '@/App.module.css';
import { getMuteState, toggleMuteState } from '@/utils/soundManager';

interface MainMenuProps {
  startGame: () => void;
  openInstructions: () => void;
  openLatestUpdates: () => void;
  pageVariants: Variants;
  pageTransition: object;
}

// Internal component definitions
function StartButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className={styles.btnStart}
      icon={<PlayCircleOutlineOutlinedIcon />}
    >
      Start Game
    </Button>
  );
}

function InstructionsButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className={styles.btnGuide}
      icon={<InfoOutlinedIcon />}
    >
      Guide
    </Button>
  );
}

function SocialLinks({
  onLatestUpdatesClick,
}: {
  onLatestUpdatesClick: () => void;
}) {
  // Initialize mute state from soundManager
  const [isMuted, setIsMuted] = useState<boolean>(getMuteState());

  // Handle mute button click
  const handleMuteToggle = () => {
    const newMuteState = toggleMuteState();
    setIsMuted(newMuteState);
  };

  // Get initial mute state on component mount
  useEffect(() => {
    setIsMuted(getMuteState());
  }, []);

  return (
    <div className={styles.smallButtonsDiv}>
      <Button
        onClick={onLatestUpdatesClick}
        className={styles.btnUpdates}
        icon={<TrackChangesOutlinedIcon />}
      />
      <Button
        onClick={handleMuteToggle}
        className={styles.btnUpdates}
        icon={isMuted ? <VolumeOffOutlinedIcon /> : <VolumeUpOutlinedIcon />}
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
      />
      <Button
        onClick={() =>
          window.open('https://github.com/j0hanz/Memorix', '_blank')
        }
        className={styles.btnUpdates}
        icon={<GitHubIcon />}
      />
    </div>
  );
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
