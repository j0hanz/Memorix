import { useEffect, useState } from 'react';

import { useServices } from '@/hooks/api/useServices';
import { useScore } from '@/hooks/leaderboard/useScore';
import { useAuth, useToast } from '@/hooks/shared/useProvider';
import type { ProfileContextType } from '@/types/context';
import type { ProfileFormValues } from '@/types/services';
import {
  formatErrorMessage,
  formatPasswordChangeError,
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
  const [editingImage, setEditingImage] = useState(false);

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showPasswordTab, setShowPasswordTab] = useState(false);
  const [showDeleteTab, setShowDeleteTab] = useState(false);

  const { showToast } = useToast();

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

  useEffect(() => {
    if (profile?.profile_picture_url && !editingImage) {
      setPreviewImage(profile.profile_picture_url);
    }
  }, [profile?.profile_picture_url, editingImage]);

  const handleTabChange = (key: string) => {
    // Handles tab navigation changes.
    setActiveTab(key);
    setShowPasswordTab(false);
    setShowDeleteTab(false);
  };

  const handlePasswordClick = () => {
    // Shows the password tab.
    setShowPasswordTab(true);
  };

  const handleDeleteClick = () => {
    // Shows the delete account tab.
    setShowDeleteTab(true);
  };

  const handleBackToOverview = () => {
    // Navigates back to the overview tab from password or delete tabs.
    setShowPasswordTab(false);
    setShowDeleteTab(false);
    setPasswordFormComplete(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handles the selection of a new profile image.
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setEditingImage(true);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleUpdateProfile = async () => {
    // Handles updating the profile, primarily for saving a new profile image.
    if (profileImage && profile?.id) {
      await handleSaveProfileImage();
    } else if (editingImage && !profileImage) {
      handleCancelImageEdit();
      showToast('Image selection cancelled.', 2000);
    } else {
      showToast('No changes to save.', 2000);
    }
  };

  const changePassword = async (
    values: ProfileFormValues,
  ): Promise<boolean> => {
    // Handles changing the user's password.
    if (!profile?.id) {
      const errorMsg = 'No profile found';
      setError(errorMsg);
      showToast(errorMsg);
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const passwordData = {
        old_password: values.oldPassword,
        new_password1: values.newPassword1,
        new_password2: values.newPassword2,
      };
      await authService.changePassword(passwordData);
      const successMsg = 'Password changed successfully!';
      setSuccess(successMsg);
      showToast(successMsg);
      setPasswordFormComplete(false);
      return true;
    } catch (err) {
      const errorMessage = formatPasswordChangeError(err);
      setError(errorMessage);
      showToast(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteAccount = async (): Promise<void> => {
    // Handles deleting the user's account.
    if (!profile?.id) {
      const errorMsg = 'No profile found';
      setError(errorMsg);
      showToast(errorMsg);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await profileService.deleteAccount(profile.id);
      const successMsg = 'Account deleted successfully';
      setSuccess(successMsg);
      showToast(successMsg);
      logout();
    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      setError(errorMessage);
      showToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfileImage = async () => {
    // Handles saving the selected profile image.
    if (!profileImage) {
      setError('No image selected.');
      showToast('No image selected.');
      return;
    }
    if (!profile?.id) {
      setError('User not authenticated.');
      showToast('User not authenticated.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await profileService.uploadProfilePicture(
        profile.id,
        profileImage,
      );
      if (response && typeof response.profile_picture_url === 'string') {
        setPreviewImage(response.profile_picture_url);
        setProfileImage(null);
        setEditingImage(false);
        setSuccess('Profile picture updated successfully!');
        showToast('Profile picture updated!', 3000);
        await getProfile();
      } else {
        setProfileImage(null);
        setEditingImage(false);
        showToast('Profile picture uploaded. Refreshing data...', 3000);
        await getProfile();
      }
    } catch (err) {
      const message = formatErrorMessage(err);
      setError(message);
      showToast(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelImageEdit = () => {
    // Handles cancelling the profile image edit.
    setProfileImage(null);
    setPreviewImage(profile?.profile_picture_url || null);
    setEditingImage(false);
    setError(null);
  };

  const clearState = () => {
    // Clears the local state of the hook.
    setError(null);
    setSuccess(null);
    setProfileImage(null);
    setPreviewImage(profile?.profile_picture_url || null);
    setEditingImage(false);
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
    editingImage,
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
    setEditingImage,
    handleSaveProfileImage,
    handleCancelImageEdit,
  };
}
