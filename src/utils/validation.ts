import type { ValidationRules } from '@/types/utils';

// Validation rules for form fields
export const required =
  (fieldName = 'Field') =>
  (value: string): string | null =>
    !value.trim() ? `${fieldName} is required` : null;

export const minLength =
  (length: number, fieldName = 'Field') =>
  (value: string): string | null =>
    value && value.length < length
      ? `${fieldName} must be at least ${String(length)} characters`
      : null;

export const matches =
  (matchField: string, fieldName = 'Field') =>
  (value: string, formValues?: Record<string, string>): string | null => {
    if (!formValues) return null;
    return value !== formValues[matchField]
      ? `${fieldName}s don't match`
      : null;
  };

export const compose =
  (
    ...validators: ((
      value: string,
      formValues?: Record<string, string>,
    ) => string | null)[]
  ) =>
  (value: string, formValues?: Record<string, string>): string | null => {
    for (const validator of validators) {
      const error = validator(value, formValues);
      if (error) return error;
    }
    return null;
  };

// Check if a form is complete
export const isFormComplete = (
  values: Record<string, string>,
  requiredFields: string[],
): boolean => {
  return requiredFields.every((field) => values[field]?.trim() !== '');
};

// Check if a form has any validation errors
export const hasValidationErrors = (
  errors: Record<string, string>,
): boolean => {
  return Object.keys(errors).length > 0;
};

// Login validation configuration
export const loginValidationRules: ValidationRules = {
  username: required('Username'),
  password: required('Password'),
};

export const loginRequiredFields = ['username', 'password'];

// Register validation configuration
export const registerValidationRules: ValidationRules = {
  username: required('Username'),
  password1: compose(required('Password'), minLength(6, 'Password')),
  password2: compose(
    required('Password confirmation'),
    matches('password1', 'Password'),
  ),
};

export const registerRequiredFields = ['username', 'password1', 'password2'];

// Profile password validation configuration
export const profilePasswordValidationRules: ValidationRules = {
  oldPassword: required('Current password'),
  newPassword1: compose(required('New password'), minLength(6, 'New password')),
  newPassword2: compose(
    required('Password confirmation'),
    matches('newPassword1', 'New password'),
  ),
};

export const profilePasswordRequiredFields = [
  'oldPassword',
  'newPassword1',
  'newPassword2',
];
