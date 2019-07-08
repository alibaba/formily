import { reduce, isFn } from '@uform/utils'
export * from '@uform/utils'

export const isNum = val => typeof val === 'number'

export const compose = (payload, args, revert) =>
  reduce(
    args,
    (buf, fn) => {
      return isFn(fn) ? fn(buf) : buf
    },
    payload,
    revert
  )

export const createHOC = wrapper => options => Target => {
  return wrapper({ ...options }, Target)
}

export const filterSchema = (_, key) => key !== 'properties' && key !== 'items'

export const filterSchemaPropertiesAndReactChildren = (_, key) =>
  key !== 'properties' && key !== 'items' && key !== 'children'
