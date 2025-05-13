import type {
  ApiError,
  AppError,
  ErrorCategory,
  ErrorSeverity,
} from '@/types/api';

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

export const getUserFriendlyMessage = (
  error: unknown,
  fallbackMessage = 'An unexpected error occurred',
): string => {
  // Network errors
  if (error instanceof TypeError && error.message.includes('network')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }

  // Timeout errors
  if (
    error instanceof Error &&
    error.message.toLowerCase().includes('timeout')
  ) {
    return 'The request took too long to complete. Please try again.';
  }

  // API errors with response data
  if (
    isApiError(error) &&
    error.response?.status &&
    typeof error.response.status === 'number'
  ) {
    // Handle specific HTTP status codes
    switch (error.response.status) {
      case 401:
        return 'Your session has expired. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 500:
        return 'A server error occurred. Please try again later.';
      default:
        return formatErrorMessage(error);
    }
  }

  // For errors with a message property
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback case
  return fallbackMessage;
};

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as ApiError).response === 'object'
  );
};

export const formatErrorMessage = (error: ApiError): string => {
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
};

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
    const appError = createAppError(
      options?.errorMessage || getUserFriendlyMessage(error),
      {
        details: error,
        severity: 'error',
      },
    );
    logError(error, options?.context);
    if (options?.onError) {
      options.onError(error);
    }
    return [null, appError];
  }
};
