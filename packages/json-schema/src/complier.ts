import { isArr, isFn, isPlainObj, isStr, reduce } from '@formily/shared'
import { isObservable } from 'mobx'
import { Schema } from './schema'

const ExpRE = /^\s*\{\{(.*)\}\}\s*$/
const actionsSymbol = Symbol.for('__REVA_ACTIONS')
const ENVS = {
  complie(expression: string, scope: any) {
    const vars = Object.keys(scope || {})
    const params = vars.map((key) => scope[key])
    return new Function(...vars, `return (${expression});`)(...params)
  },
}

export const registerComplier = (
  complier: (expression: string, scope: any) => any
) => {
  if (isFn(complier)) {
    ENVS.complie = complier
  }
}

export const shallowComplie = <Source = any, Scope = any>(
  source: Source,
  scope?: Scope
) => {
  if (isStr(source)) {
    const matched = source.match(ExpRE)
    if (!matched) return source
    return ENVS.complie(matched[1], scope)
  } else if (isArr(source)) {
    return source.map((item) => shallowComplie(item, scope))
  }
  return source
}

export const complie = <Source = any, Scope = any>(
  source: Source,
  scope?: Scope
): any => {
  const seenObjects = new WeakMap()
  const complie = (source: any) => {
    if (isStr(source)) {
      return shallowComplie(source, scope)
    } else if (isArr(source)) {
      return source.map((value: any) => complie(value))
    } else if (isPlainObj(source)) {
      if ('$$typeof' in source && '_owner' in source) {
        return source
      }
      if (source[actionsSymbol]) {
        return source
      }
      if (isObservable(source)) {
        return source
      }
      if (source['_isAMomentObject']) {
        return source
      }
      if (Schema.isSchemaInstance(source)) {
        return source.fromJSON(source)
      }
      if (isFn(source['toJS'])) {
        return source
      }
      if (isFn(source['toJSON'])) {
        return source
      }
      if (seenObjects.get(source)) {
        return source
      }
      seenObjects.set(source, true)
      return reduce(
        source,
        (buf, value, key) => {
          buf[key] = complie(value)
          return buf
        },
        {}
      )
    }
    return source
  }
  return complie(source)
}
