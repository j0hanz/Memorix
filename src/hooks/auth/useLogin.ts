import { useState } from 'react';

import { useServices } from '@/hooks/api/useServices';
import { useForm } from '@/hooks/forms/useForm';
import { useAuth, useError, useToast } from '@/hooks/shared/useProvider';
import type { LoginCredentials } from '@/types/services';
import type { ApiError } from '@/types/services';
import { formatErrorMessage, logError } from '@/utils/errorUtils';
import { tokenManager } from '@/utils/tokenUtils';
import { loginValidationRules } from '@/utils/validation';

export function useLogin(onSuccess?: () => void) {
  const { auth } = useServices();
  const { setAuthTokens, setUser, fetchProfile } = useAuth();
  const { setError } = useError();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (values: LoginCredentials) => {
    setLoading(true);
    setLoginError(null);

    try {
      const response = await auth.login(values);

      const { accessToken, refreshToken } =
        tokenManager.parseTokensFromResponse(response);

      if (!accessToken) {
        setLoginError('Access token not found in response');
        return false;
      }

      if (refreshToken) {
        setAuthTokens(accessToken, refreshToken);
      } else {
        setAuthTokens(accessToken);
      }

      if (response.user) {
        setUser(response.user);
      } else {
        const userResponse = await auth.getCurrentUser();
        setUser(userResponse);
      }

      await fetchProfile();

      if (onSuccess) {
        onSuccess();
      }

      return true;
    } catch (err: unknown) {
      const errorMessage = formatErrorMessage(err as ApiError);
      setLoginError(errorMessage);
      showToast(errorMessage);
      logError(err, 'Login', 'error');
      setError(err, 'Login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const formMethods = useForm(
    { username: '', password: '' },
    loginValidationRules,
    handleLogin,
  );

  return {
    ...formMethods,
    loading,
    loginError,
  };
}
