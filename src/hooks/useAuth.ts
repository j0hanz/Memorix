import { useCallback, useEffect, useState } from 'react';

import { AUTH_ENDPOINTS, PROFILE_ENDPOINTS } from '@/constants/api';
import { axiosReq } from '@/services/axios';
import type { AuthContextType } from '@/types/context';
import type { Profile, User } from '@/types/data';
import type { ApiError } from '@/types/services';
import { refreshAccessToken } from '@/utils/axiosUtils';
import { tokenStorage, tokenValidator } from '@/utils/tokenUtils';

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [token, setToken] = useState(tokenStorage.getToken() || '');
  const [refreshToken, setRefresh] = useState(
    tokenStorage.getRefreshToken() || '',
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function logout() {
    setUser(null);
    setProfile(null);
    setToken('');
    setRefresh('');
    tokenStorage.clearTokens();
  }

  function setAuthTokens(access: string, refresh?: string) {
    setToken(access);
    tokenStorage.setToken(access);
    if (refresh) {
      setRefresh(refresh);
      tokenStorage.setRefreshToken(refresh);
    }
  }

  const fetchProfile = useCallback(async (): Promise<Profile | null> => {
    if (!token || !user?.profile_id) return null;
    setLoading(true);
    setError(null);

    try {
      const res = await axiosReq.get<Profile>(
        PROFILE_ENDPOINTS.profileDetail(user.profile_id),
      );
      setProfile(res.data);
      return res.data;
    } catch (e: unknown) {
      const err = e as ApiError;
      setError(
        typeof err.response?.data?.detail === 'string'
          ? err.response.data.detail
          : 'Failed to load profile',
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, user?.profile_id]);

  useEffect(() => {
    void (async () => {
      const stored = tokenStorage.getToken();
      if (!stored) return;

      setToken(stored);
      setLoading(true);
      setError(null);

      // try refresh
      if (tokenValidator.isTokenExpired(stored)) {
        const newToken = await refreshAccessToken();
        if (newToken) setAuthTokens(newToken);
        else {
          logout();
          return;
        }
      }

      try {
        const userRes = await axiosReq.get<User>(AUTH_ENDPOINTS.user);
        setUser(userRes.data);

        if (userRes.data.profile_id) {
          await fetchProfile();
        }
      } catch (e: unknown) {
        const err = e as ApiError;
        setError(
          typeof err.response?.data?.detail === 'string'
            ? err.response.data.detail
            : 'Authentication error',
        );
        logout();
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchProfile]);

  // global logout event
  useEffect(() => {
    const onLogout = (evt: Event) => {
      console.log('Logout:', (evt as CustomEvent).detail);
      logout();
    };
    window.addEventListener('auth:logout', onLogout);
    return () => {
      window.removeEventListener('auth:logout', onLogout);
    };
  }, []);

  return {
    user,
    profile,
    token,
    refreshToken,
    isAuthenticated: Boolean(user && token),
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
