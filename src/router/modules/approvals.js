import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  meta: {
    id:'approvals'//用来和后端权限做约定,如果后端给的对应的权限名字发生了变化，只需要改meta里面的id，改成对应的名字就行
  },
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
