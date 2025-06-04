import { useEffect, useState } from 'react';

import { useServices } from '@/hooks/api/useServices';
import { useScore } from '@/hooks/leaderboard/useScore';
import { useAuth, useToast } from '@/hooks/shared/useProvider';
import type { ProfileContextType } from '@/types/context';
import type { ProfileFormValues } from '@/types/services';

export function useProfile(): ProfileContextType {
  const { profile, getProfile, user, logout } = useAuth();
  const { profile: profileService, auth: authService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Tab navigation state
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showPasswordTab, setShowPasswordTab] = useState(false);
  const [showDeleteTab, setShowDeleteTab] = useState(false);

  const { showToast } = useToast();

  // Use the dedicated scores hook
  const { scores, scoresCount, scoresPage, setScoresPage, loadingScores } =
    useScore();

  useEffect(() => {
    const fetchProfileData = async () => {
      await getProfile();
    };
    if (user && !profile) {
      void fetchProfileData();
    }
  }, [user, profile, getProfile]);

  // Tab navigation handlers
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setShowPasswordTab(false);
    setShowDeleteTab(false);
  };

  const handlePasswordClick = () => {
    setShowPasswordTab(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteTab(true);
  };

  const handleBackToOverview = () => {
    setShowPasswordTab(false);
    setShowDeleteTab(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    if (!profileImage) {
      setError('Please select an image first');
      showToast('Please select an image first');
      return;
    }
    if (!profile?.id) {
      setError('No profile found');
      showToast('No profile found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await profileService.uploadProfilePicture(profile.id, profileImage);
      setSuccess('Profile picture updated successfully!');
      showToast('Profile picture updated successfully!');
      setProfileImage(null);
      setPreviewImage(null);
      await getProfile();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update profile picture';
      setError(errorMessage);
      showToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const changePassword = async (
    values: ProfileFormValues,
  ): Promise<boolean> => {
    if (!profile?.id) {
      setError('No profile found');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      // Convert ProfileFormValues to auth service format
      const passwordData = {
        old_password: values.oldPassword,
        new_password1: values.newPassword1,
        new_password2: values.newPassword2,
      };
      await authService.changePassword(passwordData);
      setSuccess('Password changed successfully!');
      showToast('Password changed successfully!');
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to change password';
      setError(errorMessage);
      showToast(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (): Promise<void> => {
    if (!profile?.id) {
      setError('No profile found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await profileService.deleteAccount(profile.id);
      setSuccess('Account deleted successfully');
      showToast('Account deleted successfully');
      logout();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete account';
      setError(errorMessage);
      showToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearState = () => {
    setError(null);
    setSuccess(null);
    setProfileImage(null);
    setPreviewImage(null);
  };

  return {
    data: profile,
    loading,
    error,
    user,
    profileImage,
    previewImage,
    scores,
    scoresCount,
    scoresPage,
    loadingScores,
    success,
    setError,
    setSuccess,
    handleImageChange,
    handleUpdateProfile,
    setScoresPage,
    changePassword,
    handleDeleteAccount,
    logout,
    clearState,
    activeTab,
    showPasswordTab,
    showDeleteTab,
    handleTabChange,
    handlePasswordClick,
    handleDeleteClick,
    handleBackToOverview,
  };
}
