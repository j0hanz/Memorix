import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

import styles from '@/App.module.css';
import { LoadingCardSpinner } from '@/components/Spinner';
import { Toast } from '@/components/Toast';
import { useMenuHandler } from '@/hooks/useMenu';
import type { MainMenuProps } from '@/types/components';

import { MenuButton } from './MenuButton';
import { ProfileAvatar } from './ProfileAvatar';
import { SoundToggle } from './SoundToggle';

export const MainMenu = ({
  startGame,
  openInstructions,
  openLatestUpdates,
  enterAnimation,
  openLeaderboardModal,
  handleAccountClick,
}: MainMenuProps) => {
  const {
    isMuted,
    toggleMute,
    isAuthenticated,
    profile,
    showAuthToast,
    authMessage,
    menuLoading,
    handleProfileAvatarClick,
    handleCloseAuthToast,
  } = useMenuHandler();

  return (
    <div className={styles.menu}>
      <ProfileAvatar
        profilePictureUrl={profile?.profile_picture_url}
        onClick={handleProfileAvatarClick}
      />
      <motion.div
        initial={enterAnimation.initial}
        animate={enterAnimation.animate}
        transition={enterAnimation.transition}
      >
        <div className={styles.gameTitle}>Memorix</div>
      </motion.div>
      <Suspense
        fallback={<LoadingCardSpinner isLoading={true} message="Loading..." />}
      >
        {menuLoading ? (
          <LoadingCardSpinner isLoading={true} message="Loading..." />
        ) : (
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
            <div className={styles.bottomMenu}>
              <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
            </div>
          </div>
        )}
      </Suspense>

      <Toast
        message={authMessage}
        show={showAuthToast}
        placement="top"
        onClose={handleCloseAuthToast}
      />
    </div>
  );
};
