import { useEffect, useState } from 'react';

import { useServices } from '@/hooks/api/useServices';
import { useScore } from '@/hooks/leaderboard/useScore';
import { useAuth, useToast } from '@/hooks/shared/useProvider';
import type { ProfileContextType } from '@/types/context';
import type { ProfileFormValues } from '@/types/services';
import {
  formatPasswordChangeError,
  isApiError,
} from '@/utils/shared/errorUtils';

export function useProfile(): ProfileContextType {
  const { profile, getProfile, user, logout } = useAuth();
  const { profile: profileService, auth: authService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [passwordFormComplete, setPasswordFormComplete] = useState(false);

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
    setPasswordFormComplete(false); // Reset the form completion state
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
      const errorMsg = 'Please select an image first';
      showToast(errorMsg);
      return;
    }
    if (!profile?.id) {
      const errorMsg = 'No profile found';
      showToast(errorMsg);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await profileService.uploadProfilePicture(profile.id, profileImage);
      const successMsg = 'Profile picture updated successfully!';
      showToast(successMsg);
      setProfileImage(null);
      setPreviewImage(null);
      await getProfile();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update profile picture';
      showToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const changePassword = async (
    values: ProfileFormValues,
  ): Promise<boolean> => {
    if (!profile?.id) {
      const errorMsg = 'No profile found';
      showToast(errorMsg);
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Convert ProfileFormValues to auth service format
      const passwordData = {
        old_password: values.oldPassword,
        new_password1: values.newPassword1,
        new_password2: values.newPassword2,
      };
      await authService.changePassword(passwordData);
      const successMsg = 'Password changed successfully!';
      showToast(successMsg);
      return true;
    } catch (err) {
      let errorMessage = 'Failed to change password';

      // Use specific password change error formatting
      if (isApiError(err)) {
        errorMessage = formatPasswordChangeError(err);
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      showToast(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteAccount = async (): Promise<void> => {
    if (!profile?.id) {
      const errorMsg = 'No profile found';
      showToast(errorMsg);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await profileService.deleteAccount(profile.id);
      const successMsg = 'Account deleted successfully';
      showToast(successMsg);
      logout();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete account';
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
    passwordFormComplete,
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
    setPasswordFormComplete: (complete: boolean) => {
      setPasswordFormComplete(complete);
    },
  };
}
