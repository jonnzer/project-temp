/**
 * http请求类
 */
import operate from '@/utils/operate'
export default class Request {
  http (param) {
    // 请求参数
    var url = param.url,
      method = param.method,
      token = operate.isToken() || '',
      header = {},
      isLogin = param.isLogin || false,
      type = param.type || 'json',
      data = param.data || {},
      hideLoading = param.hideLoading || false

    // token信息
    if (token) {
      header.Authorization = 'Bearer ' + token
    }
    //拼接完整请求地址（根据环境切换）
    var requestUrl = isLogin ? operate.loginApi() + url : operate.api() + url

    //请求方式:GET或POST(POST需配置
    // header: {'content-type' : "application/x-www-form-urlencoded"},)
    if (method) {
      method = method.toUpperCase() //小写改为大写
      if (method == 'POST') {
        if (type == 'form') {
          header = {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }
        data = JSON.stringify({
          header: {
            userId: operate.userId() || '',
            token: token
          },
          request: data
        })
      } else {
        header = {
          'content-type': 'application/json'
        }
      }
    }

    //加载loading
    if (!hideLoading) {
      uni.showLoading({
        title: '加载中...'
      })
    }

    // 返回promise
    return new Promise((resolve, reject) => {
      // 请求
      uni.request({
        url: requestUrl,
        data: { data: data },
        method: method,
        header: header,
        success: res => {
          // 判断 请求api 格式是否正确
          if (res.statusCode === 401) {
            uni.clearStorageSync()
            uni.navigateTo({ url: '/pages/login/login' })
            return
          } else if (res.statusCode && res.statusCode != 200) {
            uni.showToast({
              title: 'api错误' + res.errMsg,
              icon: 'none'
            })
            return
          }
          // 接口成功，但是逻辑错误
          if (!res.data.success) {
            uni.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
          // 将结果抛出
          resolve(res.data)
        },
        //请求失败
        fail: e => {
          uni.showToast({
            title: '' + e.data.msg,
            icon: 'none'
          })
          reject(e.data)
        },
        //请求完成
        complete () {
          //隐藏加载
          if (!hideLoading) {
            uni.hideLoading()
          }
          resolve()
          return
        }
      })
    })
  }
}
