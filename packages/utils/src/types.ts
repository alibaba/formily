const isType = (type: string) => (obj: any) =>
  obj != null && Object.prototype.toString.call(obj) === `[object ${type}]`
export const isFn = isType('Function')
export const isArr = Array.isArray || isType('Array')
export const isPlainObj = isType('Object')
export const isStr = isType('String')
export const isBool = isType('Boolean')
export const isNum = isType('Number')
export const isObj = (val: any) => typeof val === 'object'
export const isRegExp = isType('RegExp')
