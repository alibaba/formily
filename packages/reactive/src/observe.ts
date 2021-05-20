import { IChange } from './types'
import { RawNode, ProxyRaw } from './environment'
import { isFn } from './checkers'

interface IListener {
  (change: IChange): void
  unobserve?(): void
}

export const observe = (
  target: object,
  observer?: (change: IChange) => void,
  deep = true
) => {
  const listener: IListener = (change: IChange) => {
    if (isFn(observer)) {
      observer(change)
    }
  }

  const addListener = (target: any) => {
    const raw = ProxyRaw.get(target) || target
    const node = RawNode.get(raw)
    if (node) {
      if (deep) {
        const id = node.deepObservers.length
        node.deepObservers.push(listener)
        listener.unobserve = () => {
          node.deepObservers.splice(id, 1)
        }
      } else {
        const id = node.observers.length
        node.observers.push(listener)
        listener.unobserve = () => {
          node.observers.splice(id, 1)
        }
      }
    }
    return () => {
      listener?.unobserve()
    }
  }
  if (target && typeof target !== 'object')
    throw Error(`Can not observe ${typeof target} type.`)
  return addListener(target)
}
