import { ReactionStack } from './environment'
import { Reaction } from './types'
import {
  batchEnd,
  batchStart,
  disposeBindingReactions,
} from './reaction'
import { isFn } from '@formily/shared'

export const autorun = (runner: Reaction) => {
  const reaction = () => {
    if (ReactionStack.indexOf(reaction) === -1) {
      try {
        ReactionStack.push(reaction)
        batchStart()
        runner()
      } finally {
        batchEnd()
        ReactionStack.pop()
      }
    }
  }
  reaction()
  return () => {
    disposeBindingReactions(reaction)
  }
}

export const reaction = <T>(
  runner: () => T,
  callback?: (payload: T) => void
) => {
  const initialValue = Symbol('initial-value')
  let oldValue: any = initialValue
  return autorun(() => {
    const current = runner()
    if (current !== oldValue && oldValue !== initialValue) {
      if (isFn(callback)) callback(current)
    }
    oldValue = current
  })
}
