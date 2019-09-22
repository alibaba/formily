import { isFn } from '@uform/types'
import { globalThisPolyfill } from './globalThis'

type Filter = (value: any, key: string) => boolean

const NATIVE_KEYS = [
  ['Map', (map: any) => new Map(map)],
  ['WeakMap', (map: any) => new WeakMap(map)],
  ['WeakSet', (set: any) => new WeakSet(set)],
  ['Set', (set: any) => new Set(set)],
  ['Date', (date: any) => new Date(date)],
  'FileList',
  'File',
  'URL',
  'RegExp',
  [
    'Promise',
    (promise: Promise<any>) =>
      new Promise((resolve, reject) => promise.then(resolve, reject))
  ]
]

const isNativeObject = (values: any): any => {
  for (let i = 0; i < NATIVE_KEYS.length; i++) {
    const item = NATIVE_KEYS[i]
    if (Array.isArray(item) && item[0]) {
      if (
        globalThisPolyfill[item[0] as string] &&
        values instanceof globalThisPolyfill[item[0] as string]
      ) {
        return item[1] ? item[1] : item[0]
      }
    } else {
      if (
        globalThisPolyfill[item as string] &&
        values instanceof globalThisPolyfill[item as string]
      ) {
        return item
      }
    }
  }
}

export const clone = (values: any, filter?: Filter) => {
  let nativeClone: (values: any) => any
  if (Array.isArray(values)) {
    return values.map(item => clone(item, filter))
  } else if (isNativeObject(values)) {
    nativeClone = isNativeObject(values)
    return isFn(nativeClone) ? nativeClone(values) : values
  } else if (typeof values === 'object' && !!values) {
    if ('$$typeof' in values && '_owner' in values) {
      return values
    }
    if (values._isAMomentObject) {
      return values
    }
    if (Object.getOwnPropertySymbols(values || {}).length) {
      return values
    }
    const res = {}
    for (const key in values) {
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
