const isType = <T>(type: string | string[]) => (obj: unknown): obj is T =>
  obj != null &&
  (Array.isArray(type) ? type : [type]).some(
    t => getType(obj) === `[object ${t}]`
  )
export const getType = (obj: any) => Object.prototype.toString.call(obj)
export const isFn = isType<(...args: any[]) => any>([
  'Function',
  'AsyncFunction',
  'GeneratorFunction'
])
export const isArr = Array.isArray
export const isPlainObj = isType<object>('Object')
export const isStr = isType<string>('String')
export const isBool = isType<boolean>('Boolean')
export const isNum = isType<number>('Number')
export const isObj = (val: unknown): val is object => typeof val === 'object'
export const isRegExp = isType<RegExp>('RegExp')

export type Subscriber<S> = (payload: S) => void

export interface Subscription<S> {
  notify?: (payload: S) => void | boolean
  filter?: (payload: S) => any
}
