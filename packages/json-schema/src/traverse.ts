import { each, isArr } from '@formily/shared'
export const traverse = (
  target: any,
  visitor: (value: any, path: Array<string | number>, address: string) => void,
  filter?: (value: any, path: Array<string | number>) => boolean
) => {
  const seenObjects = new WeakMap()
  const traverse = (target: any, path = [], address = '') => {
    if (filter?.(target, path) === false) return
    if (typeof target === 'object' && !isArr(target)) {
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
