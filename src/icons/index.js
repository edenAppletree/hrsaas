import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 注册全局组件svg-icon
Vue.component('svg-icon', SvgIcon)

// 一次性引入所有的svg文件中的svg
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
