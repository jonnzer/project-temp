import { isDef, isObject } from './validate'

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => val != null && hasOwnProperty.call(val, key)

/**
 * 判断是否存在对象直接属性或者继承的属性，和hasOwn类似
 * { 'a': { 'b': 2 }}
 * hasIn(object, 'a'), hasIn(object, 'a.b') true
 * @param object 对象
 * @param key 对象的key
 */
export const hasIn = (object, key: string) => {
  return object != null && key in Object(object)
}

export const toNumber = (val: any): any => {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 * 删除数组内元素
 * @param arr 数组对象
 * @param el 数组内元素，元素可以是number、string，非object
 */
export const remove = <T>(arr: T[], el: T) => {
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
}

/**
 * 函数节流（throttle）
 * 函数预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期
 * 常见使用：拖拽功能实现
 * **/
export const throttle = (fn: Function, duration: number) => {
  let begin = new Date().getTime()
  return function () {
    // @ts-ignore
    const _this = this
    const args = arguments
    const current = new Date().getTime()
    if (current - begin >= duration) {
      fn.apply(_this, args)
      begin = current
    }
  }
}

/**
 * 函数防抖（debounce）
 * 对于连续的事件响应我们只需要执行一次回调
 * 常见使用：搜索输入,只需用户最后一次输入完，再发送请求
 * **/
export const debounce = (fn: Function, delay: number) => {
  let timer: unknown = null
  return function () {
    // @ts-ignore
    const _this = this // 取debounce执行作用域的this
    const args = arguments
    if (timer) {
      clearTimeout(timer as number)
    }
    timer = setTimeout(() => {
      fn.apply(_this, args) // 用apply指向调用debounce的对象
    }, delay)
  }
}

/**
* 格式化文件大小, 保留了两位小数
*/
export const formatSize = (value: any) => {
  if (value === null || value === '') {
    return '0'
  }
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let index = 0
  const srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  let size = srcsize / Math.pow(1024, index)
  //  保留的小数位数
  return size.toFixed(2) + unitArr[index]
}

/**
 * 数字或字符串补0
 * @param num 数字或字符串
 * @param targetLength 长度
 */
export const padZero = (num: number | string, targetLength = 2): string => {
  let str = num + ''
  while (str.length < targetLength) {
    str = '0' + str
  }
  return str
}

/**
 * 前端获取UUID，用于文件上传生成随机文件名等
 */
export const getUuid = () => {
  const s: Array<string> = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((parseInt(s[19]) & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

/*
 * 下载(避免浏览器拦截)，打开新窗口
 * 兼容带参数的下载
 * */
export const downLoadFile = (url: string, name: string) => {
  const f = document.createElement('form')
  document.body.appendChild(f)
  const urlArr = url.split('?')
  const quaryStr = urlArr.length > 0 ? urlArr[1] : ''
  const arr1 = quaryStr ? quaryStr.split('&') : ''
  if (arr1.length > 0) {
    for (let i = 0; i < arr1.length; i++) {
      const key = arr1[i].split('=')[0]
      const value = arr1[i].split('=')[1]
      const vi = document.createElement('input')
      vi.type = 'hidden'
      f.appendChild(vi)
      vi.value = decodeURIComponent(value)
      vi.name = key
    }
  }
  const input = document.createElement('input')
  input.type = 'hidden'
  f.appendChild(input)
  input.value = name || '5'
  input.name = 'file'

  f.target = '_blank'
  f.action = url // 下载的url 地址
  f.submit()
}

/*
 * 下载(避免浏览器拦截)，不打开新窗口下载，上下两种方式都用
 * 兼容带参数的下载
 * */
export const downLoadFileFrame = (url: string, name: string) => {
  // swf的文件需要特殊处理
  if (url.includes('swf')) {
    downLoadFile(url, name)
    return
  }
  const iframe = document.createElement('iframe') as HTMLIFrameElement
  iframe.src = url
  iframe.style.display = 'none'
  iframe.onload = () => {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

/**
 * 输入安全过滤
 * @param s 需要过滤的输入字符串
 */
export const filterInput = (s: string) => {
  if (!s) return s
  return /<script.*?>.*?<\/script>/ig.test(s.toString())? s.toString().replace(/<script.*?>.*?<\/script>/ig, '') : s
}

type ObjectIndex = Record<string, any>

function assignKey(to: ObjectIndex, from: ObjectIndex, key: string) {
  const val = from[key]
  if (!isDef(val)) {
    return
  }
  if (!hasOwnProperty.call(to, key) || !isObject(val)) {
    to[key] = val
  } else {
    // eslint-disable-next-line no-use-before-define
    to[key] = deepAssign(Object(to[key]), from[key])
  }
}

export const deepAssign = (to: ObjectIndex, from: ObjectIndex): ObjectIndex => {
  Object.keys(from).forEach((key) => {
    assignKey(to, from, key)
  })
  return to
}

export const deepClone = (obj: Record<string, any>): Record<string, any> => {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item))
  }
  if (typeof obj === 'object') {
    return deepAssign({}, obj)
  }
  return obj
}

