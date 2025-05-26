import * as authService from '@/services/authService';
import * as gameService from '@/services/gameService';
import * as githubService from '@/services/githubService';
import * as profileService from '@/services/profileService';
import * as uploadService from '@/services/uploadService';

// This hook provides a way to access all services in one place.
export function useServices() {
  return {
    auth: authService,
    game: gameService,
    profile: profileService,
    github: githubService,
    upload: uploadService,
  };
}

// This allows for easy import of services in other parts of the application.
export {
  authService,
  gameService,
  githubService,
  profileService,
  uploadService,
};
