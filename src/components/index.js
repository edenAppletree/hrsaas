import PageTools from '@/components/PageTools'

// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools)
//   },
// }

// 优化
const components = [PageTools]

export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
