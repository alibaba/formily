import { isFn } from '@formily/shared'
import { RawProxy, ProxyRaw, MakeObservableSymbol } from './environment'
import { handlers } from './handlers'
import { buildTreeNode } from './traverse'
import { isObservable, isSupportObservable } from './shared'
import { ObservableTraverse, IVisitor } from './types'

export const createProxy = <T extends object>(target: T): T => {
  if (isObservable(target)) {
    return target
  }
  const proxy = new Proxy(target, handlers)
  ProxyRaw.set(proxy, target)
  RawProxy.set(target, proxy)
  return proxy
}

export const createObservable: ObservableTraverse = ({
  value,
  target,
  key,
  traverse,
  shallow,
}) => {
  if (isObservable(value)) return value
  if (isSupportObservable(value)) {
    buildTreeNode({
      target,
      key,
      value,
      shallow,
      traverse: traverse || createObservable,
    })
    return createProxy(value)
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
