/**
* 时间、日期格式化
* @param {string} fmt 时间格式，示例 'YY-mm-dd HH:MM:SS'
* @param {Date} date 日期对象
*/
export const dateFormat = (fmt: string, date: Date) => {
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
  }
  let ret
  for (const k in opt) {
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
* 时间、日期格式化，修复iOS日期转换上的bug, 处理带T的时间格式
* @param {string} fmt 时间格式，示例 'YY-mm-dd HH:MM:SS'
* @param {string} date 日期字符串
*/
export const dateStringFormat = (fmt: string, dateString: string) => {
  if (!dateString) return ''
  if (dateString.includes('T')) {
    dateString = new Date(dateString).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  }
  return dateFormat(fmt, new Date(dateString.replace(/\-/g, '/')))
}

/**
* 时间、日期格式化
* @param {string} fmt 时间格式，示例 'YY-mm-dd HH:MM:SS'
* @param {number} timestamp 时间戳
*/
export const timestampFormat = (fmt: string, timestamp: number) => {
  return dateFormat(fmt, new Date(timestamp * 1000))
}