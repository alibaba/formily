import { IRawNode, Reaction } from './types'

const ProxyRaw = new WeakMap()
const RawNode = new WeakMap<object, IRawNode>()

export const ReactionStack: Reaction[] = []
export const BatchCount = { value: 0 }
export const UntrackCount = { value: 0 }
export const BatchScope = { value: false }
export const PendingReactions = new Set<Reaction>()
export const PendingScopeReactions = new Set<Reaction>()
export const MakeObservableSymbol = Symbol('MakeObservableSymbol')

export const setProxyRaw = (target: object, raw: object) => {
  ProxyRaw.set(target, raw)
}

export const hasProxyRaw = (target: object) => ProxyRaw.has(target)

export const setRawNode = (
  target: object,
  setter?: (node: IRawNode) => void
) => {
  const node = RawNode.get(target)
  if (node) {
    setter(node)
  } else {
    const newNode: IRawNode = {
      path: [],
      observers: new Set(),
      deepObservers: new Set(),
    }
    setter(newNode)
    RawNode.set(target, newNode)
    return newNode
  }
  return node
}

export const getProxyRaw = (target: object) => {
  return ProxyRaw.get(target)
}

export const getRawNode = (target: object) => {
  return RawNode.get(target)
}
