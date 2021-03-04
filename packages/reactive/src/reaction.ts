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
  ComputedReactions,
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
      keysReactions.set(key, new Set([reaction]))
    }
    return keysReactions
  } else {
    const bindMap: KeysReactions = new Map([[key, new Set([reaction])]])
    TargetKeysReactions.set(target, bindMap)
    return bindMap
  }
}

const addReactionTargetKeys = (
  reaction: Reaction,
  keysReactions: KeysReactions
) => {
  const bindSet = ReactionKeysReactions.get(reaction)
  if (bindSet) {
    if (!bindSet.has(keysReactions)) {
      bindSet.add(keysReactions)
    }
  } else {
    ReactionKeysReactions.set(reaction, new Set([keysReactions]))
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

const notifyObservers = (operation: IOperation) => {
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
      path: targetNode.path.concat(operation.key as any),
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

export const bindTargetKeyWithCurrentReaction = (operation: IOperation) => {
  let { key, type, target } = operation
  if (type === 'iterate') {
    key = ITERATION_KEY
  }
  const current = ReactionStack[ReactionStack.length - 1]
  if (Untracking.value) return
  if (current) {
    addReactionTargetKeys(current, addTargetKeysReactions(target, key, current))
  }
}

export const setComputedReaction = (reaction: Reaction) => {
  if (isFn(reaction)) {
    if (!ComputedReactions.has(reaction)) {
      ComputedReactions.set(reaction, true)
    }
  }
}

export const unsetComputedReaction = (reaction: Reaction) => {
  if (isFn(reaction)) {
    ComputedReactions.delete(reaction)
  }
}

export const isComputedReaction = (reaction: Reaction) => {
  return ComputedReactions.has(reaction)
}

export const runReactionsFromTargetKey = (operation: IOperation) => {
  let { key, type, target } = operation
  notifyObservers(operation)
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
  const bindSet = ReactionKeysReactions.get(reaction)
  if (bindSet) {
    bindSet.forEach((keysReactions) => {
      keysReactions.forEach((reactions) => {
        reactions.delete(reaction)
        if (reactions.size === 1) {
          reactions.forEach((reaction) => {
            if (isComputedReaction(reaction)) {
              unsetComputedReaction(reaction)
              reactions.delete(reaction)
            }
          })
        }
      })
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
