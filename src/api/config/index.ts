import { accessTokenAtom } from 'atoms/auth.store';
import { store } from 'atoms/store';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'query-string';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'comma' }); // Serialize arrays with commas
  },
});

const onRequest = async (config: AxiosRequestConfig): Promise<any> => {
  const accessToken = store.get(accessTokenAtom);
  if (!accessToken) return config;

  const headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
  return { ...config, headers };
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response.data;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    store.set(accessTokenAtom, null);
  }
  return Promise.reject(error);
};

api.interceptors.request.use(onRequest, onRequestError);
api.interceptors.response.use(onResponse, onResponseError);
