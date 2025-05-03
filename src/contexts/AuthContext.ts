import { createContext } from 'react';

import type { AuthContextType, Profile } from '@/types/auth';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  token: '',
  refreshToken: '',
  authError: undefined,
  isAuthenticated: false,
  login: async () => {
    await Promise.resolve();
    return false;
  },
  register: async () => {
    await Promise.resolve();
    return false;
  },
  logout: () => {
    // Default implementation does nothing
  },
  getProfile: async () => {
    await Promise.resolve();
    return null as Profile | null;
  },
  loading: false,
  error: null,
  setUser: () => {
    // Default implementation does nothing
  },
  setAuthTokens: () => {
    // Default implementation does nothing
  },
  fetchProfile: async () => {
    await Promise.resolve();
    return null as Profile | null;
  },
});
