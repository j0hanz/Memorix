import { AUTH_ENDPOINTS, PROFILE_ENDPOINTS } from '@/constants/api';
import type { Profile } from '@/types/data';
import type { ProfileFormValues } from '@/types/services';

import { deleteRequest, get, getList, patch, post } from './apiService';

export async function getProfiles(): Promise<Profile[]> {
  return getList<Profile>(PROFILE_ENDPOINTS.profiles, undefined, {
    context: 'ProfileService',
    errorMessage: 'Failed to fetch profiles',
  });
}

export async function getProfile(id: number): Promise<Profile> {
  return get<Profile>(PROFILE_ENDPOINTS.profileDetail(id), undefined, {
    context: 'ProfileService',
    errorMessage: 'Failed to fetch profile',
  });
}

export async function updateProfile(
  id: number,
  data: Partial<Profile>,
): Promise<Profile> {
  return patch<Profile>(PROFILE_ENDPOINTS.profileDetail(id), data, {
    context: 'ProfileService',
    errorMessage: 'Failed to update profile',
  });
}

export async function uploadProfilePicture(
  profileId: number,
  file: File,
): Promise<Profile> {
  const formData = new FormData();
  formData.append('profile_picture', file);

  return patch<Profile>(
    PROFILE_ENDPOINTS.profileDetail(profileId),
    formData,
    {
      context: 'ProfileService',
      errorMessage: 'Failed to upload profile picture',
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}

export async function changePassword(data: ProfileFormValues): Promise<void> {
  await post<Record<string, never>>(AUTH_ENDPOINTS.passwordChange, data, {
    context: 'ProfileService',
    errorMessage: 'Failed to change password',
  });
}

export async function deleteAccount(profileId: number): Promise<void> {
  await deleteRequest<Record<string, never>>(
    PROFILE_ENDPOINTS.profileDetail(profileId),
    {
      context: 'ProfileService',
      errorMessage: 'Failed to delete account',
    },
  );
}

export async function deleteProfile(id: number): Promise<void> {
  await deleteRequest<Record<string, never>>(
    PROFILE_ENDPOINTS.profileDetail(id),
    {
      context: 'ProfileService',
      errorMessage: 'Failed to delete profile',
    },
  );
}
