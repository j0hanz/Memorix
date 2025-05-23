import { useState } from 'react';

import { useForm } from '@/hooks/useForm';
import { useError, useToast } from '@/hooks/useProvider';
import { useServices } from '@/hooks/useServices';
import type { RegisterData } from '@/types/services';
import type { ApiError } from '@/types/services';
import { formatErrorMessage, logError } from '@/utils/errorUtils';
import { registerValidationRules } from '@/utils/validation';

export function useRegister(onSuccess: () => void) {
  const { auth } = useServices();
  const { setError } = useError();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const handleRegister = async (values: RegisterData) => {
    setLoading(true);
    setRegisterError(null);

    try {
      await auth.register(values);
      showToast('Registration successful! Please login.');
      onSuccess();
      return true;
    } catch (err: unknown) {
      const errorMessage = formatErrorMessage(err as ApiError);
      setRegisterError(errorMessage);
      showToast(errorMessage);
      logError(err, 'Register', 'error');
      setError(err, 'Register');
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
    registerError,
  };
}
