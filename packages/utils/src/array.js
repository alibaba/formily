import { isArr } from './types'

export const toArr = val => (isArr(val) ? val : val ? [val] : [])

export const each = (val, callback, revert) => {
  if (isArr(val)) {
    if (revert) {
      for (let i = val.length - 1; i >= 0; i--) {
        if (callback(val[i], i) === false) {
          return
        }
      }
    } else {
      for (let i = 0, length = val.length; i < length; i++) {
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

export const map = (val, callback, revert) => {
  let res = isArr(val) ? [] : {}
  each(
    val,
    (item, key) => {
      const value = callback(item, key)
      if (isArr(res)) {
        res.push(value)
      } else {
        res[key] = value
      }
    },
    revert
  )
  return res
}

export const reduce = (val, callback, initial, revert) => {
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

export const every = (val, callback, revert) => {
  let res = true
  each(
    val,
    (item, key) => {
      if (!callback(item, key)) {
        res = false
        return false
      }
    },
    revert
  )
  return res
}

export const some = (val, callback, revert) => {
  let res = false
  each(
    val,
    (item, key) => {
      if (callback(item, key)) {
        res = true
        return false
      }
    },
    revert
  )
  return res
}

export const findIndex = (val, callback, revert) => {
  let res = -1
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

export const find = (val, callback, revert) => {
  let res
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

export const includes = (val, searchElement, revert) => {
  return some(val, item => item === searchElement, revert)
}
