import {
  isValid,
  isFn,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isPlainObj,
  isArr,
} from './checkers'
import { ProxyRaw, MakeObservableSymbol } from './environment'
import { Annotation } from './types'

const RAW_TYPE = Symbol('RAW_TYPE')
const OBSERVABLE_TYPE = Symbol('OBSERVABLE_TYPE')

export const isObservable = (target: any) => {
  return ProxyRaw.has(target)
}

export const isAnnotation = (target: any): target is Annotation => {
  return target && !!target[MakeObservableSymbol]
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

export const markRaw = <T>(target: T): T => {
  if (!target) return
  if (isFn(target)) {
    target.prototype[RAW_TYPE] = true
  } else {
    target[RAW_TYPE] = true
  }
  return target
}

export const markObservable = <T>(target: T): T => {
  if (!target) return
  if (isFn(target)) {
    target.prototype[OBSERVABLE_TYPE] = true
  } else {
    target[OBSERVABLE_TYPE] = true
  }
  return target
}

export const raw = <T>(target: T): T => ProxyRaw.get(target as any)

export const toJS = <T>(values: T): T => {
  const visited = new WeakSet<any>()

  const tojs: typeof toJS = (values) => {
    if (visited.has(values)) {
      return values
    } else if (!isObservable(values)) {
      return values
    } else if (isArr(values)) {
      visited.add(values)
      const res: any = []
      values.forEach((item) => {
        res.push(tojs(item))
      })
      return res
    } else if (isPlainObj(values)) {
      if ('$$typeof' in values && '_owner' in values) {
        return values
      } else if (values['_isAMomentObject']) {
        return values
      } else if (values['_isJSONSchemaObject']) {
        return values
      } else if (isFn(values['toJS'])) {
        return values['toJS']()
      } else if (isFn(values['toJSON'])) {
        return values['toJSON']()
      } else {
        visited.add(values)
        const res: any = {}
        for (const key in values) {
          if (Object.hasOwnProperty.call(values, key)) {
            res[key] = tojs(values[key])
          }
        }
        return res
      }
    } else {
      return values
    }
  }

  return tojs(values)
}
