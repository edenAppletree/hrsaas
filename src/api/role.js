import request from '@/utils/request'

export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params,
  })
}

export function AddRoleApi(addRoleForm) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data: {
      ...addRoleForm,
    },
  })
}

export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put',
  })
}

// 根据id获取角色详情
export function getRolesInfo(id) {
  return request({
    url: '/sys/role/' + id,
  })
}

// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data,
  })
}
