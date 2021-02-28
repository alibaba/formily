import { ProxyRaw, RawNode } from './environment'
import { isObservable, isSupportObservable, IVisitor } from './types'

export const buildObservableTree = ({
  target,
  value,
  key,
  traverse,
  shallow,
}: IVisitor) => {
  const parentNode = RawNode.get(ProxyRaw.get(target) || target)
  if (parentNode) {
    RawNode.set(value, {
      path: parentNode.path.concat(key),
      parent: parentNode,
      observers: new Set(),
      deepObservers: new Set(),
      shallow: shallow || parentNode.shallow,
      traverse: traverse || parentNode.traverse,
    })
  } else {
    RawNode.set(value, {
      path: [],
      observers: new Set(),
      deepObservers: new Set(),
      shallow,
      traverse,
    })
  }
}

export const traverseIn = (target: any, key: PropertyKey, value: any) => {
  if (isObservable(value)) return value
  const parent = ProxyRaw.get(target) || target
  const raw = ProxyRaw.get(value) || value
  const parentNode = RawNode.get(parent)
  const node = RawNode.get(raw)
  if (parentNode) {
    if (!isSupportObservable(value)) return value
    const path = parentNode.path.concat(key)
    const shallow = parentNode.shallow
    if (!node) {
      RawNode.set(raw, {
        path,
        parent: parentNode,
        observers: new Set(),
        deepObservers: new Set(),
        shallow: parentNode.shallow,
        traverse: parentNode.traverse,
      })
    }
    if (shallow) return value
    return parentNode.traverse({ target, key, value, path, shallow })
  }
  return value
}
