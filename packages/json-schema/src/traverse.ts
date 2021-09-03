import { each, isFn, isPlainObj } from '@formily/shared'
import { SchemaNestedKeys } from './shared'
import { ISchema } from './types'

export const traverse = (
  target: any,
  visitor: (value: any, path: Array<string | number>, address: string) => void,
  filter?: (value: any, path: Array<string | number>) => boolean
) => {
  const seenObjects = new WeakMap()
  const traverse = (target: any, path = [], address = '') => {
    if (filter?.(target, path) === false) return
    if (isPlainObj(target)) {
      if (seenObjects.get(target)) {
        return
      }
      seenObjects.set(target, true)
      each(target, (value, key) => {
        traverse(value, path.concat(key), address + '.' + key)
      })
    } else {
      visitor(target, path, address)
    }
  }

  traverse(target)
}

export const traverseSchema = (
  schema: ISchema,
  visitor: (value: any, path: any[]) => void
) => {
  traverse(schema, visitor, (value, path) => {
    if (String(path[0]).indexOf('x-') == -1 && isFn(value)) return false
    if (SchemaNestedKeys[path[0]]) return false
    return true
  })
}
