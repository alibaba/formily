import { isFn, isCollectionType, isNormalType } from './checkers'
import {
  RawProxy,
  ProxyRaw,
  MakeObservableSymbol,
  RawShallowProxy,
  RawNode,
} from './environment'
import { baseHandlers, collectionHandlers } from './handlers'
import { buildDataTree } from './datatree'
import { isSupportObservable } from './externals'
import { PropertyKey, IVisitor, BoundaryFunction } from './types'

const createNormalProxy = (target: any, shallow?: boolean) => {
  const proxy = new Proxy(target, baseHandlers)
  ProxyRaw.set(proxy, target)
  if (shallow) {
    RawShallowProxy.set(target, proxy)
  } else {
    RawProxy.set(target, proxy)
  }
  return proxy
}

const createCollectionProxy = (target: any, shallow?: boolean) => {
  const proxy = new Proxy(target, collectionHandlers)
  ProxyRaw.set(proxy, target)
  if (shallow) {
    RawShallowProxy.set(target, proxy)
  } else {
    RawProxy.set(target, proxy)
  }
  return proxy
}

const createShallowProxy = (target: any) => {
  if (isNormalType(target)) return createNormalProxy(target, true)
  if (isCollectionType(target)) return createCollectionProxy(target, true)
  return target
}

export const createObservable = (
  target: any,
  key?: PropertyKey,
  value?: any,
  shallow?: boolean
) => {
  if (typeof value !== 'object') return value
  const raw = ProxyRaw.get(value)
  if (!!raw) {
    const node = RawNode.get(raw)
    node.key = key
    return value
  }

  if (!isSupportObservable(value)) return value

  if (target) {
    const parentRaw = ProxyRaw.get(target) || target
    const isShallowParent = RawShallowProxy.get(parentRaw)
    if (isShallowParent) return value
  }

  buildDataTree(target, key, value)
  if (shallow) return createShallowProxy(value)
  if (isNormalType(value)) return createNormalProxy(value)
  if (isCollectionType(value)) return createCollectionProxy(value)
  return value
}

export const createAnnotation = <T extends (visitor: IVisitor) => any>(
  maker: T
) => {
  const annotation = (target: any): ReturnType<T> => {
    return maker({ value: target })
  }
  if (isFn(maker)) {
    annotation[MakeObservableSymbol] = maker
  }
  return annotation
}

export const getObservableMaker = (target: any) => {
  if (target[MakeObservableSymbol]) {
    if (!target[MakeObservableSymbol][MakeObservableSymbol]) {
      return target[MakeObservableSymbol]
    }
    return getObservableMaker(target[MakeObservableSymbol])
  }
}

export const createBoundaryFunction = (
  start: (...args: any) => void,
  end: (...args: any) => void
) => {
  function boundary<F extends (...args: any) => any>(fn?: F): ReturnType<F> {
    let results: ReturnType<F>
    start()
    try {
      if (isFn(fn)) {
        results = fn()
      }
    } finally {
      end()
      return results
    }
  }

  boundary.bound = createBindFunction(boundary)
  return boundary
}

export const createBindFunction = <Boundary extends BoundaryFunction>(
  boundary: Boundary
) => {
  function bind<F extends (...args: any[]) => any>(
    callback?: F,
    context?: any
  ): F {
    return ((...args: any[]) =>
      boundary(() => callback.apply(context, args))) as any
  }
  return bind
}

export const createBoundaryAnnotation = (
  start: (...args: any) => void,
  end: (...args: any) => void
) => {
  const boundary = createBoundaryFunction(start, end)
  const annotation = createAnnotation(({ target, key }) => {
    target[key] = boundary.bound(target[key], target)
    return target
  })
  boundary[MakeObservableSymbol] = annotation
  boundary.bound[MakeObservableSymbol] = annotation
  return boundary
}
