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
        deepObservers: new Set(),
        traverse: parentNode.traverse,
      })
    }
    return parentNode.traverse(target, key, value, path)
  }
  return value
}

export const notify = (operation: IOperation) => {
  const targetNode = RawNode.get(
    ProxyRaw.get(operation.target) || operation.target
  )
  const oldValueNode = RawNode.get(
    ProxyRaw.get(operation.oldValue) || operation.oldValue
  )
  const newValueNode = RawNode.get(
    ProxyRaw.get(operation.value) || operation.value
  )
  if (targetNode) {
    const change: IChange = {
      path: targetNode.path.concat(operation.key),
      type: operation.type,
      key: operation.key,
      value: operation.value,
      oldValue: operation.oldValue,
    }
    if (oldValueNode && operation.type === 'set') {
      oldValueNode.observers.forEach((fn) => fn(change))
      oldValueNode.deepObservers.forEach((fn) => fn(change))
      if (newValueNode) {
        newValueNode.observers = oldValueNode.observers
        newValueNode.deepObservers = oldValueNode.deepObservers
      }
      oldValueNode.observers = new Set()
      oldValueNode.deepObservers = new Set()
    }
    if (oldValueNode && operation.type === 'delete') {
      oldValueNode.observers = new Set()
      oldValueNode.deepObservers = new Set()
    }
    targetNode.observers.forEach((fn) => fn(change))
    targetNode.deepObservers.forEach((fn) => fn(change))
    let parent = targetNode.parent
    while (!!parent) {
      parent.deepObservers.forEach((fn) => fn(change))
      parent = parent.parent
    }
  }
}
