import { useContext } from 'react';
import { axiosReq } from '@/api/axios';
import { AuthContext } from '@/contexts/AuthContext';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  Profile,
} from '@/types/auth';
import { ApiError } from '@/types/api';

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

// AuthService to handle authentication-related tasks
export const authService = {
  // Format API error messages
  formatErrorMessage: (error: ApiError): string => {
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
  },

  // Login function
  login: async (
    credentials: LoginCredentials,
    callbacks: {
      setLoading: (loading: boolean) => void;
      setError: (error: string | null) => void;
      setAuthTokens: (access: string, refresh?: string) => void;
      setUser: (user: User) => void;
      fetchProfile: () => Promise<Profile | null>;
    },
  ): Promise<boolean> => {
    const { setLoading, setError, setAuthTokens, setUser, fetchProfile } =
      callbacks;

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
      setError(authService.formatErrorMessage(errorObj));
      return false;
    } finally {
      setLoading(false);
    }
  },

  // Register function
  register: async (
    userData: RegisterData,
    callbacks: {
      setLoading: (loading: boolean) => void;
      setError: (error: string | null) => void;
    },
  ): Promise<boolean> => {
    const { setLoading, setError } = callbacks;

    setLoading(true);
    setError(null);

    try {
      await axiosReq.post('/dj-rest-auth/registration/', userData);
      return true;
    } catch (err: unknown) {
      console.error('Registration failed:', err);
      const errorObj = err as ApiError;
      setError(authService.formatErrorMessage(errorObj));
      return false;
    } finally {
      setLoading(false);
    }
  },
};
