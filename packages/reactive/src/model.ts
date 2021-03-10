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

export function createModel<Target extends object = any>(target: Target) {
  return defineModel(
    target,
    reduce(
      target,
      (buf, value, key) => {
        if (isFn(value)) {
          buf[key] = batch
        } else {
          buf[key] = observable
        }
        return buf
      },
      {}
    )
  )
}
