import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as directives from '@/directives'

import components from './components'

import * as filters from '@/filters'

// 注册自定义指令
for (let key in directives) {
  Vue.directive(key, directives[key])
}
// 注册全局过滤器
for (let key in filters) {
  Vue.filter(key, filters[key])
}

// 注册自定义组件
Vue.use(components)

if (process.env.NODE_ENV === 'production') {
  const {mockXHR} = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, {locale})

// 自定义指令
// 参数1.自定义指令的名字，不需要+ v-
// 参数2：是配置对象
// Vue.directive('imgError', {
//   // 当被绑定的元素插入到DOM中时
//   inserted: function (el, {value}) {
//     // 聚焦元素
//     el.onerror = function () {
//       el.src = value
//     }
//   },
// })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
