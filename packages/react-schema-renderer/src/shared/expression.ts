import {
  isPlainObj,
  isArr,
  isFn,
  isStr,
  reduce,
  BigData
} from '@formily/shared'

const ExpRE = /^\s*\{\{(.*)\}\}\s*$/
const actionsSymbol = Symbol.for("__REVA_ACTIONS")

export const complieExpression = <Source = any, Context = any>(
  source: Source,
  context?: Context,
  exclude?: (key: string, value: any) => boolean
): any => {
  const seenObjects = []
  const complie = <Source = any>(source: Source) => {
    if (isStr(source)) {
      const matched = source.match(ExpRE)
      if (!matched) return source
      const vars = Object.keys(context || {})
      const params = vars.map(key => context[key])
      return new Function(...vars, `return (${matched[1]});`)(...params)
    } else if (isArr(source)) {
      return source.map(value => complie(value))
    } else if (isPlainObj(source)) {
      if('$$typeof' in source && '_owner' in source){
        return source
      }
      if (source[actionsSymbol]) {
        return source
      }
      if (source['_isAMomentObject']) {
        return source
      }
      if (source['_isJSONSchemaObject']) {
        return source
      }
      if (BigData.isBigData(source)) {
        return source
      }
      if (isFn(source['toJS'])) {
        return source
      }
      if (isFn(source['toJSON'])) {
        return source
      }
      if (seenObjects.includes(source)) {
        return source
      }
      seenObjects.push(source)
      return reduce(
        source,
        (buf, value, key) => {
          if (isFn(exclude)) {
            if (exclude(key, value)) {
              buf[key] = value
              return buf
            }
          }
          if (key == 'x-linkages') {
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
  return complie<Source>(source)
}
