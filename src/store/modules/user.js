// 登录成功以后的用户信息
import { login, getUserInfoApi, getUserDetailInfo } from '@/api/user.js'
import { setTokenTime } from '@/utils/auth'

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
      context.commit('setUserInfo', {...userBasicInfo, ...userDetailInfo})
    },
    // 退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    },
  },
}
