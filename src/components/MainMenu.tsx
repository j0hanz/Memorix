import { motion } from 'framer-motion';
import Button from '@/components/Button';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from '@/App.module.css';
import { useSoundEffects } from '@/hooks/useSound';
import { MainMenuProps } from '@/types/components';

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
  const { isMuted, toggleMute } = useSoundEffects();

  return (
    <div className={styles.smallButtonsDiv}>
      <div onClick={onLatestUpdatesClick} className={styles.btnUpdates}>
        <TrackChangesOutlinedIcon />
      </div>
      <div
        onClick={toggleMute}
        className={styles.btnUpdates}
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
      >
        {isMuted ? <VolumeOffOutlinedIcon /> : <VolumeUpOutlinedIcon />}
      </div>
      <div
        onClick={() =>
          window.open('https://github.com/j0hanz/Memorix', '_blank')
        }
        className={styles.btnUpdates}
      >
        <GitHubIcon />
      </div>
    </div>
  );
}

export default function MainMenu({
  startGame,
  openInstructions,
  openLatestUpdates,
  enterAnimation,
}: MainMenuProps) {
  return (
    <div className={styles.menu}>
      <motion.div
        initial={enterAnimation.initial}
        animate={enterAnimation.animate}
        transition={enterAnimation.transition}
      >
        <div className={styles.gameTitle}>Memorix</div>
      </motion.div>
      <StartButton onClick={startGame} />
      <InstructionsButton onClick={openInstructions} />
      <SocialLinks onLatestUpdatesClick={openLatestUpdates} />
    </div>
  );
}
