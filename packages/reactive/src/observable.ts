import * as annotations from './annotations'
import { MakeObservableSymbol } from './environment'
import { createObservable } from './internals'
import { ObservableTraverse } from './types'

export function observable<T extends object>(
  target: T,
  traverse: ObservableTraverse<T> = createObservable
): T {
  return traverse({ value: target, traverse })
}

observable.box = annotations.box
observable.ref = annotations.ref
observable.deep = annotations.observable
observable.shallow = annotations.shallow
observable.computed = annotations.computed
observable[MakeObservableSymbol] = annotations.observable
