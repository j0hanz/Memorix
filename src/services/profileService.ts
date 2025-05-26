import { PROFILE_ENDPOINTS } from '@/constants/api';
import type { Profile } from '@/types/data';

import { deleteRequest, get, getList, patch } from './apiService';
import { uploadProfilePicture as uploadPicture } from './uploadService';

// This service provides methods to interact with user profiles.
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

// This function updates a user profile with the provided data.
export async function updateProfile(
  id: number,
  data: Partial<Profile>,
): Promise<Profile> {
  return patch<Profile>(PROFILE_ENDPOINTS.profileDetail(id), data, {
    context: 'ProfileService',
    errorMessage: 'Failed to update profile',
  });
}

// This function uploads a profile picture for a user profile.
export async function uploadProfilePicture(
  profileId: number,
  file: File,
): Promise<Profile> {
  return uploadPicture<Profile>(
    PROFILE_ENDPOINTS.profileDetail(profileId),
    file,
  );
}

// This function deletes a user account by profile ID.
export async function deleteAccount(profileId: number): Promise<void> {
  await deleteRequest<Record<string, never>>(
    PROFILE_ENDPOINTS.profileDetail(profileId),
    {
      context: 'ProfileService',
      errorMessage: 'Failed to delete account',
    },
  );
}

// This function deletes a user profile by ID.
export async function deleteProfile(id: number): Promise<void> {
  await deleteRequest<Record<string, never>>(
    PROFILE_ENDPOINTS.profileDetail(id),
    {
      context: 'ProfileService',
      errorMessage: 'Failed to delete profile',
    },
  );
}
