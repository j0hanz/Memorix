import { createContext } from 'react';

import type { AuthContextType } from '@/types/auth';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  token: '',
  refreshToken: '',
  authError: undefined,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {
    // Default implementation does nothing
  },
  getProfile: async () => null,
  loading: false,
  error: null,
  setUser: () => {
    // Default implementation does nothing
  },
  setAuthTokens: () => {
    // Default implementation does nothing
  },
  fetchProfile: async () => null,
});
