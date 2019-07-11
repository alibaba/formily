import React from 'react'
import { reduce, isFn, isStr, isArr } from '@uform/utils'

export * from '@uform/utils'

export const isNum = (value: string | number): boolean =>
  typeof value === 'number'

export const isNotEmptyStr = (str: string): boolean => !!(isStr(str) && str)

export const flatArr = (arr: any[]) =>
  arr.reduce((buf, item) => {
    return isArr(item) ? buf.concat(flatArr(item)) : buf.concat(item)
  }, [])

export const compose = (payload: any, args: any[], revert: boolean) =>
  reduce(
    args,
    (buf, fn: any) => {
      return isFn(fn) ? fn(buf) : buf
    },
    payload,
    revert
  )

export const createHOC = (wrapper?: (options: object, Target) => any) => (
  options?: object
) => (Target: React.ComponentType) => {
  return wrapper({ ...options }, Target)
}

export const filterSchema = (_, key): boolean =>
  ['items', 'properties'].indexOf(key) < 0

export const filterSchemaPropertiesAndReactChildren = (_, key): boolean => {
  return ['items', 'properties', 'children'].indexOf(key) < 0
}
