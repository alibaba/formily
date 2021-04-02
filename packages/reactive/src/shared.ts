import {
  isValid,
  clone,
  isFn,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isPlainObj,
  isArr,
} from '@formily/shared'
import { ProxyRaw, MakeObservableSymbol } from './environment'
import { Annotation } from './types'
import { untrackStart, untrackEnd } from './reaction'

const RAW_TYPE = Symbol('RAW_TYPE')
const OBSERVABLE_TYPE = Symbol('OBSERVABLE_TYPE')

export const isObservable = (target: any) => {
  return ProxyRaw.has(target)
}

export const isAnnotation = (target: any): target is Annotation => {
  return !!target[MakeObservableSymbol]
}

export const isSupportObservable = (target: any) => {
  if (isObservable(target)) return false
  if (!isValid(target)) return false
  if (isArr(target)) return true
  if (isPlainObj(target)) {
    if (target[RAW_TYPE]) {
      return false
    }
    if (target[OBSERVABLE_TYPE]) {
      return true
    }
    if ('$$typeof' in target && '_owner' in target) {
      return false
    }
    if (target['_isAMomentObject']) {
      return false
    }
    if (target['_isJSONSchemaObject']) {
      return false
    }
    if (isFn(target['toJS'])) {
      return false
    }
    if (isFn(target['toJSON'])) {
      return false
    }
    return true
  }
  if (isMap(target) || isWeakMap(target) || isSet(target) || isWeakSet(target))
    return true
  return false
}

export const isCollectionType = (target: any) => {
  return (
    isMap(target) || isWeakMap(target) || isSet(target) || isWeakSet(target)
  )
}

export const markRaw = (target: object) => {
  if (!target) return
  if (isFn(target)) {
    target.prototype[RAW_TYPE] = true
  } else {
    target[RAW_TYPE] = true
  }
  return target
}

export const markObservable = (target: object) => {
  if (!target) return
  if (isFn(target)) {
    target.prototype[OBSERVABLE_TYPE] = true
  } else {
    target[OBSERVABLE_TYPE] = true
  }
  return target
}

export const raw = (target: object) => ProxyRaw.get(target)

export const toJS = (target: object) => clone(target)

export const untracked = <T extends () => any>(
  untracker?: T
): ReturnType<T> => {
  untrackStart()
  let res: any
  try {
    if (isFn(untracker)) {
      res = untracker()
    }
  } finally {
    untrackEnd()
    return res
  }
}
