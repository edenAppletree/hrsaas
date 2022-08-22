import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  meta: {
    id: 'import', //用来和后端权限做约定
  },
  hidden: true,
  children: [
    {
      path: '',
      component: () => import('@/views/import'),
      meta: {title: '员工', icon: 'people'},
    },
  ],
}
