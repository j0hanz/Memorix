import { createContext } from 'react';
import type { AuthContextType } from '@/types/auth';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  token: '',
  refreshToken: '',
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {
    // Default implementation does nothing
  },
  getProfile: async () => null,
  loading: false,
  error: null,
});
