import type { Profile, User } from '@/types/data';
import type { AuthAction } from '@/types/reducers';

// Loading state
export const loadingActions = {
  setLoading: (loading: boolean): AuthAction => ({
    type: 'SET_LOADING',
    payload: { loading },
  }),
};

// Error state
export const errorActions = {
  setError: (error: string | null): AuthAction => ({
    type: 'SET_ERROR',
    payload: { error },
  }),
  clearError: (): AuthAction => ({
    type: 'CLEAR_ERROR',
  }),
};

// User management
export const userActions = {
  setUser: (user: User | null): AuthAction => ({
    type: 'SET_USER',
    payload: { user },
  }),
  setProfile: (profile: Profile | null): AuthAction => ({
    type: 'SET_PROFILE',
    payload: { profile },
  }),
};

// Authentication
export const authActions = {
  setTokens: (token: string, refreshToken?: string): AuthAction => ({
    type: 'SET_TOKENS',
    payload: { token, refreshToken },
  }),
  logout: (): AuthAction => ({
    type: 'LOGOUT',
  }),
};

// Combined export for convenience
export const authActionCreators = {
  ...loadingActions,
  ...errorActions,
  ...userActions,
  ...authActions,
};
