import type { ApiError } from '@/types/api';

// Format API error messages
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
