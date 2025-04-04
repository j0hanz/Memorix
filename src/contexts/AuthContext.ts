import { createContext } from 'react';

export interface User {
  id?: number;
  username: string;
  email?: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: '',
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  loading: false,
  error: null,
});
