import MYRequest from "./axios"
import { BASE_URL, TIME_OUT } from "./config"
import { localCatch } from "@/utils/catch"

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //拦截器里 在请求拦截器里取出token并带上
  interceptors: {
    // 局部网络请求
    requestSuccessFn: (config) => {
      const token = localCatch.getCatch("token")
      if (config.headers && token) {
        config.headers.Authorization = token
      }

      return config
    }
  }
})
export default myRequest
