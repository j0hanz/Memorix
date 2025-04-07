import { createContext, useContext } from 'react';
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

// Hook moved from useAuth.ts
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
