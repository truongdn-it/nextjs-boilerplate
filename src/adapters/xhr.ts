import axios from 'axios';
import { env } from 'env.mjs';
import { stringify } from 'qs';

import { IXhr } from './types';

class HttpClient {
  constructor() {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.baseURL = env.NEXT_PUBLIC_API_ENDPOINT;
  }

  static async sendGet({ params, url, signal, headers }: IXhr) {
    const stringParams = stringify(params, { arrayFormat: 'repeat' });

    try {
      const response = await axios({
        url: `${url}?${stringParams}`,
        method: 'GET',
        signal,
        headers: {
          ...headers,
        },
      });
      return response.data;
    } catch (err: unknown) {
      throw err;
    }
  }

  static async sendPost({ url, params, signal, headers }: IXhr) {
    try {
      const response = await axios({
        url,
        method: 'POST',
        data: params,
        signal,
        headers: {
          ...headers,
        },
      });
      return response.data;
    } catch (err: unknown) {
      throw err;
    }
  }

  static async sendPut() {
    async ({ url, params, signal, headers }: IXhr) => {
      try {
        const response = await axios({
          url,
          method: 'PUT',
          data: params,
          signal,
          headers: {
            ...headers,
          },
        });
        return response.data;
      } catch (err: unknown) {
        throw err;
      }
    };
  }

  static async sendDelete() {
    async ({ url, params, signal, headers }: IXhr) => {
      try {
        const response = await axios({
          url,
          method: 'DELETE',
          data: params,
          signal,
          headers: {
            ...headers,
          },
        });
        return response.data;
      } catch (err: unknown) {
        throw err;
      }
    };
  }
}

export default HttpClient;
