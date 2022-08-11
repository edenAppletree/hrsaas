import request from '@/utils/request'

// 根据id查询公司信息
export function getCompanyInfoApi(id) {
  return request({
    url: `/company/${id}`,
  })
}
