import {
  batchEnd,
  batchStart,
  untrackEnd,
  untrackStart,
  disposeBindingReactions,
  releaseBindingReactions,
} from './reaction'
import { isFn } from './checkers'
import { ReactionStack } from './environment'
import { Reaction, IReactionOptions } from './types'

interface IValue {
  currentValue?: any
  oldValue?: any
}

interface IInitialized {
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
  subscriber?: (value: T, oldValue: T) => void,
  options?: IReactionOptions<T>
) => {
  const realOptions = {
    name: 'Reaction',
    ...options,
  }
  const value: IValue = {}
  const initialized: IInitialized = {}
  const dirty: IDirty = {}
  const dirtyCheck = () => {
    if (isFn(realOptions.equals))
      return !realOptions.equals(value.oldValue, value.currentValue)
    return value.oldValue !== value.currentValue
  }

  const reaction = () => {
    if (ReactionStack.indexOf(reaction) === -1) {
      releaseBindingReactions(reaction)
      try {
        ReactionStack.push(reaction)
        value.currentValue = tracker()
        dirty.current = dirtyCheck()
      } finally {
        ReactionStack.pop()
      }
    }

    if (
      (dirty.current && initialized.current) ||
      (!initialized.current && realOptions.fireImmediately)
    ) {
      try {
        batchStart()
        untrackStart()
        if (isFn(subscriber)) subscriber(value.currentValue, value.oldValue)
      } finally {
        untrackEnd()
        batchEnd()
      }
    }

    value.oldValue = value.currentValue
    initialized.current = true
  }

  reaction._name = realOptions.name
  reaction()

  return () => {
    disposeBindingReactions(reaction)
  }
}
