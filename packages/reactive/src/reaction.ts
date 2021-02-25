import { isFn } from '@formily/shared'
import { IOperation, KeysReactions, Reaction, PropertyKey } from './types'
import {
  ReactionStack,
  TargetKeysReactions,
  ReactionKeysReactions,
  PendingReactions,
  BatchCount,
} from './environment'
import { notify } from './traverse'

const ITERATION_KEY = Symbol('iteration key')

const addTargetKeysReactions = (
  target: any,
  key: PropertyKey,
  reaction: Reaction
) => {
  const keysReactions = TargetKeysReactions.get(target)
  if (keysReactions) {
    const reactions = keysReactions.get(key)
    if (reactions) {
      reactions.add(reaction)
    } else {
      const set = new Set<Reaction>()
      set.add(reaction)
      keysReactions.set(key, set)
    }
    return keysReactions
  } else {
    const map: KeysReactions = new Map()
    const set = new Set<Reaction>()
    set.add(reaction)
    map.set(key, set)
    TargetKeysReactions.set(target, map)
    return map
  }
}

const addReactionTargetKeys = (
  reaction: Reaction,
  keysReactions: KeysReactions
) => {
  ReactionKeysReactions.set(reaction, keysReactions)
}

const addDependenciesToCurrentReaction = (target: any, key: PropertyKey) => {
  const current = ReactionStack[ReactionStack.length - 1]
  if (current) {
    addReactionTargetKeys(current, addTargetKeysReactions(target, key, current))
  }
}

const runReactions = (target: any, key: PropertyKey) => {
  const keysReactions = TargetKeysReactions.get(target)
  if (keysReactions) {
    const reactions = keysReactions.get(key)
    if (reactions) {
      reactions.forEach((reaction) => {
        if (isBatching()) {
          if (!PendingReactions.has(reaction)) {
            PendingReactions.add(reaction)
          }
        } else {
          reaction()
        }
      })
    }
  }
}

export const addDependencyForOperation = (operation: IOperation) => {
  let { key, type, target } = operation
  if (type === 'iterate') {
    key = ITERATION_KEY
  }
  addDependenciesToCurrentReaction(target, key)
}

export const queueReactionsForOperation = (operation: IOperation) => {
  let { key, type, target } = operation
  notify(operation)
  runReactions(target, key)
  if (type === 'add' || type === 'delete' || type === 'clear') {
    key = Array.isArray(target) ? 'length' : ITERATION_KEY
    runReactions(target, key)
  }
}

export const hasRunningReaction = () => {
  return ReactionStack.length > 0
}

export const disposeBindingReaction = (reaction: Reaction) => {
  const keysReactions = ReactionKeysReactions.get(reaction)
  if (keysReactions) {
    keysReactions.forEach((reactions) => {
      reactions.delete(reaction)
    })
  }
  ReactionKeysReactions.delete(reaction)
}

export const batchStart = () => {
  BatchCount.value++
}

export const batchEnd = (callback?: () => void) => {
  BatchCount.value--
  if (BatchCount.value === 0) {
    if (isFn(callback)) callback()
  }
}

export const isBatching = () => BatchCount.value > 0

export const excutePendingReactions = () => {
  PendingReactions.forEach((reaction) => reaction())
}
