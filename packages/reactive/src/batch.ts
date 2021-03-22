import { isFn } from '@formily/shared'
import {
  batchStart,
  batchEnd,
  batchScopeStart,
  batchScopeEnd,
} from './reaction'
import { createAnnotation } from './internals'
import { MakeObservableSymbol } from './environment'

export const batch = <T>(callback?: () => T) => {
  let result: T = null
  batchStart()
  try {
    if (isFn(callback)) {
      result = callback()
    }
  } finally {
    batchEnd()
  }
  return result
}

batch.scope = <T>(callback?: () => T) => {
  let result: T = null
  batchScopeStart()
  try {
    if (isFn(callback)) {
      result = callback()
    }
  } finally {
    batchScopeEnd()
  }
  return result
}

export const action = createAnnotation(({ target, key, value }) => {
  const action = <T extends (...args: any[]) => any>(callback?: T) => {
    return function (...args: Parameters<T>): ReturnType<T> {
      return batch(() =>
        isFn(callback) ? callback.apply(this, args) : undefined
      )
    }
  }
  if (target) {
    target[key] = action(target[key])
    return target
  }
  return action(value)
})

batch[MakeObservableSymbol] = action
