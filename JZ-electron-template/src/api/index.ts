import api from '../utils/http'

/**
 * 查询当前教师班级列表
 * @param params
 * @returns
 */
const classesListApi = (params = {}) => {
  return api.get('/ai/basedata/teacherclass', params)
}
