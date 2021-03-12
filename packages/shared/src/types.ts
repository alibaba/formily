const isType = <T>(type: string | string[]) => (obj: unknown): obj is T =>
  obj != null &&
  (Array.isArray(type) ? type : [type]).some(
    (t) => getType(obj) === `[object ${t}]`
  )
export const getType = (obj: any) => Object.prototype.toString.call(obj)
export const isFn = isType<(...args: any[]) => any>([
  'Function',
  'AsyncFunction',
  'GeneratorFunction',
])
export const isArr = Array.isArray
export const isPlainObj = isType<object>('Object')
export const isStr = isType<string>('String')
export const isBool = isType<boolean>('Boolean')
export const isNum = isType<number>('Number')
export const isMap = isType('Map')
export const isSet = isType('Set')
export const isWeakMap = isType('WeakMap')
export const isWeakSet = isType('WeakSet')
export const isNumberLike = (index: any): index is number =>
  isNum(index) || /^\d+$/.test(index)
export const isObj = (val: unknown): val is object => typeof val === 'object'
export const isRegExp = isType<RegExp>('RegExp')
export const isReactElement = (obj: any): obj is React.ReactElement<any> =>
  obj && obj['$$typeof'] && obj['_owner']
export const isHTMLElement = (target: any): target is EventTarget => {
  return Object.prototype.toString.call(target).indexOf('HTML') > -1
}

export type Subscriber<S> = (payload: S) => void

export interface Subscription<S> {
  notify?: (payload: S) => void | boolean
  filter?: (payload: S) => any
}
