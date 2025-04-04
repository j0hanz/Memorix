import { ReactNode, useState, useEffect, useCallback } from 'react';
import { axiosReq } from '@/api/axios';
import { decodeToken, isTokenExpired } from '@/utils/jwt';
import {
  AuthContext,
  User,
  Profile,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '@/contexts/AuthContext';

interface JwtPayload {
  user_id: number;
  username: string;
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
}

interface ApiError {
  response?: {
    status?: number;
    data?: Record<string, string | string[]>;
  };
  request?: unknown;
  message?: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || '',
  );
  const [refreshToken, setRefreshToken] = useState<string>(
    localStorage.getItem('refreshToken') || '',
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = useCallback(() => {
    setUser(null);
    setProfile(null);
    setToken('');
    setRefreshToken('');
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }, []);

  const handleAuthError = useCallback(
    (err: ApiError, defaultMessage: string) => {
      console.error(`${defaultMessage}:`, err);
      if (!err.response) {
        setError(
          err.request
            ? 'No response from server. Please check your connection.'
            : `${defaultMessage}. Please try again.`,
        );
        return;
      }
      const { status, data } = err.response;
      if (status === 401) {
        setError('Invalid username or password');
        return;
      }
      if (data && typeof data === 'object') {
        const errorMessages = Object.entries(data)
          .map(([key, value]) => {
            const errorValue = Array.isArray(value) ? value.join(', ') : value;
            return `${key}: ${errorValue}`;
          })
          .join('; ');
        setError(errorMessages);
        return;
      }
      setError(`${defaultMessage}. Please try again.`);
    },
    [],
  );

  const getProfile = useCallback(async (): Promise<Profile | null> => {
    if (!token || !user?.id) return null;
    setLoading(true);
    try {
      const response = await axiosReq.get('/api/profiles/');
      if (!response.data) return null;
      if (Array.isArray(response.data)) {
        const userProfile = response.data.find(
          (p: Profile) => p.owner === user.id,
        );
        if (userProfile) {
          setProfile(userProfile);
          return userProfile;
        }
      }
      return null;
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, user?.id]);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosReq.post<AuthResponse>(
          '/api/token/',
          credentials,
        );
        const { access, refresh } = response.data;
        if (!access || !refresh) {
          setError('Invalid response from server');
          return false;
        }
        localStorage.setItem('token', access);
        localStorage.setItem('refreshToken', refresh);
        setToken(access);
        setRefreshToken(refresh);
        try {
          const decoded = decodeToken(access) as JwtPayload;
          const userData: User = {
            id: decoded.user_id,
            username: decoded.username,
          };
          setUser(userData);
          setIsAuthenticated(true);
          await getProfile();
          return true;
        } catch (decodeError) {
          console.error('Failed to decode token:', decodeError);
          setError('Authentication failed: Invalid token format');
          logout();
          return false;
        }
      } catch (err: unknown) {
        handleAuthError(err as ApiError, 'Login failed');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [getProfile, handleAuthError, logout],
  );

  const register = useCallback(
    async (userData: RegisterData): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await axiosReq.post('/api/register/', userData);
        return true;
      } catch (err: unknown) {
        handleAuthError(err as ApiError, 'Registration failed');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [handleAuthError],
  );

  useEffect(() => {
    const initializeFromToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        if (isTokenExpired(token)) {
          console.warn('Token expired, logging out');
          logout();
          return;
        }
        const decoded = decodeToken(token) as JwtPayload;
        setUser({
          id: decoded.user_id,
          username: decoded.username,
        });
        setIsAuthenticated(true);
        await getProfile();
      } catch (err) {
        console.error('Token verification failed:', err);
        logout();
      }
    };
    initializeFromToken();
  }, [token, logout, getProfile]);

  useEffect(() => {
    const handleAuthLogout = () => logout();
    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        refreshToken,
        isAuthenticated,
        login,
        register,
        logout,
        getProfile,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
