import { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios"

// 为某个实例添加拦截器 如baseURL:"http://codercba.com:1888/airbnb/api
export interface MyAxiosInterceptors {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig  //headers 
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: AxiosResponse) => AxiosResponse
  responseFailureFn?: (err: any) => any
}
export interface MyAxiosRequestConfig extends AxiosRequestConfig {
  interceptors?: MyAxiosInterceptors
}


// 为某个请求添加拦截器 如：/home/highscore
export interface MyRequestInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig  //headers 
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors<T>
}
