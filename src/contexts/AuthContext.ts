import { createContext } from 'react';

import type { AuthContextType, Profile, User } from '@/types/auth';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  token: '',
  refreshToken: '',
  authError: undefined,
  isAuthenticated: false,
  login: async () => {
    // This is an async stub for typing; must use await to satisfy linter
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
  setUser: (_user: User | null) => {
    // Default implementation does nothing
  },
  setAuthTokens: (_access: string, _refresh?: string) => {
    // Default implementation does nothing
  },
  fetchProfile: async () => {
    await Promise.resolve();
    return null as Profile | null;
  },
});
