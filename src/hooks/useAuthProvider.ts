import { useState, useEffect, useCallback } from 'react';
import { axiosReq } from '@/api/axios';
import { isTokenExpired, refreshAccessToken } from '@/utils/jwt';
import {
  User,
  Profile,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  AuthContextType,
} from '@/types/auth';
import { ApiError } from '@/types/api';

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || '',
  );
  const [refreshToken, setRefreshToken] = useState<string>(
    localStorage.getItem('refreshToken') || '',
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Format API error messages into readable text
  const formatErrorMessage = (error: ApiError): string => {
    if (!error.response?.data) return 'An unexpected error occurred';
    const data = error.response.data;
    if (typeof data === 'string') return data;
    return Object.entries(data)
      .map(([key, value]) => {
        const message = Array.isArray(value) ? value.join(', ') : String(value);
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
        return `${formattedKey}: ${message}`;
      })
      .join('; ');
  };

  // Clear user and tokens from state and localStorage
  const logout = useCallback(() => {
    setUser(null);
    setProfile(null);
    setToken('');
    setRefreshToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }, []);

  // Utility to update tokens in both state and localStorage
  const setAuthTokens = (access: string, refresh?: string) => {
    setToken(access);
    localStorage.setItem('token', access);
    if (refresh) {
      setRefreshToken(refresh);
      localStorage.setItem('refreshToken', refresh);
    }
  };

  // Fetch the user's profile
  const fetchProfile = useCallback(async (): Promise<Profile | null> => {
    if (!token || !user?.id) return null;
    setLoading(true);
    try {
      const response = await axiosReq.get('/api/profiles/');
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
  }, [token, user]);

  // Handle login
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosReq.post<AuthResponse>(
        '/dj-rest-auth/login/',
        credentials,
      );
      const access =
        response.data.access ||
        response.data.token ||
        response.data.access_token;
      const refresh = response.data.refresh || response.data.refresh_token;
      if (!access) {
        setError('Access token not found in response');
        return false;
      }
      setAuthTokens(access, refresh);
      if (response.data.user) {
        setUser(response.data.user);
      } else {
        const userResponse = await axiosReq.get('/dj-rest-auth/user/');
        setUser(userResponse.data as User);
      }
      await fetchProfile();
      return true;
    } catch (err: unknown) {
      console.error('Login failed:', err);
      const errorObj = err as ApiError;
      setError(formatErrorMessage(errorObj));
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle registration
  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await axiosReq.post('/dj-rest-auth/registration/', userData);
      return true;
    } catch (err: unknown) {
      console.error('Registration failed:', err);
      const errorObj = err as ApiError;
      setError(formatErrorMessage(errorObj));
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Initialize user from stored token
  useEffect(() => {
    const initializeUser = async () => {
      if (!token) return;
      try {
        if (isTokenExpired(token)) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            setAuthTokens(newToken);
          } else {
            logout();
            return;
          }
        }
        const userResponse = await axiosReq.get('/dj-rest-auth/user/');
        setUser(userResponse.data as User);
      } catch (err) {
        console.error('Error during token initialization:', err);
        logout();
      }
    };
    initializeUser();
  }, [token, logout]);

  // Fetch profile when user changes
  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  // Listen for global logout events
  useEffect(() => {
    window.addEventListener('auth:logout', logout);
    return () => window.removeEventListener('auth:logout', logout);
  }, [logout]);

  const isAuthenticated = Boolean(user && token);

  return {
    user,
    profile,
    token,
    refreshToken,
    isAuthenticated,
    login,
    register,
    logout,
    getProfile: fetchProfile,
    loading,
    error,
  };
}
