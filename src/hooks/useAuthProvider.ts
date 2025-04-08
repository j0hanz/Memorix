import { useState, useEffect, useCallback } from 'react';
import { axiosReq } from '@/api/axios';
import { isTokenExpired } from '@/utils/tokenUtils';
import { refreshAccessToken } from '@/utils/axiosUtils';
import type {
  User,
  Profile,
  LoginCredentials,
  RegisterData,
  AuthContextType,
} from '@/types/auth';
import { authService } from '@/hooks/useAuth';

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
    if (!token || !user?.profile_id) return null;
    setLoading(true);
    try {
      // Fetch the specific profile directly
      const response = await axiosReq.get(`/api/profiles/${user.profile_id}/`);
      setProfile(response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, user?.profile_id]);

  // Using the service for login
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    return authService.login(credentials, {
      setLoading,
      setError,
      setAuthTokens,
      setUser,
      fetchProfile,
    });
  };

  // Using the service for registration
  const register = async (userData: RegisterData): Promise<boolean> => {
    return authService.register(userData, { setLoading, setError });
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
