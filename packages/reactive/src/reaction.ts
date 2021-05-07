import { isFn } from './checkers'
import {
  IOperation,
  IChange,
  ReactionsMap,
  Reaction,
  PropertyKey,
} from './types'
import {
  ReactionStack,
  PendingScopeReactions,
  RawReactionsMap,
  PendingReactions,
  BatchCount,
  UntrackCount,
  ProxyRaw,
  RawNode,
  BatchScope,
} from './environment'
import { concat } from './concat'

const ITERATION_KEY = Symbol('iteration key')

const addRawReactionsMap = (
  target: any,
  key: PropertyKey,
  reaction: Reaction
) => {
  const reactionsMap = RawReactionsMap.get(target)
  if (reactionsMap) {
    const reactions = reactionsMap.get(key)
    if (reactions) {
      if (!reactions.has(reaction)) {
        reactions.add(reaction)
      }
    } else {
      reactionsMap.set(key, new Set([reaction]))
    }
    return reactionsMap
  } else {
    const reactionsMap: ReactionsMap = new Map([[key, new Set([reaction])]])
    RawReactionsMap.set(target, reactionsMap)
    return reactionsMap
  }
}

const addReactionsMaptoReaction = (
  reaction: Reaction,
  reactionsMap: ReactionsMap
) => {
  const bindSet = reaction._reactionsSet
  if (bindSet) {
    if (!bindSet.has(reactionsMap)) {
      bindSet.add(reactionsMap)
    }
  } else {
    reaction._reactionsSet = new Set([reactionsMap])
  }
  return bindSet
}

const getReactionsFromTargetKey = (target: any, key: PropertyKey) => {
  const reactionsMap = RawReactionsMap.get(target)
  const reactions = new Set<Reaction>()
  if (reactionsMap) {
    reactionsMap.get(key)?.forEach((reaction) => {
      if (!reactions.has(reaction)) {
        reactions.add(reaction)
      }
    })
  }
  return reactions
}

const runReactions = (target: any, key: PropertyKey) => {
  const reactions = getReactionsFromTargetKey(target, key)
  reactions.forEach((reaction) => {
    if (reaction._isComputed) {
      reaction._scheduler(reaction)
    } else if (isScopeBatching()) {
      if (!PendingScopeReactions.has(reaction)) {
        PendingScopeReactions.add(reaction)
      }
    } else if (isBatching()) {
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
    const getChange = () => {
      return {
        get path() {
          return concat(targetNode.path, operation.key)
        },
        type: operation.type,
        key: operation.key,
        value: operation.value,
        oldValue: operation.oldValue,
      }
    }
    if (oldValueNode && operation.type === 'set') {
      oldValueNode.observers.forEach((fn) => fn(getChange()))
      oldValueNode.deepObservers.forEach((fn) => fn(getChange()))
      if (newValueNode) {
        newValueNode.observers = oldValueNode.observers
        newValueNode.deepObservers = oldValueNode.deepObservers
      }
    }
    if (oldValueNode && operation.type === 'delete') {
      oldValueNode.observers = []
      oldValueNode.deepObservers = []
    }
    targetNode.observers.forEach((fn) => fn(getChange()))
    targetNode.deepObservers.forEach((fn) => fn(getChange()))
    let parent = targetNode.parent
    while (!!parent) {
      parent.deepObservers.forEach((fn) => fn(getChange()))
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
  if (isUntracking()) return
  if (current) {
    addReactionsMaptoReaction(current, addRawReactionsMap(target, key, current))
  }
}

export const bindComputedReactions = (reaction: Reaction) => {
  if (isFn(reaction)) {
    const current = ReactionStack[ReactionStack.length - 1]
    if (current) {
      const computeds = current._computedsSet
      if (computeds) {
        if (!computeds.has(reaction)) {
          computeds.add(reaction)
        }
      } else {
        current._computedsSet = new Set([reaction])
      }
    }
  }
}

export const suspendComputedReactions = (reaction: Reaction) => {
  const computeds = reaction._computedsSet
  if (computeds) {
    computeds.forEach((reaction) => {
      const reactions = getReactionsFromTargetKey(
        reaction._context,
        reaction._property
      )
      if (reactions.size === 0) {
        disposeBindingReactions(reaction)
        reaction._dirty = true
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
  const bindingSet = reaction._reactionsSet
  if (bindingSet) {
    bindingSet.forEach((reactionsMap) => {
      reactionsMap.forEach((reactions) => {
        reactions.delete(reaction)
      })
    })
  }
  delete reaction._reactionsSet
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

export const batchScopeStart = () => {
  BatchScope.value = true
}

export const batchScopeEnd = () => {
  BatchScope.value = false
  PendingScopeReactions.forEach((reaction) => {
    PendingScopeReactions.delete(reaction)
    if (isFn(reaction._scheduler)) {
      reaction._scheduler(reaction)
    } else {
      reaction()
    }
  })
}

export const untrackStart = () => {
  UntrackCount.value++
}

export const untrackEnd = () => {
  UntrackCount.value--
}

export const isBatching = () => BatchCount.value > 0

export const isScopeBatching = () => BatchScope.value

export const isUntracking = () => UntrackCount.value > 0

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
