import { useCallback, useEffect, useState } from 'react';

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
      setToken(access);
    }
    if (refresh) {
      setRefreshTokenState(refresh);
      setRefreshToken(refresh);
    }
  }, []);

  // Fetch the user's profile with better error handling
  const fetchProfile = useCallback(async (): Promise<Profile | null> => {
    if (!token || !user || user.profile_id == null) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await axiosReq.get<Profile>(
        `/api/profiles/${String(user.profile_id)}/`,
      );
      setProfile(response.data);
      return response.data;
    } catch (err: unknown) {
      console.error('Failed to fetch profile:', err);
      const errorObj = err as ApiError;
      setError(
        errorObj.response?.data?.detail &&
          typeof errorObj.response.data.detail === 'string'
          ? errorObj.response.data.detail
          : 'Failed to load profile',
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  // Initialize authentication state and fetch user data
  useEffect(() => {
    const controller = new AbortController();
    const initializeAuth = async () => {
      if (!token) return;

      setLoading(true);
      setError(null);

      try {
        // Refresh token if expired
        if (isTokenExpired(token)) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            setAuthTokens(newToken);
          } else {
            logout();
            return;
          }
        }

        // Fetch user
        const userResponse = await axiosReq.get<User>('/dj-rest-auth/user/', {
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        setUser(userResponse.data);

        // Fetch profile if available
        if (userResponse.data.profile_id != null) {
          const profileResp = await axiosReq.get<Profile>(
            `/api/profiles/${String(userResponse.data.profile_id)}/`,
            { signal: controller.signal },
          );
          if (!controller.signal.aborted) {
            setProfile(profileResp.data);
          }
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          console.error('Error during auth initialization:', err);
          const errorObj = err as ApiError;
          const errorMessage =
            errorObj.response?.data?.detail &&
            typeof errorObj.response.data.detail === 'string'
              ? errorObj.response.data.detail
              : 'Authentication error';
          setError(errorMessage);
          logout();
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void initializeAuth();
    return () => {
      controller.abort();
    };
  }, [token, logout, setAuthTokens]);

  // Listen for global logout events with enhanced event data
  useEffect(() => {
    const handleLogout = (event: Event) => {
      const customEvent = event as CustomEvent<{ reason?: unknown }>;
      if (
        customEvent.detail &&
        typeof customEvent.detail === 'object' &&
        customEvent.detail !== null &&
        Object.prototype.hasOwnProperty.call(customEvent.detail, 'reason')
      ) {
        console.log(`Logout triggered: ${String(customEvent.detail.reason)}`);
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
