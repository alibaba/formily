import { isPlainObj, isArr, isStr, reduce } from '@uform/shared'

const ExpRE = /^\s*\{\{(.*)\}\}\s*$/

export const compileObject = <Source = any, Context = any>(
  source: Source,
  context: Context
): any => {
  if (isStr(source)) {
    const matched = source.match(ExpRE)
    if (!matched) return source
    const vars = Object.keys(context || {})
    const params = vars.map(key => context[key])
    return new Function(...vars, `return (${matched[1]});`)(...params)
  } else if (isArr(source)) {
    return source.map(value => compileObject(value, context))
  } else if (isPlainObj(source)) {
    return reduce(
      source,
      (buf, value, key) => {
        buf[key] = compileObject(value, context)
        return buf
      },
      {}
    )
  }
  return source
}
