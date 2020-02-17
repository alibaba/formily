import { isPlainObj, isArr, isFn, isStr, reduce } from '@formily/shared'

const ExpRE = /^\s*\{\{(.*)\}\}\s*$/

export const compileObject = <Source = any, Context = any>(
  source: Source,
  context: Context,
  exclude?: (key: string, value: any) => boolean
): any => {
  if (isStr(source)) {
    const matched = source.match(ExpRE)
    if (!matched) return source
    const vars = Object.keys(context || {})
    const params = vars.map(key => context[key])
    return new Function(...vars, `return (${matched[1]});`)(...params)
  } else if (isArr(source)) {
    return source.map(value => compileObject(value, context, exclude))
  } else if (isPlainObj(source)) {
    return reduce(
      source,
      (buf, value, key) => {
        if (isFn(exclude)) {
          if (exclude(key, value)) {
            buf[key] = value
            return buf
          }
        }
        buf[key] = compileObject(value, context, exclude)
        return buf
      },
      {}
    )
  }
  return source
}
