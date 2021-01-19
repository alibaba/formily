import { isArr, isFn, isStr, reduce } from '@formily/shared'
import { isObservable } from 'mobx'
import { isSchemaObject } from './schema'

const ExpRE = /^\s*\{\{(.*)\}\}\s*$/
const actionsSymbol = Symbol.for('__REVA_ACTIONS')

export const shallowComplie = <Source = any, Scope = any>(
  source: Source,
  scope?: Scope
) => {
  if (isStr(source)) {
    const matched = source.match(ExpRE)
    if (!matched) return source
    const vars = Object.keys(scope || {})
    const params = vars.map((key) => scope[key])
    return new Function(...vars, `return (${matched[1]});`)(...params)
  } else if (isArr(source)) {
    return source.map((item) => shallowComplie(item, scope))
  }
  return source
}

export const complie = <Source = any, Scope = any>(
  source: Source,
  scope?: Scope,
  exclude?: (key: string, value: any) => boolean
): any => {
  const seenObjects = new WeakMap()
  const complie = (source: any) => {
    if (isStr(source)) {
      return shallowComplie(source, scope)
    } else if (isArr(source)) {
      return source.map((value: any) => complie(value))
    } else if (typeof source === 'object') {
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
      if (isSchemaObject(source)) {
        return source.fromJSON(source, scope)
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
          if (isFn(exclude)) {
            if (exclude(key, value)) {
              buf[key] = value
              return buf
            }
          }
          if (key === 'x-linkages' || key === 'x-reactions') {
            buf[key] = value
            return buf
          }
          if (value && value['_owner'] && value['$$typeof']) {
            buf[key] = value
            return buf
          }
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
