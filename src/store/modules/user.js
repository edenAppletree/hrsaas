// 登录成功以后的用户信息
import {login} from '@/api/user.js'
export default {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      context.commit('setToken', res)
      // console.log(222);
    },
  },
}
