import request from '@/utils/request'

// 获取部门信息
export function getDeptsApi() {
  return request({
    url: '/company/department',
  })
}

// 删除部门
export function delDeptsApi(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE',
  })
}

// 新增部门
export function addDeptApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
