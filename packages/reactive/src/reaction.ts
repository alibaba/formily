import { isFn } from '@formily/shared'
import {
  IOperation,
  IChange,
  KeysReactions,
  Reaction,
  PropertyKey,
} from './types'
import {
  ReactionStack,
  TargetKeysReactions,
  ReactionKeysReactions,
  PendingReactions,
  BatchCount,
  Untracking,
  ProxyRaw,
  RawNode,
} from './environment'

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
  if (Untracking.value) return
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

export const publishToAllObservers = (operation: IOperation) => {
  const targetNode = RawNode.get(
    ProxyRaw.get(operation.target) || operation.target
  )
  const oldValueNode = RawNode.get(
    ProxyRaw.get(operation.oldValue) || operation.oldValue
  )
  const newValueNode = RawNode.get(
    ProxyRaw.get(operation.value) || operation.value
  )
  if (targetNode) {
    const change: IChange = {
      path: targetNode.path.concat(operation.key),
      type: operation.type,
      key: operation.key,
      value: operation.value,
      oldValue: operation.oldValue,
    }
    if (oldValueNode && operation.type === 'set') {
      oldValueNode.observers.forEach((fn) => fn(change))
      oldValueNode.deepObservers.forEach((fn) => fn(change))
      if (newValueNode) {
        newValueNode.observers = oldValueNode.observers
        newValueNode.deepObservers = oldValueNode.deepObservers
      }
    }
    if (oldValueNode && operation.type === 'delete') {
      oldValueNode.observers = new Set()
      oldValueNode.deepObservers = new Set()
    }
    targetNode.observers.forEach((fn) => fn(change))
    targetNode.deepObservers.forEach((fn) => fn(change))
    let parent = targetNode.parent
    while (!!parent) {
      parent.deepObservers.forEach((fn) => fn(change))
      parent = parent.parent
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
  publishToAllObservers(operation)
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
  PendingReactions.clear()
}
