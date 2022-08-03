// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
import axios from 'axios'
import {Message} from 'element-ui'
import {getTokenTime} from './auth'
import router from '@/router'

// 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(async (config) => {
  const tokenTime = getTokenTime()
  const currentTime = Date.now()
  const timeout = 2 * 60 * 60 * 1000 //2小时
  // 当前请求的配置
  if (store.state.user.token) {
    // token存在时先判断token有没有过期
    if (currentTime - tokenTime > timeout) {
      // 过期 清空token 跳回到登录页
      await store.dispatch('user/logout')
      router.push('/login')
      // 错误信息提示
      return Promise.reject(new Error('登录过期'))
    } else {
      // token 没有过期再携带请求头
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
})
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // console.log(res)
    // return res.data.data
    // 请求成功的函数
    const {success, data, message} = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async function (error) {
    // 对响应错误做点什么
    // error?.response?.status === 401 es11新语法，判断是否存在error，error对象里面是否存在response属性等等
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      // 过期 清空token 跳回到登录页
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  },
)
export default service // 导出axios实例
