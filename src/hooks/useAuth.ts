import { useCallback, useEffect, useReducer } from 'react';

import { AUTH_ENDPOINTS, PROFILE_ENDPOINTS } from '@/constants/api';
import { authReducer, initialAuthState } from '@/reducers/authReducer';
import type { AuthContextType } from '@/types/context';
import type { Profile, User } from '@/types/data';
import type { ApiError } from '@/types/services';
import { axiosReq } from '@/utils/axios';
import { refreshAccessToken } from '@/utils/axiosUtils';
import { tokenManager } from '@/utils/tokenUtils';

export function useAuthProvider(): AuthContextType {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  function logout() {
    dispatch({ type: 'LOGOUT' });
    tokenManager.clearTokens();
  }

  function setAuthTokens(access: string, refresh?: string) {
    dispatch({
      type: 'SET_TOKENS',
      payload: { token: access, refreshToken: refresh },
    });
    tokenManager.setToken(access);
    if (refresh) {
      tokenManager.setRefreshToken(refresh);
    }
  }

  const setUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: { user } });
  };

  const fetchProfile = useCallback(async (): Promise<Profile | null> => {
    if (!state.token || !state.user?.profile_id) return null;
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const res = await axiosReq.get<Profile>(
        PROFILE_ENDPOINTS.profileDetail(state.user.profile_id),
      );
      dispatch({ type: 'SET_PROFILE', payload: { profile: res.data } });
      return res.data;
    } catch (e: unknown) {
      const err = e as ApiError;
      const errorMessage =
        typeof err.response?.data?.detail === 'string'
          ? err.response.data.detail
          : 'Failed to load profile';
      dispatch({ type: 'SET_ERROR', payload: { error: errorMessage } });
      return null;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    }
  }, [state.token, state.user?.profile_id]);

  useEffect(() => {
    void (async () => {
      const stored = tokenManager.getToken();
      if (!stored) return;

      dispatch({ type: 'SET_TOKENS', payload: { token: stored } });
      dispatch({ type: 'SET_LOADING', payload: { loading: true } });
      dispatch({ type: 'CLEAR_ERROR' });

      // try refresh
      if (tokenManager.isTokenExpired(stored)) {
        const newToken = await refreshAccessToken();
        if (newToken) setAuthTokens(newToken);
        else {
          logout();
          return;
        }
      }

      try {
        const userRes = await axiosReq.get<User>(AUTH_ENDPOINTS.user);
        dispatch({ type: 'SET_USER', payload: { user: userRes.data } });

        if (userRes.data.profile_id) {
          await fetchProfile();
        }
      } catch (e: unknown) {
        const err = e as ApiError;
        const errorMessage =
          typeof err.response?.data?.detail === 'string'
            ? err.response.data.detail
            : 'Authentication error';
        dispatch({ type: 'SET_ERROR', payload: { error: errorMessage } });
        logout();
      } finally {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
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
    user: state.user,
    profile: state.profile,
    token: state.token,
    refreshToken: state.refreshToken,
    isAuthenticated: state.isAuthenticated,
    login: () => Promise.resolve(false),
    register: () => Promise.resolve(false),
    logout,
    getProfile: fetchProfile,
    loading: state.loading,
    error: state.error,
    setUser,
    setAuthTokens,
    fetchProfile,
  };
}
