import type { AuthAction, AuthState } from '@/types/reducers';

export const initialAuthState: AuthState = {
  user: null,
  profile: null,
  token: '',
  refreshToken: '',
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Reducer function for the auth state
export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      // Set loading state
      return {
        ...state,
        loading: action.payload.loading,
      };

    case 'SET_ERROR':
      // Set error state
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    case 'SET_USER':
      // Set user data
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: Boolean(action.payload.user && state.token),
      };

    case 'SET_PROFILE':
      // Set profile data
      return {
        ...state,
        profile: action.payload.profile,
      };

    case 'SET_TOKENS':
      // Set authentication tokens
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken || state.refreshToken,
        isAuthenticated: Boolean(state.user && action.payload.token),
      };

    case 'LOGOUT':
      // Reset to initial state on logout
      return initialAuthState;

    case 'CLEAR_ERROR':
      // Clear error state
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
