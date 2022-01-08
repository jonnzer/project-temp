export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string =>
  objectToString.call(value)
export const isArray = Array.isArray

export const isNumeric = (val: string | number): val is string => {
  return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)
}

export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === '[object Map]'
export const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === '[object Set]'

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const isDef = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null
}

export const isDate = (val: unknown): val is Date => val instanceof Date
export const isEmail = (value: string): boolean => {
  const reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
  return reg.test(value)
}

export const isMobile = (value: string): boolean =>{
  value = value.replace(/[^-|\d]/g, '')
  return (
    /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
  )
}

export const isNaN = (val: number): val is typeof NaN => {
  if (Number.isNaN) {
    return Number.isNaN(val)
  }
  // eslint-disable-next-line no-self-compare
  return val !== val
}

export const inBrowser = typeof window !== 'undefined'

const ua = inBrowser? navigator.userAgent : ''
export const isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1
export const isIphone = ua.indexOf("iPhone") != -1 && ua.indexOf("Version") != -1
export const isIPad = isSafari && !isIphone && 'ontouchend' in document
export const isiOS = isIphone || isIPad
export const isPC = !/iphone|ios|ipad|android|mobile/i.test(ua.toLowerCase()) && !isIPad
export const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
export const isWx = ua.toLowerCase().indexOf('micromessenger') !== -1

export const rules = {
  digits: /^\d+$/, // 纯数字
  letters: /^[a-z]+$/i, // 纯字母
  date: /(^(19|20)\d{2}-(10|12|0[13578])-(3[01]|[12][0-9]|0[1-9])$)|(^(19|20)\d{2}-(11|0[469])-(30|[12][0-9]|0[1-9])$)|(^(19|20)\d{2}-(02)-(2[0-8]|1[0-9]|0[1-9])$)|(^(((19|20)(0[48]|[2468][048]|[13579][26]))|2000)-02-29$)/, // 请填写有效的日期，格式:yyyy-mm-dd
  time: /^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, // 请填写有效的时间，00:00到23:59之间
  email: /^[\w \\+ \\-]+(\.[\w\\+\\-]+)*@[a-z\d\\-]+(\.[a-z\d\\-]+)*\.([a-z]{2,4})$/i, // 请填写有效的邮箱
  url: /^(https?|s?ftp):\/\/\S+$/i, // 请填写有效的网址
  qq: /^[1-9]\d{4,}$/, // 请填写有效的QQ号
  IDcard: /^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, // 请填写正确的身份证号码
  // eslint-disable-next-line no-useless-escape
  tel: /^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/, // 办公或家庭电话,请填写有效的电话号码
  mobile: /^(1[3456789]\d{9})$/, // 移动电话
  zipstatus: /^\d{6}$/, // 请检查邮政编码格式
  chinese: /^[\u0391-\uFFE5]+$/, // 请填写中文字符
  username: /^\w{3,12}$/, // 请填写3-12位数字、字母、下划线, 用户名
  password: /^[\S]{8,16}$/, // 请填写6-16位字符，不能包含空格, 密码
  strongPwd: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/, // 请填写8-16位字符，必须包含数字，字母
  code: /^[\S]{6,10}$/, // 请填写6-10验证码
  code4: /^[\S]{4,10}$/, // 请填写4-10验证码
}
