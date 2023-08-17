import { BASE_URL, TIMEOUT } from "./config"
import MyRequest from "./request"

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT
  
})

export const myRequest2 = new MyRequest({
  baseURL:"http://codercba.com:1888/airbnb/api",
  timeout: 3000,
  // 为某个baseURL添加拦截器
  interceptors: {
    requestSuccessFn: (config) => {
      console.log("爱彼迎的请求成功的拦截")
      return config
    },
    requestFailureFn: (err) => {
      console.log("爱彼迎的请求失败的拦截")
      return err
    },
    responseSuccessFn: (config) => {
      console.log("爱彼迎的响应成功的拦截")
      return config
    },
    responseFailureFn: (err) => {
      console.log("爱彼迎的响应失败的拦截")
      return err
    }
  }
})

export default myRequest