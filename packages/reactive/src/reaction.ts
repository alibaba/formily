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
  ReactionComputeds,
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
      if (!reactions.has(reaction)) {
        reactions.add(reaction)
      }
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

const getReactionsFromTargetKey = (target: any, key: PropertyKey) => {
  const keysReactions = TargetKeysReactions.get(target)
  const reactions = new Set<Reaction>()
  if (keysReactions) {
    keysReactions.get(key)?.forEach((reaction) => {
      reactions.add(reaction)
    })
  }
  return reactions
}

const runReactions = (target: any, key: PropertyKey) => {
  const reactions = getReactionsFromTargetKey(target, key)
  reactions.forEach((reaction) => {
    if (isBatching()) {
      if (!PendingReactions.has(reaction)) {
        PendingReactions.add(reaction)
      }
    } else {
      if (isFn(reaction._scheduler)) {
        reaction._scheduler(reaction)
      } else {
        reaction()
      }
    }
  })
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

export const bindComputedReactions = (reaction: Reaction) => {
  if (isFn(reaction)) {
    const current = ReactionStack[ReactionStack.length - 1]
    if (current) {
      const computeds = ReactionComputeds.get(current)
      if (computeds) {
        if (!computeds.has(reaction)) {
          computeds.add(reaction)
        }
      } else {
        ReactionComputeds.set(current, new Set([reaction]))
      }
    }
  }
}

export const suspendComputedReactions = (reaction: Reaction) => {
  const computeds = ReactionComputeds.get(reaction)
  if (computeds) {
    computeds.forEach((reaction) => {
      const reactions = getReactionsFromTargetKey(
        reaction._context,
        reaction._property
      )
      if (reactions.size === 0) {
        disposeBindingReactions(reaction)
        reaction._active = false
      }
    })
  }
}

export const runReactionsFromTargetKey = (operation: IOperation) => {
  let { key, type, target, oldTarget } = operation
  notifyObservers(operation)
  if (type === 'clear') {
    oldTarget.forEach((_: any, key: PropertyKey) => {
      runReactions(target, key)
    })
  } else {
    runReactions(target, key)
  }
  if (type === 'add' || type === 'delete' || type === 'clear') {
    key = Array.isArray(target) ? 'length' : ITERATION_KEY
    runReactions(target, key)
  }
}

export const hasRunningReaction = () => {
  return ReactionStack.length > 0
}

export const releaseBindingReactions = (reaction: Reaction) => {
  const bindingSet = ReactionKeysReactions.get(reaction)
  if (bindingSet) {
    bindingSet.forEach((keysReactions) => {
      keysReactions.forEach((reactions) => {
        reactions.delete(reaction)
      })
    })
  }
  ReactionKeysReactions.delete(reaction)
}

export const disposeBindingReactions = (reaction: Reaction) => {
  releaseBindingReactions(reaction)
  suspendComputedReactions(reaction)
}

export const batchStart = () => {
  BatchCount.value++
}

export const batchEnd = () => {
  BatchCount.value--
  if (BatchCount.value === 0) {
    excutePendingReactions()
  }
}

export const isBatching = () => BatchCount.value > 0

export const excutePendingReactions = () => {
  PendingReactions.forEach((reaction) => {
    PendingReactions.delete(reaction)
    if (isFn(reaction._scheduler)) {
      reaction._scheduler(reaction)
    } else {
      reaction()
    }
  })
}
