import {
  ACCESS_TOKEN_STORAGE_KEY,
  AUTH_METHODS,
  REQ_METHODS,
} from '@/utils/constants';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { env } from 'env.mjs';

const axiosInstance = axios.create({
  timeout: 6000,
  baseURL: env.NEXT_PUBLIC_API_ENDPOINT,
});

export /**
 * @template T
 * @param {string} url
 * @param {Lowercase<Method>} [method]
 * @param {*} [data]
 * @param {AxiosRequestConfig} [config]
 * @return {*}  {Promise<AxiosResponse<T>>}
 */
const request = <T>(
  url: string,
  method?: Lowercase<Method>,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const defaultHeaders: AxiosRequestConfig['headers'] = {
    'Content-Type': 'application/json',
  };

  if (env.NEXT_PUBLIC_AUTH_METHOD == AUTH_METHODS.HEADER) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (accessToken) {
      defaultHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }

  const commonConfig: AxiosRequestConfig = {
    ...config,
    headers: Object.assign(defaultHeaders, config?.headers),
  };

  switch (method) {
    case REQ_METHODS.POST:
      return axiosInstance.post(url, data, commonConfig);
    case REQ_METHODS.PATCH:
      return axiosInstance.patch(url, data, commonConfig);
    case REQ_METHODS.PUT:
      return axiosInstance.put(url, data, commonConfig);
    case REQ_METHODS.DELETE:
      return axiosInstance.delete(url, {
        params: data,
        ...commonConfig,
      });
    default:
      return axiosInstance.get(url, {
        params: data,
        ...commonConfig,
      });
  }
};

export default axiosInstance;
