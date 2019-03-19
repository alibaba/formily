import { isFn } from './types'

const self = this || global || window

const NATIVE_KEYS = [
  ['Map', map => new Map(map)],
  ['WeakMap', map => new WeakMap(map)],
  ['WeakSet', set => new WeakSet(set)],
  ['Set', set => new Set(set)],
  'FileList',
  'File',
  'URL',
  'RegExp',
  [
    'Promise',
    promise => new Promise((resolve, reject) => promise.then(resolve, reject))
  ]
]

const isNativeObject = values => {
  for (let i = 0; i < NATIVE_KEYS.length; i++) {
    let item = NATIVE_KEYS[i]
    if (Array.isArray(item) && item[0]) {
      if (self[item[0]] && values instanceof self[item[0]]) {
        return item[1] ? item[1] : item[0]
      }
    } else {
      if (self[item] && values instanceof self[item]) {
        return item
      }
    }
  }
}

export const clone = (values, filter) => {
  let _nativeClone
  if (Array.isArray(values)) {
    return values.map(item => clone(item, filter))
  } else if ((_nativeClone = isNativeObject(values))) {
    return isFn(_nativeClone) ? _nativeClone(values) : values
  } else if (typeof values === 'object' && !!values) {
    if ('$$typeof' in values && '_owner' in values) {
      return values
    }
    let res = {}
    for (let key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        if (isFn(filter)) {
          if (filter(values[key], key)) {
            res[key] = clone(values[key], filter)
          } else {
            res[key] = values[key]
          }
        } else {
          res[key] = clone(values[key], filter)
        }
      }
    }
    return res
  } else {
    return values
  }
}
