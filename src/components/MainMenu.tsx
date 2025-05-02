import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import styles from '@/App.module.css';
import type { MainMenuProps } from '@/types/components';
import { useLinks } from '@/hooks/useLinks';
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';
import { ProfileAvatar } from './ProfileAvatar';
import { MenuButton } from './MenuButton';
import { SoundToggle } from './SoundToggle';

const MainMenu = ({
  startGame,
  openInstructions,
  openLatestUpdates,
  enterAnimation,
  openLeaderboardModal,
  handleAccountClick,
}: MainMenuProps) => {
  const { isMuted, toggleMute } = useLinks();
  const { isAuthenticated, user, profile, getProfile } = useAuth();
  const { openModal } = useModal();

  useEffect(() => {
    if (isAuthenticated && user && !profile) {
      getProfile();
    }
  }, [isAuthenticated, user, profile, getProfile]);

  return (
    <div className={styles.menu}>
      <ProfileAvatar
        profilePictureUrl={profile?.profile_picture_url}
        onClick={() => openModal('profile')}
      />
      <motion.div
        initial={enterAnimation.initial}
        animate={enterAnimation.animate}
        transition={enterAnimation.transition}
      >
        <div className={styles.gameTitle}>Memorix</div>
      </motion.div>
      <div className={styles.menuButtons}>
        <MenuButton
          onClick={startGame}
          className={`${styles.btnMain} ${styles.btnStart}`}
          icon={<PlayCircleOutlineOutlinedIcon />}
          text="Start Game"
          color="primary"
        />
        <MenuButton
          onClick={handleAccountClick}
          className={`${styles.btnMain} ${styles.btnMenu}`}
          icon={<PersonIcon />}
          text={isAuthenticated ? 'Profile' : 'Account'}
        />
        <MenuButton
          onClick={openLeaderboardModal}
          className={`${styles.btnMain} ${styles.btnMenu}`}
          icon={<EmojiEventsIcon />}
          text="Leaderboard"
        />
        <MenuButton
          onClick={openInstructions}
          className={`${styles.btnMain} ${styles.btnMenu}`}
          icon={<InfoOutlinedIcon />}
          text="Guide"
        />
        <MenuButton
          onClick={openLatestUpdates}
          className={`${styles.btnMain} ${styles.btnEnd}`}
          icon={<TrackChangesOutlinedIcon />}
          text="Updates"
        />
      </div>
      <div className={styles.bottomMenu}>
        <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
      </div>
    </div>
  );
};

export default MainMenu;
