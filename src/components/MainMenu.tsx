import { motion } from 'framer-motion';
import Button from '@/components/Button';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styles from '@/App.module.css';
import { MainMenuProps } from '@/types/components';
import { useLinks } from '@/hooks/useLinks';
import { useAuth } from '@/hooks/useAuth';

// Main menu component
export default function MainMenu({
  startGame,
  openInstructions,
  openLatestUpdates,
  enterAnimation,
  openAuthModal,
}: MainMenuProps) {
  const { isMuted, toggleMute, handleGitHubClick } = useLinks();
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.menu}>
      <motion.div
        initial={enterAnimation.initial}
        animate={enterAnimation.animate}
        transition={enterAnimation.transition}
      >
        <div className={styles.gameTitle}>Memorix</div>
      </motion.div>
      <Button
        onClick={startGame}
        className={styles.btnStart}
        icon={<PlayCircleOutlineOutlinedIcon />}
      >
        Play Game
      </Button>
      <Button
        onClick={openInstructions}
        className={styles.btnGuide}
        icon={<InfoOutlinedIcon />}
      >
        Guide
      </Button>
      {/* Add new login/register button */}
      <Button
        onClick={openAuthModal}
        className={styles.btnGuide}
        icon={<PersonOutlineIcon />}
      >
        {isAuthenticated ? 'Account' : 'Sign In'}
      </Button>
      <div className={styles.smallButtonsDiv}>
        <div onClick={openLatestUpdates} className={styles.btnUpdates}>
          <TrackChangesOutlinedIcon />
        </div>
        <div
          onClick={toggleMute}
          className={styles.btnUpdates}
          aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
          {isMuted ? <VolumeOffOutlinedIcon /> : <VolumeUpOutlinedIcon />}
        </div>
        <div onClick={handleGitHubClick} className={styles.btnUpdates}>
          <GitHubIcon />
        </div>
      </div>
    </div>
  );
}
