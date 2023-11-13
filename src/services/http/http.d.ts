/* eslint-disable no-unused-vars */
interface IXhr {
  params?: any;
  url: string;
  signal?: any;
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
}

export { IXhr };
