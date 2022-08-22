// 登录成功以后的用户信息
import {login, getUserInfoApi, getUserDetailInfo} from '@/api/user.js'
import {setTokenTime} from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      context.commit('setToken', res)
      setTokenTime()
    },
    // 获取用户信息
    async getUserInfo(context) {
      const userBasicInfo = await getUserInfoApi()
      const userDetailInfo = await getUserDetailInfo(userBasicInfo.userId)
      // console.log(userBasicInfo)
      context.commit('setUserInfo', { ...userBasicInfo, ...userDetailInfo })
      // async修饰，return返回的值被包装成promise，可以在外界接收，在哪里接收呢？外界通过dispatch给当前的async修饰的函数传值调用时，返回的数据就是return的值
      return userBasicInfo
    },
    // 退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    },
  },
}
