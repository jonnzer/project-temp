import { dateFormat } from '@/assets/js/utils'
// 全局日志信息
global.log = require('electron-log')
// 写file日志
global.log.transports.file.level = true
// 写console日志
global.log.transports.console.level = process.env.NODE_ENV !== 'production'
// 日志名称,按日期打印
global.log.transports.file.fileName = `${dateFormat(
  'YYYY-mm-dd',
  new Date()
)}.log`
// 日志大小上限
global.log.transports.file.maxSize = 1048576
// 控制台颜色设置
// log.info('%cRed text. %cGreen text', 'color: red', 'color: green')
console.log = global.log.log
// 默认只打log日志
// Object.assign(console, global.log.functions)
