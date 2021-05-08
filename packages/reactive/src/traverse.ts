import { ProxyRaw, RawNode } from './environment'
import { IRawNode, IVisitor } from './types'
import { concat } from './concat'

export const buildTreeNode = ({ target, value, key }: IVisitor) => {
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
    }
    RawNode.set(value, node)
  } else {
    const node: IRawNode = {
      path: [],
      observers: [],
      deepObservers: [],
    }
    RawNode.set(value, node)
    return node
  }
}