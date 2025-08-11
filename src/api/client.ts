import {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { AxiosClientBuilder, AxiosClientDirector } from '~lib/client';

const requestInterceptor = {
  onFulfilled: (config: InternalAxiosRequestConfig) => {
    return config;
  },
  onRejected: (error: unknown) => {
    return Promise.reject(error);
  },
};

const responseInterceptor = {
  onFulfilled: (response: AxiosResponse) => {
    return response;
  },
  onRejected: (error: unknown) => {
    return Promise.reject(error);
  },
};

const builder = new AxiosClientBuilder();
const director = new AxiosClientDirector(builder);

export const axiosInstance = director.construct(
  {
    baseURL: 'https://dummyjson.com/todos',
    headers: { 'Content-Type': 'application/json' },
  } satisfies AxiosRequestConfig,
  requestInterceptor,
  responseInterceptor,
);
