import { ProxyRaw, RawNode } from './environment'
import { PropertyKey } from './types'
import { concat } from './concat'

export const buildDataTree = (target: any, key: PropertyKey, value: any) => {
  const raw = ProxyRaw.get(value) || value
  const currentNode = RawNode.get(raw)
  if (currentNode) return currentNode
  const parentRaw = ProxyRaw.get(target) || target
  const parentNode = RawNode.get(parentRaw)
  if (parentNode) {
    RawNode.set(value, {
      get path() {
        return concat(parentNode.path, key)
      },
      parent: parentNode,
      observers: [],
      deepObservers: [],
    })
  } else {
    RawNode.set(value, {
      path: [],
      observers: [],
      deepObservers: [],
    })
  }
}
