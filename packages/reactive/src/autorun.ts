import {
  batchEnd,
  batchStart,
  disposeBindingReactions,
  releaseBindingReactions,
} from './reaction'
import { untracked } from './untracked'
import { isFn } from '@formily/shared'
import { ReactionStack } from './environment'
import { Reaction, IReactionOptions } from './types'

interface IValue {
  currentValue?: any
  oldValue?: any
}

interface ITracked {
  current?: boolean
}

interface IDirty {
  current?: boolean
}

export const autorun = (tracker: Reaction, name = 'AutoRun') => {
  const reaction = () => {
    if (ReactionStack.indexOf(reaction) === -1) {
      releaseBindingReactions(reaction)
      try {
        ReactionStack.push(reaction)
        batchStart()
        if (isFn(tracker)) tracker()
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
  tracker: () => T,
  subscriber?: (payload: T) => void,
  options?: IReactionOptions<T>
) => {
  const realOptions = {
    name: 'Reaction',
    ...options,
  }
  const value: IValue = {}
  const tracked: ITracked = {}
  const dirty: IDirty = {}
  const dirtyCheck = () => {
    if (isFn(realOptions.equals))
      return !realOptions.equals(value.oldValue, value.currentValue)
    return value.oldValue !== value.currentValue
  }

  return autorun(() => {
    value.currentValue = tracker()
    dirty.current = dirtyCheck()
    if (dirty && tracked.current) {
      untracked(() => {
        if (isFn(subscriber)) subscriber(value.currentValue)
      })
    }
    value.oldValue = value.currentValue
    tracked.current = true
  }, realOptions.name)
}
