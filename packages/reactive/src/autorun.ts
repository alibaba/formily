import { ReactionStack } from './environment'
import { Reaction } from './types'
import { disposeBindingReaction } from './reaction'
import { isFn } from '@formily/shared'

export const autorun = (reaction: Reaction) => {
  const runner = () => {
    try {
      ReactionStack.push(runner)
      reaction()
    } finally {
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
