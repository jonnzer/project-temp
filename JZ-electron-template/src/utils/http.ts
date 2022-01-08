import axios from 'axios'

const API_BASE_URL: string = process.env.VUE_APP_APP || '' // AI金课宝

function createInstance (BASE_URL: string) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache'
    }
  })

  instance.interceptors.request.use(
    config => {
      /**
       * 具体配置 依据项目编写内容
       */
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )

  instance.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      console.log('error=====', error)
      return error
    }
  )

  return instance
}

const httpConfig = createInstance(API_BASE_URL)

console.log(API_BASE_URL, '服务地址为---------')

/**
 * 过滤XSS攻击脚本
 * @param s 参数
 */
function stripScript (s) {
  return /<script.*?>.*?<\/script>/gi.test(s.toString())
    ? s.toString().replace(/<script.*?>.*?<\/script>/gi, '')
    : s
}

const filterEmptyParams = params => {
  for (const i in params) {
    if (
      (params as any)[i] === '' ||
      (params as any)[i] === null ||
      (params as any)[i] === undefined
    ) {
      delete (params as any)[i]
    } else {
      (params as any)[i] = stripScript((params as any)[i])
    }
  }
}

export default {
  get: function (url, params) {
    filterEmptyParams(params)
    return httpConfig({
      url: url,
      method: 'get',
      params
    })
  },
  post: function (url, data, params?) {
    return httpConfig({
      url: url,
      method: 'post',
      data,
      ...params
    })
  }
}
