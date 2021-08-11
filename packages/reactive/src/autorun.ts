import {
  batchEnd,
  batchStart,
  untrackEnd,
  untrackStart,
  disposeBindingReactions,
  releaseBindingReactions,
  disposeEffects,
  hasDepsChange,
} from './reaction'
import { isFn } from './checkers'
import { ReactionStack } from './environment'
import { Reaction, IReactionOptions, Dispose } from './types'
import { toArray } from './array'

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
  const reaction: Reaction = () => {
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
        reaction._memos.cursor = 0
        reaction._effects.cursor = 0
      }
    }
  }
  const cleanRefs = () => {
    reaction._memos = {
      queue: [],
      cursor: 0,
    }
    reaction._effects = {
      queue: [],
      cursor: 0,
    }
  }
  reaction._boundary = 0
  reaction._name = name
  cleanRefs()
  reaction()
  return () => {
    disposeBindingReactions(reaction)
    disposeEffects(reaction)
    cleanRefs()
  }
}

autorun.memo = <T>(callback: () => T, dependencies?: any[]): T => {
  if (!isFn(callback)) return
  const current = ReactionStack[ReactionStack.length - 1]
  if (!current || !current._memos)
    throw new Error('autorun.memo must used in autorun function body.')
  const deps = toArray(dependencies || [])
  const id = current._memos.cursor++
  const old = current._memos.queue[id]
  if (!old || hasDepsChange(deps, old.deps)) {
    const value = callback()
    current._memos.queue[id] = {
      value,
      deps,
    }
    return value
  }
  return old.value
}

autorun.effect = (callback: () => void | Dispose, dependencies?: any[]) => {
  if (!isFn(callback)) return
  const current = ReactionStack[ReactionStack.length - 1]
  if (!current || !current._effects)
    throw new Error('autorun.effect must used in autorun function body.')
  const effects = current._effects
  const deps = toArray(dependencies || [{}])
  const id = effects.cursor++
  const old = effects.queue[id]
  if (!old || hasDepsChange(deps, old.deps)) {
    Promise.resolve(0).then(() => {
      if (current._disposed) return
      const dispose = callback()
      if (isFn(dispose)) {
        effects.queue[id].dispose = dispose
      }
    })
    effects.queue[id] = {
      deps,
    }
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
