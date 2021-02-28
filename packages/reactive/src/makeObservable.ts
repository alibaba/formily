import { each } from '@formily/shared'
import { MakeObservableSymbol } from './environment'
import { buildObservableTree } from './traverse'
import { observable } from './observable'
import { createObservable } from './internals'
import { isObservable, isAnnotation } from './shared'
import { Annotations } from './types'

export function makeObservable<Target extends object = any>(
  target: Target,
  annotations: Annotations<Target>,
  traverse = createObservable
) {
  if (isObservable(target)) return target
  buildObservableTree({
    value: target,
    traverse,
  })
  return observable(target, ({ target, value }) => {
    if (target) return target
    each(annotations, (annotation, key) => {
      if (isAnnotation(annotation)) {
        annotation[MakeObservableSymbol]({
          target: value,
          key,
          value: value[key],
        })
      }
    })
    return value
  })
}
