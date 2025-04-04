import { ReactNode, useState, useEffect } from 'react';
import { axiosReq } from '@/api/axios';
import { VerifyResponse } from '@/types/auth';
import {
  AuthContext,
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  AuthContextType,
} from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export { AuthContext };
export type { User, AuthContextType };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || '',
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const response =
          await axiosReq.get<VerifyResponse>('/api/auth/verify/');
        if (response.data.valid) {
          setUser(response.data.user || null);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (err) {
        console.error('Token verification failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosReq.post<AuthResponse>(
        '/api/auth/login/',
        credentials,
      );
      const { token, user } = response.data;

      setToken(token);
      setUser(user);
      setIsAuthenticated(true);

      localStorage.setItem('token', token);
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid username or password');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      await axiosReq.post('/api/auth/register/', userData);
      return true;
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
