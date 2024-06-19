import {
  ACCESS_TOKEN_STORAGE_KEY,
  AUTH_METHOD,
  THROW_EXCEPTION,
} from '@/utils/constants';
import { env } from 'env.mjs';
import qs from 'qs';

const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json',
};

const BASE_URL = env.NEXT_PUBLIC_API_ENDPOINT;
const DEFAULT_TIMEOUT = 20000;

const request = async (
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  data?: any,
  options?: RequestInit,
): Promise<Response | null | { message: string }> => {
  const controller = new AbortController();

  if (options?.signal) {
    options.signal.addEventListener('abort', () => controller.abort());
  }

  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  if (env.NEXT_PUBLIC_AUTH_METHOD === AUTH_METHOD.HEADER) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (accessToken) {
      defaultHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }

  const commonOptions: RequestInit = {
    ...options,
    signal: controller.signal,
    headers: Object.assign(defaultHeaders, options?.headers),
    method,
    next: {
      tags: [url],
    },
    credentials: 'include',
  };

  switch (method) {
    case 'DELETE':
    case 'GET':
      url += data ? `?${qs.stringify(data)}` : '';
      break;
    case 'POST':
    case 'PATCH':
    case 'PUT':
      commonOptions.body = JSON.stringify(data);
      break;
  }

  try {
    const res = await fetch(BASE_URL + url, commonOptions);
    const result = await res.json();
    return result;
  } catch {
    return { message: THROW_EXCEPTION.UNKNOWN };
  } finally {
    clearTimeout(timeout);
  }
};

export { request };
