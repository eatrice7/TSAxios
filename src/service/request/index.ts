import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import type { MyRequestConfig, MyAxiosRequestConfig } from "./type"

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 * 
 *  2.响应结果的类型处理(泛型)
 */
 
class MyRequest {
  instance: AxiosInstance
  constructor(config: MyAxiosRequestConfig) {
    // 为了防止形参写死，传入config对象
    this.instance = axios.create(config)

    // 为每个instance实例都添加拦截器
    this.instance.interceptors.request.use((config) => {
      console.log("全局请求成功的拦截！", "loading动画")
      return config
    }, (err) => {
      console.log("全局请求失败的拦截！")
      return err
    })
    this.instance.interceptors.response.use((res) => {
      console.log("全局响应成功的拦截！")
      // 服务器返回的真实数据
      return res.data
    }, (err) => {
      console.log("全局响应失败的拦截！")
      return err
    })

    // 单独为爱彼迎添加拦截器， 对axios进行精细化控制
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailureFn
      ),
      this.instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.responseFailureFn
      )
    }
  }

  // 为单个网络请求添加拦截器
  // axios返回结果的类型处理
  // T => IHomeData类型
  request<T = any>(config: MyRequestConfig<T>) {
    // 盲点：不能添加到this.instance.interceptors中，如果添加到里面每个请求都会执行拦截器的回调函数，会有问题
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors?.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((reslove, reject) => {

      // --实际发生的网络请求--
      this.instance.request<any, T>(config).then(res => {
        // 单次响应的成功拦截处理
        if (config.interceptors?.responseSuccessFn) {
          res = config.interceptors.responseSuccessFn(res)
        }
        reslove(res)
      }).catch(err => {
        reject(err)
      })
    }) 

  }

  get<T = any>(config: MyRequestConfig<T>) {
    return this.request({...config, method: "GET"})
  }

  post<T = any>(config: MyRequestConfig<T>) {
    return this.request({...config, method: "POST"})
  }

  patch<T = any>(config: MyRequestConfig<T>) {
    return this.request({...config, method: "PATCH"})
  }

  delete<T = any>(config: MyRequestConfig<T>) {
    return this.request({...config, method: "DELETE"})
  }
}

export default MyRequest