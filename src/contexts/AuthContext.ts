import { createContext } from 'react';

export interface User {
  id: number;
  username: string;
}

export interface Profile {
  id: number;
  owner: number;
  profile_picture?: string;
  created_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email?: string;
  // Add additional registration fields if needed
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  token: string;
  refreshToken: string;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  getProfile: () => Promise<Profile | null>;
  loading: boolean;
  error: string | null;
}

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
