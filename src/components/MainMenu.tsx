import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Switch from '@mui/material/Switch';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@/components/Button';
import { useNavigation } from '@/hooks/useNavigation';
import type { MainMenuProps } from '@/types/components';
import { useLinks } from '@/hooks/useLinks';
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';
import styles from '@/App.module.css';

const MainMenu = ({
  startGame,
  openInstructions,
  openLatestUpdates,
  enterAnimation,
  openAuthModal: _openAuthModal,
  openLeaderboardModal,
}: MainMenuProps) => {
  const { isMuted, toggleMute } = useLinks();
  const { isAuthenticated, user, profile, getProfile } = useAuth();
  const { openModal } = useModal();

  // Function to open the authentication modal
  const { handleAccountClick } = useNavigation({
    setIsLoading: () => {},
    setIsGameActive: () => {},
    setShowInstructions: () => {},
    setShowLatestUpdates: () => {},
    setShowCategorySelection: () => {},
    setSelectedCategory: () => {},
    setShowAuthModal: () => {},
    setShowLeaderboardModal: () => {},
    logout: () => {},
    isAuthenticated,
    openModal,
  });

  useEffect(() => {
    if (isAuthenticated && user && !profile) {
      getProfile();
    }
  }, [isAuthenticated, user, profile, getProfile]);

  return (
    <div className={styles.menu}>
      {isAuthenticated && user && (
        <div className={styles.userInfoTopRight}>
          {profile && profile.profile_picture_url && (
            <img
              src={profile.profile_picture_url}
              alt="Profile"
              className={styles.menuProfileImage}
              onClick={() => openModal('profile')}
            />
          )}
        </div>
      )}

      <motion.div
        initial={enterAnimation.initial}
        animate={enterAnimation.animate}
        transition={enterAnimation.transition}
      >
        <div className={styles.gameTitle}>Memorix</div>
      </motion.div>

      <div className={styles.menuButtons}>
        <Button
          onClick={startGame}
          className={`${styles.btnMain} ${styles.btnStart}`}
          variant="menu"
          icon={<PlayCircleOutlineOutlinedIcon />}
          text="Start Game"
          color="primary"
        />
        <Button
          onClick={handleAccountClick}
          className={`${styles.btnMain} ${styles.btnMenu}`}
          variant="menu"
          icon={<PersonIcon />}
          text={isAuthenticated ? 'Profile' : 'Account'}
          color="secondary"
        />
        <Button
          onClick={openLeaderboardModal}
          className={`${styles.btnMain} ${styles.btnMenu}`}
          variant="menu"
          icon={<EmojiEventsIcon />}
          text="Leaderboard"
          color="secondary"
        />
        <Button
          onClick={openInstructions}
          className={`${styles.btnMain} ${styles.btnMenu}`}
          variant="menu"
          icon={<InfoOutlinedIcon />}
          text="Guide"
          color="secondary"
        />
        <Button
          onClick={openLatestUpdates}
          icon={<TrackChangesOutlinedIcon />}
          className={`${styles.btnMain} ${styles.btnEnd}`}
          variant="menu"
          text="Updates"
          color="secondary"
        />
      </div>
      <div className={styles.bottomMenu}>
        {isMuted ? <VolumeOffOutlinedIcon /> : <VolumeUpOutlinedIcon />}
        <Switch
          checked={!isMuted}
          onChange={toggleMute}
          color="secondary"
          slotProps={{
            input: {
              'aria-label': isMuted ? 'Unmute sounds' : 'Mute sounds',
            },
          }}
        />
      </div>
    </div>
  );
};

export default MainMenu;
