import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * Type for request/response interceptor handlers.
 */
type RequestInterceptor = {
  onFulfilled: (
    value: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  onRejected?: (error: unknown) => unknown;
};

type ResponseInterceptor = {
  onFulfilled: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  onRejected?: (error: unknown) => unknown;
};

/**
 * AxiosClientBuilder class for building and configuring an Axios instance.
 */
class AxiosClientBuilder {
  private config: AxiosRequestConfig = {};
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  /**
   * Sets the Axios configuration.
   */
  public setConfig(config: AxiosRequestConfig): this {
    this.config = config;
    return this;
  }

  /**
   * Adds a request interceptor.
   */
  public addRequestInterceptor(interceptor: RequestInterceptor): this {
    this.requestInterceptors.push(interceptor);
    return this;
  }

  /**
   * Adds a response interceptor.
   */
  public addResponseInterceptor(interceptor: ResponseInterceptor): this {
    this.responseInterceptors.push(interceptor);
    return this;
  }

  /**
   * Builds and returns a configured Axios instance.
   */
  public build(): AxiosInstance {
    const instance = axios.create(this.config);

    this.requestInterceptors.forEach(({ onFulfilled, onRejected }) => {
      instance.interceptors.request.use(onFulfilled, onRejected);
    });

    this.responseInterceptors.forEach(({ onFulfilled, onRejected }) => {
      instance.interceptors.response.use(onFulfilled, onRejected);
    });

    return instance;
  }
}

/**
 * AxiosClientDirector class for constructing an Axios instance using AxiosClientBuilder.
 */
class AxiosClientDirector {
  constructor(private readonly builder: AxiosClientBuilder) {}

  /**
   * Constructs an Axios instance with provided configuration and interceptors.
   */
  public construct(
    config: AxiosRequestConfig,
    requestInterceptor?: RequestInterceptor,
    responseInterceptor?: ResponseInterceptor,
  ): AxiosInstance {
    this.builder.setConfig(config);

    if (requestInterceptor) {
      this.builder.addRequestInterceptor(requestInterceptor);
    }

    if (responseInterceptor) {
      this.builder.addResponseInterceptor(responseInterceptor);
    }

    return this.builder.build();
  }
}

export { AxiosClientBuilder, AxiosClientDirector };
