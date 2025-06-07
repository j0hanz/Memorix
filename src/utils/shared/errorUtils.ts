import type {
  ApiError,
  AppError,
  ErrorCategory,
  ErrorSeverity,
} from '@/types/services';

export const createAppError = (
  message: string,
  options?: {
    code?: string;
    severity?: ErrorSeverity;
    details?: unknown;
    category?: ErrorCategory;
  },
): AppError => {
  return {
    message,
    code: options?.code,
    severity: options?.severity || 'error',
    timestamp: new Date(),
    details: options?.details,
    handled: false,
  };
};

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as ApiError).response === 'object'
  );
};

const HTTP_STATUS_MESSAGES: Record<number, string> = {
  401: 'Your session has expired. Please log in again.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested resource was not found.',
  500: 'A server error occurred. Please try again later.',
};

// Main error formatter - handles all API errors with user-friendly messages
export const formatErrorMessage = (error: unknown): string => {
  // Handle non-API errors
  if (!isApiError(error)) {
    if (error instanceof TypeError && error.message.includes('network')) {
      return 'Unable to connect to the server. Please check your internet connection.';
    }
    if (
      error instanceof Error &&
      error.message.toLowerCase().includes('timeout')
    ) {
      return 'The request took too long to complete. Please try again.';
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred';
  }

  // Handle HTTP status codes
  const statusMsg = HTTP_STATUS_MESSAGES[error.response?.status as number];
  if (statusMsg) {
    return statusMsg;
  }

  // Handle API response data
  const data = error.response?.data;
  if (!data) return 'An unexpected error occurred';

  if (typeof data === 'string') return data;

  // Handle authentication errors (login/register)
  if (
    Array.isArray(data.non_field_errors) &&
    data.non_field_errors.length > 0
  ) {
    const errorMessage = data.non_field_errors[0];

    // Login errors
    if (
      errorMessage === 'Unable to log in with provided credentials.' ||
      errorMessage.includes('credentials') ||
      errorMessage.includes('invalid')
    ) {
      return 'Incorrect username or password.';
    }

    // Account status errors
    if (
      errorMessage.includes('inactive') ||
      errorMessage.includes('disabled')
    ) {
      return 'Your account has been disabled. Please contact support.';
    }

    // Password change errors
    if (
      errorMessage.includes('old password') ||
      errorMessage.includes('current password')
    ) {
      return 'The current password you entered is incorrect.';
    }

    if (
      errorMessage.includes('new password') ||
      errorMessage.includes('password mismatch')
    ) {
      return 'The new passwords you entered do not match.';
    }

    return data.non_field_errors.join(' ');
  }

  // Handle field-specific errors with user-friendly messages
  const fieldErrors: string[] = [];

  // Username errors
  if (data.username) {
    const usernameErrors = Array.isArray(data.username)
      ? data.username
      : [data.username];
    if (
      usernameErrors.some(
        (err: string) =>
          err.includes('already exists') || err.includes('taken'),
      )
    ) {
      return 'This username is already taken. Please choose a different one.';
    }
    if (
      usernameErrors.some(
        (err: string) => err.includes('invalid') || err.includes('characters'),
      )
    ) {
      return 'Username contains invalid characters. Please use only letters, numbers, and underscores.';
    }
    fieldErrors.push(`Username: ${usernameErrors.join(', ')}`);
  }

  // Password errors (registration)
  if (data.password1) {
    const passwordErrors = Array.isArray(data.password1)
      ? data.password1
      : [data.password1];
    if (
      passwordErrors.some(
        (err: string) => err.includes('too short') || err.includes('minimum'),
      )
    ) {
      return 'Password is too short. It must be at least 8 characters long.';
    }
    if (
      passwordErrors.some(
        (err: string) =>
          err.includes('too common') || err.includes('common password'),
      )
    ) {
      return 'This password is too common. Please choose a more unique password.';
    }
    if (
      passwordErrors.some(
        (err: string) =>
          err.includes('numeric') || err.includes('entirely numeric'),
      )
    ) {
      return 'Password cannot be entirely numeric. Please include letters or symbols.';
    }
    if (
      passwordErrors.some(
        (err: string) => err.includes('similar') || err.includes('username'),
      )
    ) {
      return 'Password cannot be too similar to your username.';
    }
    fieldErrors.push(`Password: ${passwordErrors.join(', ')}`);
  }

  // Password confirmation errors
  if (data.password2) {
    const confirmPasswordErrors = Array.isArray(data.password2)
      ? data.password2
      : [data.password2];
    if (
      confirmPasswordErrors.some(
        (err: string) => err.includes('match') || err.includes('same'),
      )
    ) {
      return 'Passwords do not match. Please make sure both passwords are identical.';
    }
    fieldErrors.push(`Confirm password: ${confirmPasswordErrors.join(', ')}`);
  }

  // Password change specific errors
  if (data.old_password) {
    const oldPasswordErrors = Array.isArray(data.old_password)
      ? data.old_password
      : [data.old_password];
    if (
      oldPasswordErrors.some(
        (err: string) => err.includes('incorrect') || err.includes('wrong'),
      )
    ) {
      return 'The current password you entered is incorrect.';
    }
    fieldErrors.push(`Current password: ${oldPasswordErrors.join(', ')}`);
  }

  if (data.new_password1) {
    const newPasswordErrors = Array.isArray(data.new_password1)
      ? data.new_password1
      : [data.new_password1];
    if (
      newPasswordErrors.some(
        (err: string) => err.includes('too short') || err.includes('minimum'),
      )
    ) {
      return 'Your new password is too short. It must be at least 8 characters long.';
    }
    if (
      newPasswordErrors.some(
        (err: string) =>
          err.includes('too common') || err.includes('common password'),
      )
    ) {
      return 'This password is too common. Please choose a more unique password.';
    }
    if (
      newPasswordErrors.some(
        (err: string) =>
          err.includes('numeric') || err.includes('entirely numeric'),
      )
    ) {
      return 'Your password cannot be entirely numeric. Please include letters or symbols.';
    }
    if (
      newPasswordErrors.some(
        (err: string) => err.includes('similar') || err.includes('username'),
      )
    ) {
      return 'Your password cannot be too similar to your username.';
    }
    fieldErrors.push(`New password: ${newPasswordErrors.join(', ')}`);
  }

  if (data.new_password2) {
    const confirmPasswordErrors = Array.isArray(data.new_password2)
      ? data.new_password2
      : [data.new_password2];
    fieldErrors.push(`Confirm password: ${confirmPasswordErrors.join(', ')}`);
  }

  // Handle detail field
  if (typeof data.detail === 'string') {
    if (data.detail === 'Invalid token.') {
      return 'Your session has expired. Please log in again.';
    }
    return data.detail;
  }

  // Return field errors if any
  if (fieldErrors.length > 0) {
    return fieldErrors.join('; ');
  }

  // Generic field error handling
  const genericErrors = Object.entries(data).map(([key, value]) => {
    const message = Array.isArray(value) ? value.join(', ') : String(value);
    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
    return `${formattedKey}: ${message}`;
  });

  return genericErrors.length > 0
    ? genericErrors.join('; ')
    : 'An unexpected error occurred';
};

// Simplified aliases for backward compatibility and specific contexts
export const formatLoginError = formatErrorMessage;
export const formatRegisterError = formatErrorMessage;
export const formatPasswordChangeError = formatErrorMessage;
export const getUserFriendlyMessage = formatErrorMessage;

export const logError = (
  error: unknown,
  context?: string,
  severity: ErrorSeverity = 'error',
): void => {
  const timestamp = new Date().toISOString();
  const contextPrefix = context ? `[${context}] ` : '';
  const errorMessage = error instanceof Error ? error.message : String(error);

  switch (severity) {
    case 'info':
      console.info(`${timestamp} ${contextPrefix}${errorMessage}`, error);
      break;
    case 'warning':
      console.warn(`${timestamp} ${contextPrefix}${errorMessage}`, error);
      break;
    case 'critical':
      console.error(
        `${timestamp} CRITICAL ${contextPrefix}${errorMessage}`,
        error,
      );
      break;
    case 'error':
    default:
      console.error(`${timestamp} ${contextPrefix}${errorMessage}`, error);
  }
};

export const handleAsyncOperation = async <T>(
  operation: () => Promise<T>,
  options?: {
    context?: string;
    onError?: (error: unknown) => void;
    errorMessage?: string;
  },
): Promise<[T | null, AppError | null]> => {
  try {
    const result = await operation();
    return [result, null];
  } catch (error) {
    // Always try to parse the API error first, fall back to generic message only if parsing fails
    const userFriendlyMessage = getUserFriendlyMessage(error);
    const errorMessage =
      userFriendlyMessage === 'An unexpected error occurred'
        ? options?.errorMessage || userFriendlyMessage
        : userFriendlyMessage;

    const appError = createAppError(errorMessage, {
      details: error,
      severity: 'error',
    });
    logError(error, options?.context);
    if (options?.onError) {
      options.onError(error);
    }
    return [null, appError];
  }
};
