import { isFn } from './checkers'
import { buildTreeNode } from './traverse'
import { observable } from './observable'
import { createObservable, getObservableMaker } from './internals'
import { isObservable, isAnnotation, isSupportObservable } from './externals'
import { Annotations } from './types'
import { batch } from './batch'
import { setRawNode, setProxyRaw } from './environment'

export function define<Target extends object = any>(
  target: Target,
  annotations?: Annotations<Target>
): Target {
  if (isObservable(target)) return target
  if (!isSupportObservable(target)) return target
  buildTreeNode({
    value: target,
    traverse: createObservable,
  })
  setProxyRaw(target, target)
  setRawNode(target, (node) => {
    node.proxy = target
  })
  return observable(target, ({ target, value }) => {
    if (target) return target
    for (const key in annotations) {
      const annotation = annotations[key]
      if (isAnnotation(annotation)) {
        getObservableMaker(annotation)({
          target: value,
          key,
        })
      }
    }
    return value
  })
}

export function model<Target extends object = any>(target: Target): Target {
  const annotations = Object.keys(target || {}).reduce((buf, key) => {
    const descriptor = Object.getOwnPropertyDescriptor(target, key)
    if (descriptor && descriptor.get) {
      buf[key] = observable.computed
    } else if (isFn(target[key])) {
      buf[key] = batch
    } else {
      buf[key] = observable
    }
    return buf
  }, {})
  return define(target, annotations)
}
