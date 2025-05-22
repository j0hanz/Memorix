import { useState } from 'react';

import { useForm } from '@/hooks/useForm';
import { useError, useToast } from '@/hooks/useProvider';
import { axiosReq } from '@/services/axios';
import type { RegisterData } from '@/types/services';
import type { ApiError } from '@/types/services';
import { formatErrorMessage, logError } from '@/utils/errorUtils';
import { registerValidationRules } from '@/utils/validation';

export function useRegister(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setError: setGlobalError } = useError();
  const { showToast } = useToast();

  const handleRegister = async (values: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      await axiosReq.post('/dj-rest-auth/registration/', values);
      showToast('Registration successful!');
      onSuccess();
      return true;
    } catch (err: unknown) {
      const errorMessage = formatErrorMessage(err as ApiError);
      setError(errorMessage);
      showToast(errorMessage);
      logError(err, 'Registration', 'error');
      setGlobalError(err, 'Registration');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const formMethods = useForm(
    { username: '', password1: '', password2: '' },
    registerValidationRules,
    handleRegister,
  );

  return {
    ...formMethods,
    loading,
    authError: error,
  };
}
