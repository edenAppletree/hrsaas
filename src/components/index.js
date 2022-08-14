import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'

// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools)
//   },
// }

// 优化
const components = [PageTools, UploadExcel]

export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
