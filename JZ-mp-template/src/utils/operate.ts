/**
 * 环境变量
 * token信息
 */
export default {
  //接口域名
  api: () => {
    let { envVersion } = wx.getAccountInfoSync().miniProgram
    switch (envVersion) {
      case 'develop': //开发预览版
        return 'http://192.168.3.96:8100'
        break
      case 'trial': //体验版
        return 'http://192.168.3.96:8100'
        break
      case 'release': //正式版
        return 'http://192.168.3.96:8100'
        break
      default:
        //未知,默认调用正式版
        return 'http://192.168.3.96:8100'
        break
    }
  },
  // 登录api
  loginApi: () => {
    let { envVersion } = wx.getAccountInfoSync().miniProgram
    switch (envVersion) {
      case 'develop': //开发预览版
        return 'http://192.168.3.96:8001'
        break
      case 'trial': //体验版
        return 'http://192.168.3.96:8001'
        break
      case 'release': //正式版
        return 'http://192.168.3.96:8001'
        break
      default:
        //未知,默认调用正式版
        return 'http://192.168.3.96:8001'
        break
    }
  },
  // token
  isToken: () => {
    return uni.getStorageSync('token')
  },
  userId: () => {
    return uni.getStorageSync('userId')
  }
}
