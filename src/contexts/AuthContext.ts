import { createContext } from 'react';
import { AuthContextType } from '@/types/auth';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  token: '',
  refreshToken: '',
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  getProfile: async () => null,
  loading: false,
  error: null,
});
