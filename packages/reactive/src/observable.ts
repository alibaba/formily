import { each, isObj } from '@formily/shared'
import { RawProxy, ProxyRaw, RawNode } from './environment'
import { handlers } from './handlers'
import { traverseIn } from './traverse'
import { isObservable } from './types'

const createProxy = <T extends object>(target: T): T => {
  if (isObservable(target)) {
    return target
  }
  const proxy = new Proxy(target, handlers)
  ProxyRaw.set(proxy, target)
  RawProxy.set(target, proxy)
  return proxy
}

const createMasterObservable = (target: any, key: PropertyKey, value: any) => {
  if (isObservable(value)) return value
  if (isObj(value)) {
    const parentNode = RawNode.get(ProxyRaw.get(target) || target)
    const cloned = Array.isArray(value) ? [] : {}
    if (parentNode) {
      RawNode.set(cloned, {
        path: parentNode.path.concat(key),
        parent: parentNode,
        observers: new Set(),
        deepObservers: new Set(),
        traverse: parentNode.traverse,
      })
    }
    each(value, (value, key) => {
      cloned[key] = traverseIn(cloned, key, value)
    })
    return createProxy(cloned)
  }
  return value
}

export function observable<T extends object>(
  target: T,
  traverse = observable.deep
): T {
  if (isObservable(target)) return target
  if (isObj(target)) {
    const cloned = (Array.isArray(target) ? [] : {}) as T
    RawNode.set(cloned, {
      path: [],
      observers: new Set(),
      deepObservers: new Set(),
      traverse,
    })
    each(target, (value, key) => {
      cloned[key] = traverseIn(cloned, key, value)
    })
    return createProxy(cloned)
  }
  return target
}

observable.deep = createMasterObservable

observable.object = createMasterObservable

observable.array = createMasterObservable
