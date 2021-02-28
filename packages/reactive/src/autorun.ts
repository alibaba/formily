import { ReactionStack } from './environment'
import { Reaction } from './types'
import { batchEnd, batchStart, disposeBindingReaction } from './reaction'
import { isFn } from '@formily/shared'

export const autorun = (reaction: Reaction) => {
  const runner = () => {
    try {
      ReactionStack.push(runner)
      batchStart()
      reaction()
    } finally {
      batchEnd()
      ReactionStack.pop()
    }
  }
  runner()
  return () => {
    disposeBindingReaction(runner)
  }
}

export const reaction = <T>(
  reaction: () => T,
  callback?: (payload: T) => void
) => {
  const initialValue = Symbol('initial-value')
  let oldValue: any = initialValue
  return autorun(() => {
    const current = reaction()
    if (current !== oldValue && oldValue !== initialValue) {
      if (isFn(callback)) callback(current)
    }
    oldValue = current
  })
}
