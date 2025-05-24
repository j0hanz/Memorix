import { useEffect, useState } from 'react';

import { DELAYS } from '@/constants/game';
import { useAuth, useModal } from '@/hooks/useProvider';
import { useSoundHandler } from '@/hooks/useSound';

// Menu state handler
export function useMenuHandler() {
  const { isMuted, toggleMute } = useSoundHandler();
  const { isAuthenticated, user, profile, getProfile } = useAuth();
  const { openModal } = useModal();

  const [showAuthToast, setShowAuthToast] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [menuLoading, setMenuLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user && !profile) {
      void getProfile();
    }
  }, [isAuthenticated, user, profile, getProfile]);

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

  const handleProfileAvatarClick = () => {
    openModal('profile');
  };

  const handleCloseAuthToast = () => {
    setShowAuthToast(false);
  };

  return {
    isMuted,
    toggleMute,
    isAuthenticated,
    profile,
    showAuthToast,
    authMessage,
    menuLoading,
    handleProfileAvatarClick,
    handleCloseAuthToast,
  };
}
