/*eslint-disable */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.rem = {})))
})(this, function (exports) {
  'use strict'
  /**
   * 时间、日期格式化
   * @param {string} fmt 时间格式，示例 'YY-mm-dd HH:MM:SS'
   * @param {Date} date 日期对象
   */
  var dateFormat = function dateFormat (fmt, date) {
    var opt = {
      'Y+': date.getFullYear().toString(),
      // 年
      'm+': (date.getMonth() + 1).toString(),
      // 月
      'd+': date.getDate().toString(),
      // 日
      'H+': date.getHours().toString(),
      // 时
      'M+': date.getMinutes().toString(),
      // 分
      'S+': date.getSeconds().toString() // 秒
    }
    var ret

    for (var k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt)

      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        )
      }
    }

    return fmt
  }
  /**
   * 获取星期
   * @param {Date} date 日期对象
   * @returns 星期
   */
  var dateWeek = function getWeekDate (date) {
    var day = date.getDay()
    var weeks = new Array(
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    )
    return weeks[day]
  }
  /**
   * 时间、日期格式化，修复iOS日期转换上的bug, 处理带T的时间格式
   * @param {string} fmt 时间格式，示例 'YY-mm-dd HH:MM:SS'
   * @param {string} date 日期字符串
   */

  var dateStringFormat = function dateStringFormat (fmt, dateString) {
    if (!dateString) return ''

    if (dateString.includes('T')) {
      dateString = new Date(dateString)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '')
    }

    return dateFormat(fmt, new Date(dateString.replace(/\-/g, '/')))
  }
  /**
   * 时间、日期格式化
   * @param {string} fmt 时间格式，示例 'YY-mm-dd HH:MM:SS'
   * @param {number} timestamp 时间戳
   */

  var timestampFormat = function timestampFormat (fmt, timestamp) {
    return dateFormat(fmt, new Date(timestamp * 1000))
  }

  function _typeof (obj) {
    '@babel/helpers - typeof'

    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
      _typeof = function (obj) {
        return typeof obj
      }
    } else {
      _typeof = function (obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj
      }
    }

    return _typeof(obj)
  }

  var objectToString = Object.prototype.toString
  var toTypeString = function toTypeString (value) {
    return objectToString.call(value)
  }
  var inBrowser = typeof window !== 'undefined'
  var ua = inBrowser ? navigator.userAgent : ''
  var isSafari = ua.indexOf('Safari') != -1 && ua.indexOf('Version') != -1
  var isIphone = ua.indexOf('iPhone') != -1 && ua.indexOf('Version') != -1
  var isIPad = isSafari && !isIphone && 'ontouchend' in document
  var isiOS = isIphone || isIPad
  var isPC =
    !/iphone|ios|ipad|android|mobile/i.test(ua.toLowerCase()) && !isIPad
  var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
  var isWx = ua.toLowerCase().indexOf('micromessenger') !== -1
  var rules = {
    digits: /^\d+$/,
    // 纯数字
    letters: /^[a-z]+$/i,
    // 纯字母
    date: /(^(19|20)\d{2}-(10|12|0[13578])-(3[01]|[12][0-9]|0[1-9])$)|(^(19|20)\d{2}-(11|0[469])-(30|[12][0-9]|0[1-9])$)|(^(19|20)\d{2}-(02)-(2[0-8]|1[0-9]|0[1-9])$)|(^(((19|20)(0[48]|[2468][048]|[13579][26]))|2000)-02-29$)/,
    // 请填写有效的日期，格式:yyyy-mm-dd
    time: /^([01]\d|2[0-3])(:[0-5]\d){1,2}$/,
    // 请填写有效的时间，00:00到23:59之间
    email: /^[\w \\+ \\-]+(\.[\w\\+\\-]+)*@[a-z\d\\-]+(\.[a-z\d\\-]+)*\.([a-z]{2,4})$/i,
    // 请填写有效的邮箱
    url: /^(https?|s?ftp):\/\/\S+$/i,
    // 请填写有效的网址
    qq: /^[1-9]\d{4,}$/,
    // 请填写有效的QQ号
    IDcard: /^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/,
    // 请填写正确的身份证号码
    // eslint-disable-next-line no-useless-escape
    tel: /^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/,
    // 办公或家庭电话,请填写有效的电话号码
    mobile: /^(1[3456789]\d{9})$/,
    // 移动电话
    zipstatus: /^\d{6}$/,
    // 请检查邮政编码格式
    chinese: /^[\u0391-\uFFE5]+$/,
    // 请填写中文字符
    username: /^\w{3,12}$/,
    // 请填写3-12位数字、字母、下划线, 用户名
    password: /^[\S]{6,16}$/,
    // 请填写6-16位字符，不能包含空格, 密码
    strongPwd: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
    // 请填写8-16位字符，必须包含数字，字母
    code: /^[\S]{6,10}$/,
    // 请填写6-10验证码
    code4: /^[\S]{4,10}$/ // 请填写4-10验证码
  }
  /**
   * 判断是否存在对象直接属性或者继承的属性，和hasOwn类似
   * { 'a': { 'b': 2 }}
   * hasIn(object, 'a'), hasIn(object, 'a.b') true
   * @param object 对象
   * @param key 对象的key
   */

  var hasIn = function hasIn (object, key) {
    return object != null && key in Object(object)
  }
  var toNumber = function toNumber (val) {
    var n = parseFloat(val)
    return isNaN(n) ? val : n
  }
  /**
   * 删除数组内元素
   * @param arr 数组对象
   * @param el 数组内元素，元素可以是number、string，非object
   */

  var remove = function remove (arr, el) {
    var i = arr.indexOf(el)

    if (i > -1) {
      arr.splice(i, 1)
    }
  }
  /**
   * 函数节流（throttle）
   * 函数预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期
   * 常见使用：拖拽功能实现
   * **/

  var throttle = function throttle (fn, duration) {
    var begin = new Date().getTime()
    return function () {
      // @ts-ignore
      var _this = this

      var args = arguments
      var current = new Date().getTime()

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

  var debounce = function debounce (fn, delay) {
    var timer = null
    return function () {
      // @ts-ignore
      var _this = this // 取debounce执行作用域的this

      var args = arguments

      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(function () {
        fn.apply(_this, args) // 用apply指向调用debounce的对象
      }, delay)
    }
  }
  /**
   * 格式化文件大小, 保留了两位小数
   */

  var formatSize = function formatSize (value) {
    if (value === null || value === '') {
      return '0'
    }

    var unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    var index = 0
    var srcsize = parseFloat(value)
    index = Math.floor(Math.log(srcsize) / Math.log(1024))
    var size = srcsize / Math.pow(1024, index) //  保留的小数位数

    return size.toFixed(2) + unitArr[index]
  }
  /**
   * 数字或字符串补0
   * @param num 数字或字符串
   * @param targetLength 长度
   */

  var padZero = function padZero (num) {
    var targetLength =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2
    var str = num + ''

    while (str.length < targetLength) {
      str = '0' + str
    }

    return str
  }
  /**
   * 前端获取UUID，用于文件上传生成随机文件名等
   */

  var getUuid = function getUuid () {
    var s = []
    var hexDigits = '0123456789abcdef'

    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }

    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010

    s[19] = hexDigits.substr((parseInt(s[19]) & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01

    s[8] = s[13] = s[18] = s[23] = '-'
    return s.join('')
  }
  /**
   * 输入安全过滤
   * @param s 需要过滤的输入字符串
   */

  var filterInput = function filterInput (s) {
    if (!s) return s
    return /<script.*?>.*?<\/script>/gi.test(s.toString())
      ? s.toString().replace(/<script.*?>.*?<\/script>/gi, '')
      : s
  }

  function assignKey (to, from, key) {
    var val = from[key]

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

  var deepAssign = function deepAssign (to, from) {
    Object.keys(from).forEach(function (key) {
      assignKey(to, from, key)
    })
    return to
  }
  var deepClone = function deepClone (obj) {
    if (Array.isArray(obj)) {
      return obj.map(function (item) {
        return deepClone(item)
      })
    }

    if (_typeof(obj) === 'object') {
      return deepAssign({}, obj)
    }

    return obj
  }

  // 生成一个随机范围内的整数
  var randomNum = function randomNum (Min, Max) {
    var Range = Max - Min
    var Rand = Math.random()
    var num = Min + Math.round(Rand * Range)
    return num
  }

  var version = '1.0.1'
  // console.log(version);
  exports.dateFormat = dateFormat
  exports.dateWeek = dateWeek
  exports.dateStringFormat = dateStringFormat
  exports.debounce = debounce
  exports.deepAssign = deepAssign
  exports.deepClone = deepClone
  exports.filterInput = filterInput
  exports.formatSize = formatSize
  exports.getUuid = getUuid
  exports.hasIn = hasIn
  exports.inBrowser = inBrowser
  exports.isAndroid = isAndroid
  exports.isIPad = isIPad
  exports.isIphone = isIphone
  exports.isPC = isPC
  exports.isSafari = isSafari
  exports.isWx = isWx
  exports.isiOS = isiOS
  exports.objectToString = objectToString
  exports.padZero = padZero
  exports.remove = remove
  exports.rules = rules
  exports.throttle = throttle
  exports.timestampFormat = timestampFormat
  exports.toNumber = toNumber
  exports.toTypeString = toTypeString
  exports.randomNum = randomNum

  Object.defineProperty(exports, '__esModule', { value: true })
})
