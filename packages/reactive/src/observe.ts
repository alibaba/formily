import { IChange } from './types'
import { RawNode, ProxyRaw } from './environment'
import { isFn } from '@formily/shared/esm'
import { reaction } from './autorun'

export const observe = (
  target: object | (() => object),
  observer?: (change: IChange) => void,
  deep = true
) => {
  const listener = (change: IChange) => {
    if (change.type === 'delete') {
      removeListener(change.value)
    }
    if (change.type === 'set') {
      removeListener(change.oldValue)
    }
    if (isFn(observer)) {
      observer(change)
    }
  }

  const addListener = (target: any) => {
    const raw = ProxyRaw.get(target) || target
    const node = RawNode.get(raw)
    if (node) {
      if (isFn(listener)) {
        if (deep) {
          node.deepObservers.add(listener)
        }
        node.observers.add(listener)
      }
    }

    return () => {
      if (node) {
        node.deepObservers.delete(listener)
        node.observers.delete(listener)
      }
    }
  }
  const removeListener = (target: any) => {
    const raw = ProxyRaw.get(target) || target
    const node = RawNode.get(raw)
    if (node) {
      node.deepObservers.delete(listener)
      node.observers.delete(listener)
    }
  }
  if (typeof target === 'object') {
    return addListener(target)
  } else if (isFn(target)) {
    let oldTarget = target()
    const dispose = reaction(
      () => {
        const res = target()
        addListener(res)
        return res
      },
      (target) => {
        if (oldTarget !== target) {
          removeListener(oldTarget)
        }
        oldTarget = target
      }
    )
    return () => {
      dispose()
      removeListener(oldTarget)
    }
  }
}
