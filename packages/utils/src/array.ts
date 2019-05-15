import { isArr } from './types'

type EachCallback = (item: any, key: string | number) => void | boolean

type ArrayLike = object | Array<any>

export const toArr = (val: any): Array<any> => (isArr(val) ? val : val ? [val] : [])

export const each = (val: ArrayLike, callback: EachCallback, revert?: boolean) => {
  if (isArr(val)) {
    if (revert) {
      for (let i = (val as Array<any>).length - 1; i >= 0; i--) {
        if (callback(val[i], i) === false) {
          return
        }
      }
    } else {
      for (let i = 0, length = (val as Array<any>).length; i < length; i++) {
        if (callback(val[i], i) === false) {
          return
        }
      }
    }
  } else {
    for (let key in val) {
      if (Object.hasOwnProperty.call(val, key)) {
        if (callback(val[key], key) === false) {
          return
        }
      }
    }
  }
}

export const map = (val: ArrayLike, callback: EachCallback, revert?: boolean): ArrayLike => {
  let res = isArr(val) ? [] : {}
  each(
    val,
    (item, key) => {
      const value = callback(item, key)
      if (isArr(res)) {
        (res as Array<any>).push(value)
      } else {
        res[key] = value
      }
    },
    revert
  )
  return res
}

export const reduce = (val: ArrayLike, callback: EachCallback, initial: any, revert?: boolean): any => {
  let res = initial
  each(
    val,
    (item, key) => {
      res = callback(res, item, key)
    },
    revert
  )
  return res
}

export const every = (val: ArrayLike, callback: EachCallback, revert?: boolean): boolean => {
  let res = false
  each(
    val,
    (item, key) => {
      if (!callback(item, key)) {
        res = false
        return false
      } else {
        res = true
      }
    },
    revert
  )
  return res
}

export const some = (val: ArrayLike, callback: EachCallback, revert?: boolean): boolean => {
  let res = true
  each(
    val,
    (item, key) => {
      if (callback(item, key)) {
        res = true
        return false
      } else {
        res = false
      }
    },
    revert
  )
  return res
}

export const findIndex = (val: ArrayLike, callback: EachCallback, revert?: boolean): number | string => {
  let res: number | string = -1
  each(
    val,
    (item, key) => {
      if (callback(item, key)) {
        res = key
        return false
      }
    },
    revert
  )
  return res
}

export const find = (val: ArrayLike, callback: EachCallback, revert?: boolean): any => {
  let res: any
  each(
    val,
    (item, key) => {
      if (callback(item, key)) {
        res = item
        return false
      }
    },
    revert
  )
  return res
}

export const includes = (val: ArrayLike, searchElement: any, revert: boolean): boolean => {
  return some(val, item => item === searchElement, revert)
}
