import viteApi from '../utils/request'

/**
 * 获取科目列表
 * @param params
 * @returns
 */
const getCourseList = (params = {}) => {
  return viteApi(
    {
      url: '/api/basic/courselist',
      method: 'get',
      data: params
    },
    { loading: true }
  )
}

export { getCourseList }
