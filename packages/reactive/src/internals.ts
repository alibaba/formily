import { isFn, isCollectionType } from './checkers'
import {
  RawProxy,
  ProxyRaw,
  MakeObservableSymbol,
  RawShallowProxy,
} from './environment'
import { baseHandlers, collectionHandlers } from './handlers'
import { buildDataTree } from './datatree'
import { isObservable, isSupportObservable } from './externals'
import { PropertyKey, IVisitor } from './types'

export const createProxy = <T extends object>(
  target: T,
  shallow?: boolean
): T => {
  const proxy = new Proxy(
    target,
    isCollectionType(target) ? collectionHandlers : baseHandlers
  )
  ProxyRaw.set(proxy, target)
  if (shallow) {
    RawShallowProxy.set(target, proxy)
  } else {
    RawProxy.set(target, proxy)
  }
  return proxy
}

export const createObservable = (
  target: any,
  key?: PropertyKey,
  value?: any,
  shallow?: boolean
) => {
  if (target) {
    const parentRaw = ProxyRaw.get(target) || target
    const isShallowParent = RawShallowProxy.get(parentRaw)
    if (isShallowParent) return value
  }
  if (isObservable(value)) return value
  if (isSupportObservable(value)) {
    buildDataTree(target, key, value)
    return createProxy(value, shallow)
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

export function getObservableMaker(target: any) {
  if (target[MakeObservableSymbol]) {
    if (!target[MakeObservableSymbol][MakeObservableSymbol]) {
      return target[MakeObservableSymbol]
    }
    return getObservableMaker(target[MakeObservableSymbol])
  }
}
