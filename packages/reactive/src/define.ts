import { each } from '@formily/shared'
import { MakeObservableSymbol } from './environment'
import { buildObservableTree } from './traverse'
import { observable } from './observable'
import { createObservable } from './internals'
import { isObservable, isAnnotation, Annotations } from './types'

export function define<Target extends object = any>(
  target: Target,
  annotations: Annotations<Target>
) {
  if (isObservable(target)) return target
  buildObservableTree({
    value: target,
    traverse: createObservable,
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
