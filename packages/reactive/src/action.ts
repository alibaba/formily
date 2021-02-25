import { isFn } from '@formily/shared/esm'
import { batchStart, batchEnd, excutePendingReactions } from './reaction'

export const runInAction = <T>(callback?: () => T) => {
  let result: T = null
  batchStart()
  try {
    if (isFn(callback)) {
      result = callback()
    }
  } finally {
    batchEnd(() => {
      excutePendingReactions()
    })
  }
  return result
}

export const action = <T extends (...args: any[]) => any>(callback?: T) => {
  return function (...args: Parameters<T>): ReturnType<T> {
    return runInAction(() =>
      isFn(callback) ? callback.apply(this, args) : undefined
    )
  }
}
