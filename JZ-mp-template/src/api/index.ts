import Request from '@/utils/requset'
let request = new Request().http

// 登录
export const userLogin = (params = {}) => {
  return request({
    url: '/user/login',
    method: 'POST',
    isLogin: true,
    data: params
  })
}

// 获取用户信息
export const getUserInfo = data => {
  return request({
    url: '/user/info',
    method: 'POST',
    isLogin: true,
    data: data
  })
}
