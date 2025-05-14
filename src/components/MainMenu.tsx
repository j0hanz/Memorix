import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import { motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';

import styles from '@/App.module.css';
import { LoadingCardSpinner } from '@/components/Spinner';
import Toast from '@/components/Toast';
import { DELAYS } from '@/constants/constants';
import { useLinks } from '@/hooks/useLinks';
import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/hooks/useProvider';
import type { MainMenuProps } from '@/types/components';

import { MenuButton } from './MenuButton';
import { ProfileAvatar } from './ProfileAvatar';
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

  // Auth toast state
  const [showAuthToast, setShowAuthToast] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [menuLoading, setMenuLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user && !profile) {
      void getProfile();
    }
  }, [isAuthenticated, user, profile, getProfile]);

  // Handle user authentication state
  useEffect(() => {
    setMenuLoading(true);
    const timer = setTimeout(() => {
      setMenuLoading(false);
    }, DELAYS.SPINNER_DURATION);
    return () => {
      clearTimeout(timer);
    };
  }, [isAuthenticated, user, profile]);

  useEffect(() => {
    if (isAuthenticated) {
      setAuthMessage('Logged in');
      setShowAuthToast(true);
      const timer = setTimeout(() => {
        setShowAuthToast(false);
      }, DELAYS.TOAST_DURATION);
      return () => {
        clearTimeout(timer);
      };
    }
    setShowAuthToast(false);
  }, [isAuthenticated]);

  return (
    <div className={styles.menu}>
      <ProfileAvatar
        profilePictureUrl={profile?.profile_picture_url}
        onClick={() => {
          openModal('profile');
        }}
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
        onClose={() => {
          setShowAuthToast(false);
        }}
      />
    </div>
  );
};

export default MainMenu;
