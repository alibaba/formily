import { IOperation } from './types'
import { ProxyRaw, ObserverListeners } from './environment'
import { isFn } from './checkers'
import { DataChange, getDataNode } from './tree'

export const observe = (
  target: object,
  observer?: (change: DataChange) => void,
  deep = true
) => {
  const addListener = (target: any) => {
    const raw = ProxyRaw.get(target) || target
    const node = getDataNode(raw)

    const listener = (operation: IOperation) => {
      const targetRaw = ProxyRaw.get(operation.target) || operation.target
      const targetNode = getDataNode(targetRaw)
      if (deep) {
        if (node.contains(targetNode)) {
          observer(new DataChange(operation, targetNode))
          return
        }
      }
      if (
        node === targetNode ||
        (node.targetRaw === targetRaw && node.key === operation.key)
      ) {
        observer(new DataChange(operation, targetNode))
      }
    }

    if (node && isFn(observer)) {
      ObserverListeners.add(listener)
    }
    return () => {
      ObserverListeners.delete(listener)
    }
  }
  if (target && typeof target !== 'object')
    throw Error(`Can not observe ${typeof target} type.`)
  return addListener(target)
}
