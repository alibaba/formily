import { createObservable } from './internals'
import { ObservableTraverse } from './types'

export function observable<T extends object>(
  target: T,
  traverse: ObservableTraverse<T> = createObservable
): T {
  return traverse({ value: target, traverse })
}
