import { ReactionStack } from './environment'
import { Reaction } from './types'
import {
  batchEnd,
  batchStart,
  disposeBindingReactions,
  releaseBindingReactions,
} from './reaction'
import { isFn } from '@formily/shared'
import { untracked } from './shared'

export const autorun = (runner: Reaction, name = 'AutoRun') => {
  const reaction = () => {
    if (ReactionStack.indexOf(reaction) === -1) {
      releaseBindingReactions(reaction)
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
  reaction._name = name
  reaction()
  return () => {
    disposeBindingReactions(reaction)
  }
}

export const reaction = <T>(
  runner: () => T,
  callback?: (payload: T) => void,
  name = 'Reaction'
) => {
  const initialValue = Symbol('initial-value')
  let oldValue: any = initialValue
  return autorun(() => {
    const current = runner()
    if (current !== oldValue && oldValue !== initialValue) {
      untracked(() => {
        if (isFn(callback)) callback(current)
      })
    }
    oldValue = current
  }, name)
}
