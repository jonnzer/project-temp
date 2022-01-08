import { REM_UNIT } from './constant'
const fs = window.require('fs')
const Store = window.require('electron-store')
const store = new Store()
const imgReg = /\w(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/i

// 本地图片资源转base64格式
export function localImg (localImg: string): any {
  if (!imgReg.test(localImg)) {
    throw new Error('resource type error,must be gif,jpeg,png,jpg,bmp')
  }
  const data = fs.readFileSync(localImg)
  return 'data:image/jpeg;base64,' + data.toString('base64')
}

// 本地mp3资源转成stream流 支持播放
export function localMp3 (localMp3: string): any {
  return new Promise(resolve => {
    fs.readFile(localMp3, (err: any, data: any) => {
      if (err) throw err
      const uint8Buffer = Uint8Array.from(data)
      const blob = new Blob([uint8Buffer])
      const url = window.URL.createObjectURL(blob)
      resolve(url)
    })
  })
}
/**
 * 本地node服务器地址
 * @returns
 */
export function getLocalPath (): void {
  const serverUrl = store.get('localServer')
  console.log(serverUrl)
  return serverUrl || 'http://localhost:9000'
}
/**
 * px转rem方法
 * @param pxVal 转换的px值
 * @returns 返回xxxpx
 */
export function px2rem (pxVal: number, isUnit = true): string | number {
  const flexible = (window as any).lib.flexible
  const currWidth = (flexible.rem / REM_UNIT) * pxVal
  const pxWidth = isUnit ? currWidth + 'px' : currWidth
  // console.log('pxVal :>> ', pxVal, flexible.rem)
  return pxWidth
}

// deep
export const deepCopy = (p: any, c: any) => {
  // p: 源数据，c:目标数据
  // eslint-disable-next-line no-var
  var c = c || {}
  for (const i in p) {
    if (typeof p[i] === 'object' && p[i] !== null) {
      c[i] = p[i].constructor === Array ? [] : {}
      deepCopy(p[i], c[i])
    } else {
      c[i] = p[i]
    }
  }
  return c
}

// uuid
export function getUuid (): string {
  const s: any = []
  const hexDigits = '0123456789abcdef'

  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }

  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010

  s[19] = hexDigits.substr((parseInt(s[19]) & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01

  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

/** html模板字符 转HTMLElement */
export function renderToDom (template: string): HTMLElement {
  const div = document.createElement('div')
  div.innerHTML = template

  return div
}

/**
 * 转换内存大小单位
 * 大于1MB 显示 MB  ，小于1MB显示  KB    换算 保留小数点后2位
 */
export function transformByte (byteNum: number): string {
  const KB_SIZE = 1024
  const MB_SIZE = 1024 * 1024
  if (byteNum > MB_SIZE) {
    return ((byteNum * 1000) / MB_SIZE / 1000).toFixed(2) + 'MB'
  } else {
    return ((byteNum * 1000) / KB_SIZE / 1000).toFixed(2) + 'KB'
  }
}
