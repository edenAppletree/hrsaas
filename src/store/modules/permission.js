import router, {constantRoutes, asyncRoutes} from '@/router/index'
import {resetRouter} from '@/router'

export default {
  namespaced: true,
  state: {
    routes: [],
    //动态路由规则store不自动维护，需要我们自己来维护路由规则，这了维护的是所有的路由规则（静态路由+筛选后的动态路由）
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
  },
  actions: {
    filterRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        // console.log(item.meta.id)
        // 如果权限标识在roles.menus，有这个权限，返回true
        // 如果权限标识不在roles.menus，没有这个权限，返回false
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRoutes', routes)
      // 怎么动态添加路由规则？
      router.addRoutes([...routes, {path: '*', redirect: '/404', hidden: true}])
    },
    // 退出， 路由进行重置。vuex也进行重置
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      resetRouter()
      // {root: true} context 相当于全局的context
      context.commit('permission/setRoutes', [], {root: true})
    },
  },
}
