import { each, isFn, reduce } from '@formily/shared'
import { buildTreeNode } from './traverse'
import { observable } from './observable'
import { createObservable, getObservableMaker } from './internals'
import { isObservable, isAnnotation } from './shared'
import { Annotations } from './types'
import { batch } from './batch'

export function defineModel<Target extends object = any>(
  target: Target,
  annotations?: Annotations<Target>,
  traverse = createObservable
) {
  if (isObservable(target)) return target
  buildTreeNode({
    value: target,
    traverse,
  })
  return observable(target, ({ target, value }) => {
    if (target) return target
    each(annotations, (annotation, key) => {
      if (isAnnotation(annotation)) {
        getObservableMaker(annotation)({
          target: value,
          key,
        })
      }
    })
    return value
  })
}

export function model<Target extends object = any>(target: Target) {
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
  return defineModel(target, annotations)
}
