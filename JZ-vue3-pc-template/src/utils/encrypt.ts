import CryptoJS from 'crypto-js'
const keySize = 128
/**
 * 加减密工具类
 * @param key
 * @returns
 */
const fillKey = (key: string) => {
  const filledKey = Buffer.alloc(keySize / 8)
  const keys = Buffer.from(key)
  if (keys.length < filledKey.length) {
    filledKey.map((b: any, i: number) => (filledKey[i] = keys[i]))
  }
  return filledKey
}

const cryptKey = CryptoJS.enc.Utf8.parse(fillKey('JeF8U9wHFOMfs2'))

const cryObj = {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7
}

// 加密方法
export const encrypt = (enValue: string): string => {
  if (enValue) {
    const srcs = CryptoJS.enc.Utf8.parse(enValue)
    const encrypted = CryptoJS.AES.encrypt(srcs, cryptKey, cryObj)
    return encrypted.toString()
  }
  return ''
}

// 解密方法
export const decrypt = (dnValue: string): string => {
  const decryptRes = CryptoJS.AES.decrypt(dnValue, cryptKey, cryObj)
  return decryptRes.toString(CryptoJS.enc.Utf8)
}

// sha1加密方法
export const sha1 = (enValue: string): string => {
  if (enValue) {
    const srcs = CryptoJS.enc.Utf8.parse(enValue)
    const encrypted = CryptoJS.SHA1(srcs)
    return encrypted.toString()
  }
  return ''
}
