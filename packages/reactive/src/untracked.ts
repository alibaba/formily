import { isFn } from './checkers'
import { untrackStart, untrackEnd } from './reaction'

export const untracked = <T extends () => any>(
  untracker?: T
): ReturnType<T> => {
  untrackStart()
  let res: any
  try {
    if (isFn(untracker)) {
      res = untracker()
    }
  } finally {
    untrackEnd()
    return res
  }
}

untracked.create = () => {
  untrackStart()
  let completed = false
  return () => {
    if (!completed) {
      untrackEnd()
      completed = true
    }
  }
}
