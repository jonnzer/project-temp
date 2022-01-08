import { inBrowser, isDef, isNumeric } from "./validate"

export const addUnit = (value?: string | number): string | undefined => {
  if (!isDef(value)) {
    return undefined
  }
  return isNumeric(value) ? `${value}px` : String(value)
}

export const getSizeStyle = (originSize?: string | number) => {
  if (isDef(originSize)) {
    const size = addUnit(originSize)
    return {
      width: size,
      height: size,
    }
  }
}

// cache
let rootFontSize: number

function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement
    const fontSize =
      doc.style.fontSize || window.getComputedStyle(doc).fontSize

    rootFontSize = parseFloat(fontSize)
  }

  return rootFontSize
}

function convertRem(value: string) {
  value = value.replace(/rem/g, '')
  return +value * getRootFontSize()
}

function convertVw(value: string) {
  value = value.replace(/vw/g, '')
  return (+value * window.innerWidth) / 100
}

function convertVh(value: string) {
  value = value.replace(/vh/g, '')
  return (+value * window.innerHeight) / 100
}

/**
 * 计算转换适配的单位to px
 * @param value rem/vw/vh
 */
export const unitToPx = (value: string | number): number => {
  if (typeof value === 'number') {
    return value
  }

  if (inBrowser) {
    if (value.indexOf('rem') !== -1) {
      return convertRem(value)
    }
    if (value.indexOf('vw') !== -1) {
      return convertVw(value)
    }
    if (value.indexOf('vh') !== -1) {
      return convertVh(value)
    }
  }

  return parseFloat(value)
}
