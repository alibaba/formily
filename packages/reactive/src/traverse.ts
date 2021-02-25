import { isObj } from '@formily/shared/esm'
import { ProxyRaw, RawNode } from './environment'
import { IChange, IOperation, isObservable } from './types'

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
        deepObservers: parentNode.deepObservers,
        traverse: parentNode.traverse,
      })
    }
    return parentNode.traverse(target, key, value, path)
  }
  return value
}

export const notify = (target: any, operation: IOperation) => {
  const node = RawNode.get(ProxyRaw.get(target) || target)
  if (node) {
    const change: IChange = {
      path: node.path.concat(operation.key),
      type: operation.type,
      key: operation.key,
      value: operation.value,
      oldValue: operation.oldValue,
    }
    node.observers.forEach((fn) => fn(change))
    node.deepObservers.forEach((fn) => fn(change))
    let parent = node.parent
    while (!!parent) {
      parent.deepObservers.forEach((fn) => fn(change))
      parent = parent.parent
    }
  }
}
