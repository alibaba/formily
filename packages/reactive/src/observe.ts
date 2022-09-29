import { IOperation } from './types'
import { ObserverListeners } from './environment'
import { raw } from './externals'
import { isFn } from './checkers'
import { DataChange, getDataNode } from './tree'

export const observe = (
  target: object,
  observer?: (change: DataChange) => void,
  deep = true
) => {
  const addListener = (target: any) => {
    const targetRaw = raw(target)
    const node = getDataNode(targetRaw)

    const listener = (operation: IOperation) => {
      const targetRaw = raw(operation.target)
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
