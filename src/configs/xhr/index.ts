import axios from 'axios';
import { stringify } from 'qs';

import { IXhr } from './types';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const sendGet = async ({ url, params, signal }: IXhr) => {
  const stringParams = stringify(params, { arrayFormat: 'repeat' });

  try {
    const response = await axios({
      url: `${url}?${stringParams}`,
      method: 'GET',
      signal,
    });
    return response.data;
  } catch (err: unknown) {
    throw err;
  }
};

const sendPost = async ({ url, params, signal, config }: IXhr) => {
  try {
    const response = await axios({
      url,
      method: 'POST',
      data: params,
      signal,
      ...config,
    });
    return response.data;
  } catch (err: unknown) {
    throw err;
  }
};

const sendPut = async ({ url, params, signal }: IXhr) => {
  try {
    const response = await axios({
      url,
      method: 'PUT',
      data: params,
      signal,
    });
    return response.data;
  } catch (err: unknown) {
    throw err;
  }
};

const sendDelete = async ({ url, params, signal }: IXhr) => {
  try {
    const response = await axios({
      url,
      method: 'DELETE',
      data: params,
      signal,
    });
    return response.data;
  } catch (err: unknown) {
    throw err;
  }
};

export { sendGet, sendPost, sendPut, sendDelete };
