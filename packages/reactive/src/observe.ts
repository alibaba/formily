import { IChange } from './types'
import { getProxyRaw,getRawNode } from './environment'
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
    const raw = getProxyRaw(target) || target
    const node = getRawNode(raw)
    if (node) {
      if (deep) {
        node.deepObservers.add(listener)
      } else {
        node.observers.add(listener)
      }
    }
    return () => {
      const raw = getProxyRaw(target) || target
      const node = getRawNode(raw)
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
