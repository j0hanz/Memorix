import { useAuth } from '@/hooks/useAuth';
import { useForm } from '@/hooks/useForm';
import { LoginCredentials, RegisterData } from '@/types/auth';
import {
  loginValidationRules,
  registerValidationRules,
} from '@/utils/validation';

// Login form hook
export function useLoginForm(onSuccess?: () => void) {
  const { login, loading, error: authError } = useAuth();

  const handleLogin = async (values: LoginCredentials) => {
    const success = await login(values);
    if (success && onSuccess) {
      onSuccess();
    }
    return success;
  };

  const formMethods = useForm(
    { username: '', password: '' },
    loginValidationRules,
    handleLogin,
  );

  return {
    ...formMethods,
    loading,
    authError,
  };
}

// Register form hook
export function useRegisterForm(onSuccess: () => void) {
  const { register, loading, error: authError } = useAuth();

  const handleRegister = async (values: RegisterData) => {
    try {
      const success = await register(values);
      if (success) onSuccess();
      return success;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
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
    authError,
  };
}
