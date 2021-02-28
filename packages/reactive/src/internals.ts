import { each, isFn } from '@formily/shared'
import { RawProxy, ProxyRaw, MakeObservableSymbol } from './environment'
import { handlers } from './handlers'
import { traverseIn, buildObservableTree } from './traverse'
import {
  isObservable,
  isSupportObservable,
  ObservableTraverse,
  IVisitor,
} from './types'

export const createProxy = <T extends object>(target: T): T => {
  if (isObservable(target)) {
    return target
  }
  const proxy = new Proxy(target, handlers)
  ProxyRaw.set(proxy, target)
  RawProxy.set(target, proxy)
  return proxy
}

export const createObservable: ObservableTraverse = (visitor) => {
  const { value, target, key, traverse, shallow } = visitor
  if (isObservable(value)) return value
  if (isSupportObservable(value)) {
    const cloned = Array.isArray(value) ? [] : {}
    buildObservableTree({
      target,
      key,
      value: cloned,
      shallow,
      traverse: traverse || createObservable,
    })
    each(value, (value, key) => {
      if (shallow) {
        cloned[key] = value
      } else {
        cloned[key] = traverseIn(cloned, key, value)
      }
    })
    return createProxy(cloned)
  }
  return value
}

export function createAnnotation<T extends (visitor: IVisitor) => any>(
  maker: T
) {
  const annotation = (target: any): ReturnType<T> => {
    return maker({ value: target })
  }
  if (isFn(maker)) {
    annotation[MakeObservableSymbol] = maker
  }
  return annotation
}
