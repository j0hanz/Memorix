import { useState } from 'react';
import { ProfileModal } from '@/components/ModalComponents';
import { AuthModal } from '@/components/ModalComponents';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
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
}: MainMenuProps) {
  const { isMuted, toggleMute, handleGitHubClick } = useLinks();
  const { isAuthenticated, logout } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAccountClick = () => {
    if (isAuthenticated) {
      setShowProfileModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

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
        className={`${styles.btnMain} ${styles.btnStart}`}
        icon={<PlayCircleOutlineOutlinedIcon />}
        text="Start Game"
      />
      <Button
        onClick={handleAccountClick}
        className={`${styles.btnMain} ${styles.btnMenu}`}
        icon={<PersonIcon />}
        text={isAuthenticated ? 'Profile' : 'Account'}
      />
      {isAuthenticated && (
        <Button
          onClick={logout}
          className={`${styles.btnMain} ${styles.btnMenu}`}
          icon={<ExitToAppOutlinedIcon />}
          text="Sign Out"
        />
      )}
      <Button
        onClick={openInstructions}
        className={`${styles.btnMain} ${styles.btnMenu}`}
        icon={<InfoOutlinedIcon />}
        text="Guide"
      />
      <Button
        onClick={openLatestUpdates}
        icon={<TrackChangesOutlinedIcon />}
        className={`${styles.btnMain} ${styles.btnEnd}`}
        text="Updates"
      />
      <div className={styles.smallButtonsDiv}>
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
      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
      <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
