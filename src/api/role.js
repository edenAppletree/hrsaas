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
