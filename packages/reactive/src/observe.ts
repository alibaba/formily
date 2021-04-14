import { IChange } from './types'
import { RawNode, ProxyRaw } from './environment'
import { isFn } from './checkers'

export const observe = (
  target: object,
  observer?: (change: IChange) => void,
  deep = true
) => {
  const listener = (change: IChange) => {
    if (isFn(observer)) {
      observer(change)
    }
  }

  const addListener = (target: any) => {
    const raw = ProxyRaw.get(target) || target
    const node = RawNode.get(raw)
    if (node) {
      if (deep) {
        node.deepObservers.add(listener)
      } else {
        node.observers.add(listener)
      }
    }
    return () => {
      const raw = ProxyRaw.get(target) || target
      const node = RawNode.get(raw)
      if (node) {
        node.deepObservers.delete(listener)
        node.observers.delete(listener)
      }
    }
  }
  if (target && typeof target !== 'object')
    throw Error(`Can not observe ${typeof target} type.`)
  return addListener(target)
}
