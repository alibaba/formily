import { each, isObj } from '@formily/shared'
import { RawProxy, ProxyRaw, RawNode } from './environment'
import { handlers } from './handlers'
import { traverseIn } from './traverse'
import { isObservable } from './types'

const createProxy = (target: any) => {
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
        observers: new Set(),
        deepObservers: parentNode.deepObservers,
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

export const observable = (target: any, traverse = observable.deep) => {
  if (isObservable(target)) return target
  if (isObj(target)) {
    const cloned = Array.isArray(target) ? [] : {}
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
