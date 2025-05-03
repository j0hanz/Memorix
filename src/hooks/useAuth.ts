import { useCallback, useContext, useEffect, useState } from 'react';

import { AuthContext } from '@/contexts/AuthContext';
import { axiosReq } from '@/services/axios';
import type { ApiError } from '@/types/api';
import type { AuthContextType, Profile, User } from '@/types/auth';
import { refreshAccessToken } from '@/utils/axiosUtils';
import {
  clearTokens,
  getToken,
  isTokenExpired,
  setRefreshToken,
  setToken,
} from '@/utils/tokenUtils';

// Hook to use auth context in components
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

// Hook to create auth provider state and logic
export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [token, setTokenState] = useState<string>(getToken() || '');
  const [refreshToken, setRefreshTokenState] = useState<string>(
    localStorage.getItem('refreshToken') || '',
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Clear user and tokens from state and localStorage
  const logout = useCallback(() => {
    setUser(null);
    setProfile(null);
    setTokenState('');
    setRefreshTokenState('');
    clearTokens();
  }, []);

  // Utility to update tokens in both state and localStorage with validation
  const setAuthTokens = useCallback((access: string, refresh?: string) => {
    if (access) {
      setTokenState(access);
      setToken(access); // Use the enhanced utility
    }

    if (refresh) {
      setRefreshTokenState(refresh);
      setRefreshToken(refresh); // Use the enhanced utility
    }
  }, []);

  // Fetch the user's profile with better error handling
  const fetchProfile = useCallback(async (): Promise<Profile | null> => {
    if (!token || !user?.profile_id) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await axiosReq.get(`/api/profiles/${user.profile_id}/`);
      setProfile(response.data);
      return response.data;
    } catch (err: unknown) {
      console.error('Failed to fetch profile:', err);
      const errorObj = err as ApiError;
      setError(errorObj.response?.data?.detail || 'Failed to load profile');
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, user?.profile_id]);

  // Initialize user from stored token with improved token validation
  useEffect(() => {
    const initializeUser = async () => {
      if (!token) return;

      setLoading(true);
      setError(null);

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
      } catch (err: unknown) {
        console.error('Error during token initialization:', err);
        const errorObj = err as ApiError;
        const errorMessage =
          errorObj.response?.data?.detail || 'Authentication error';
        setError(errorMessage);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, [token, logout, setAuthTokens]);

  // Fetch profile when user changes
  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  // Listen for global logout events with enhanced event data
  useEffect(() => {
    const handleLogout = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.reason) {
        console.log(`Logout triggered: ${customEvent.detail.reason}`);
      }
      logout();
    };

    window.addEventListener('auth:logout', handleLogout);
    return () => {
      window.removeEventListener('auth:logout', handleLogout);
    };
  }, [logout]);

  const isAuthenticated = Boolean(user && token);

  return {
    user,
    profile,
    token,
    refreshToken,
    isAuthenticated,
    login: () => Promise.resolve(false),
    register: () => Promise.resolve(false),
    logout,
    getProfile: fetchProfile,
    loading,
    error,
    setUser,
    setAuthTokens,
    fetchProfile,
  };
}
