import { isObj } from '@formily/shared/esm'
import { ProxyRaw, RawNode } from './environment'
import { isObservable } from './types'

export const traverseIn = (target: any, key: PropertyKey, value: any) => {
  if (isObservable(value)) return value
  const parent = ProxyRaw.get(target) || target
  const raw = ProxyRaw.get(value) || value
  const parentNode = RawNode.get(parent)
  const node = RawNode.get(raw)
  if (parentNode) {
    if (!isObj(value)) return value
    const path = parentNode.path.concat(key)
    if (!node) {
      RawNode.set(raw, {
        path,
        parent: parentNode,
        observers: new Set(),
        deepObservers: new Set(),
        traverse: parentNode.traverse,
      })
    }
    return parentNode.traverse(target, key, value, path)
  }
  return value
}
