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
    data,
  })
}

// 获取编辑部门详情
export function getDeptByIdApi(id) {
  return request({
    url: '/company/department/' + id,
  })
}

// 根据id修改部门详情
export const EditDeptsApi = (data) => {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data,
  })
}
