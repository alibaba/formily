import { ProxyRaw, RawNode } from './environment'
import { isObservable, isSupportObservable } from './externals'
import { IRawNode, IVisitor } from './types'
import { concat } from './concat'
import { createObservable } from './internals'

export const buildTreeNode = ({ target, value, key, shallow }: IVisitor) => {
  const raw = ProxyRaw.get(value) || value
  const currentNode = RawNode.get(raw)
  if (currentNode) return currentNode
  const parentRaw = ProxyRaw.get(target) || target
  const parentNode = RawNode.get(parentRaw)
  if (parentNode) {
    const node: IRawNode = {
      get path() {
        return concat(parentNode.path, key)
      },
      parent: parentNode,
      observers: [],
      deepObservers: [],
      shallow: shallow || parentNode.shallow,
    }
    RawNode.set(value, node)
  } else {
    const node: IRawNode = {
      path: [],
      observers: [],
      deepObservers: [],
      shallow,
    }
    RawNode.set(value, node)
    return node
  }
}

export const traverseIn = (target: any, key: PropertyKey, value: any) => {
  if (isObservable(value) || !isSupportObservable(value)) return value
  const parent = ProxyRaw.get(target) || target
  const parentNode = RawNode.get(parent)
  if (parentNode) {
    const shallow = parentNode.shallow
    if (shallow) return value
    return createObservable({ target, key, value, shallow })
  }
  return value
}
