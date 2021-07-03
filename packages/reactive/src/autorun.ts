import {
  batchEnd,
  batchStart,
  disposeBindingReactions,
  releaseBindingReactions,
} from './reaction'
import { untracked } from './untracked'
import { isFn } from './checkers'
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
    if (!isFn(tracker)) return
    if (reaction._boundary > 0) return
    if (ReactionStack.indexOf(reaction) === -1) {
      releaseBindingReactions(reaction)
      try {
        batchStart()
        ReactionStack.push(reaction)
        tracker()
      } finally {
        ReactionStack.pop()
        reaction._boundary++
        batchEnd()
        reaction._boundary = 0
      }
    }
  }
  reaction._boundary = 0
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
    if (
      (dirty.current && tracked.current) ||
      (!tracked.current && realOptions.fireImmediately)
    ) {
      untracked(() => {
        if (isFn(subscriber)) subscriber(value.currentValue)
      })
    }
    value.oldValue = value.currentValue
    tracked.current = true
  }, realOptions.name)
}
