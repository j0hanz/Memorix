import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type { ApiPaginationParams, ApiRequestOptions } from '@/types/services';
import type { PaginatedData } from '@/types/utils';
import { axiosReq } from '@/utils/axios';
import { handleAsyncOperation } from '@/utils/errorUtils';

// This function executes an API request and handles errors uniformly.
async function executeRequest<T>(
  requestFn: () => Promise<AxiosResponse<T>>,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { context = 'ApiService', errorMessage = 'Request failed' } = options;

  const [result, error] = await handleAsyncOperation(requestFn, {
    context,
    errorMessage,
  });

  if (error) {
    throw new Error(error.message);
  }

  return result?.data as T;
}

// This service provides methods to interact with the API using Axios.
export async function get<T>(
  endpoint: string,
  params?: Record<string, unknown>,
  options?: ApiRequestOptions,
  config?: AxiosRequestConfig,
): Promise<T> {
  return executeRequest(
    () => axiosReq.get<T>(endpoint, { params, ...config }),
    options,
  );
}

// This function performs a POST request to the specified endpoint with optional data and configuration.
export async function post<T>(
  endpoint: string,
  data?: unknown,
  options?: ApiRequestOptions,
  config?: AxiosRequestConfig,
): Promise<T> {
  return executeRequest(
    () => axiosReq.post<T>(endpoint, data, config),
    options,
  );
}

// This function performs a PUT request to the specified endpoint with optional data and configuration.
export async function put<T>(
  endpoint: string,
  data?: unknown,
  options?: ApiRequestOptions,
  config?: AxiosRequestConfig,
): Promise<T> {
  return executeRequest(() => axiosReq.put<T>(endpoint, data, config), options);
}

// This function performs a PATCH request to the specified endpoint with optional data and configuration.
export async function patch<T>(
  endpoint: string,
  data?: unknown,
  options?: ApiRequestOptions,
  config?: AxiosRequestConfig,
): Promise<T> {
  return executeRequest(
    () => axiosReq.patch<T>(endpoint, data, config),
    options,
  );
}

// This function performs a DELETE request to the specified endpoint with optional configuration.
export async function deleteRequest<T>(
  endpoint: string,
  options?: ApiRequestOptions,
  config?: AxiosRequestConfig,
): Promise<T> {
  return executeRequest(() => axiosReq.delete<T>(endpoint, config), options);
}

// This function retrieves paginated data from the specified endpoint with optional parameters.
export async function getPaginated<T>(
  endpoint: string,
  params: ApiPaginationParams = {},
  options?: ApiRequestOptions,
): Promise<PaginatedData<T>> {
  const { page = 1, pageSize = 10, ...otherParams } = params;

  return get<PaginatedData<T>>(
    endpoint,
    { page, page_size: pageSize, ...otherParams },
    options,
  );
}

// This function retrieves a list of items from the specified endpoint with optional parameters.
export async function getList<T>(
  endpoint: string,
  params?: Record<string, unknown>,
  options?: ApiRequestOptions,
): Promise<T[]> {
  return get<T[]>(endpoint, params, options);
}
