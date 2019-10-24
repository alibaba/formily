const isType = <T>(type: string) => (obj: unknown): obj is T =>
  obj != null && Object.prototype.toString.call(obj) === `[object ${type}]`
// FIXME: isFn, isArr is incorrect
export const isFn = isType<(...args: any[]) => any>('Function')
export const isArr = Array.isArray || isType<unknown[]>('Array')
export const isPlainObj = isType<object>('Object')
export const isStr = isType<string>('String')
export const isBool = isType<boolean>('Boolean')
export const isNum = isType<number>('Number')
export const isObj = (val: unknown): val is object => typeof val === 'object'
export const isRegExp = isType<RegExp>('RegExp')
