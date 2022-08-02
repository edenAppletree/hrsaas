// 路由权限

import router from '@/router'
import store from '@/store'
import {Store} from 'vuex'

// 全局前置路由守卫
const whiteList = ['/login', '/404']
// 会在所有路由进入之前触发
router.beforeEach((to, from, next) => {
  // 进行权限控制
  // 调用了next 进入该路由，如果没有调用则无法进入
  const token = store.state.user.token
  // 1.如果登录过了
  if (token) {
    if (!store.state.user.userInfo.userId) {
      // 获取用户信息
      store.dispatch('user/getUserInfo')
    }
    //  登录成功后不能再退回到登录页面
    if (token.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    //2.如果未登录
    //   判断访问的是否在白名单内，白名单内的是未登录也能访问的页面
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      next()
    } else {
      next('/login')
    }
  }
})
