import { isFn } from './checkers'
import { IOperation, ReactionsMap, Reaction, PropertyKey } from './types'
import {
  ReactionStack,
  PendingScopeReactions,
  RawReactionsMap,
  PendingReactions,
  BatchCount,
  UntrackCount,
  BatchScope,
  ObserverListeners,
} from './environment'

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
      reactions.add(reaction)
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

const addReactionsMapToReaction = (
  reaction: Reaction,
  reactionsMap: ReactionsMap
) => {
  const bindSet = reaction._reactionsSet
  if (bindSet) {
    bindSet.add(reactionsMap)
  } else {
    reaction._reactionsSet = new Set([reactionsMap])
  }
  return bindSet
}

const getReactionsFromTargetKey = (target: any, key: PropertyKey) => {
  const reactionsMap = RawReactionsMap.get(target)
  const reactions = []
  if (reactionsMap) {
    const map = reactionsMap.get(key)
    if (map) {
      map.forEach((reaction) => {
        if (reactions.indexOf(reaction) === -1) {
          reactions.push(reaction)
        }
      })
    }
  }
  return reactions
}

const runReactions = (target: any, key: PropertyKey) => {
  const reactions = getReactionsFromTargetKey(target, key)
  for (let i = 0, len = reactions.length; i < len; i++) {
    const reaction = reactions[i]
    if (reaction._isComputed) {
      reaction._scheduler(reaction)
    } else if (isScopeBatching()) {
      PendingScopeReactions.add(reaction)
    } else if (isBatching()) {
      PendingReactions.add(reaction)
    } else {
      if (isFn(reaction._scheduler)) {
        reaction._scheduler(reaction)
      } else {
        reaction()
      }
    }
  }
}

const notifyObservers = (operation: IOperation) => {
  ObserverListeners.forEach((fn) => fn(operation))
}

export const bindTargetKeyWithCurrentReaction = (operation: IOperation) => {
  let { key, type, target } = operation
  if (type === 'iterate') {
    key = ITERATION_KEY
  }

  const current = ReactionStack[ReactionStack.length - 1]
  if (isUntracking()) return
  if (current) {
    addReactionsMapToReaction(current, addRawReactionsMap(target, key, current))
  }
}

export const bindComputedReactions = (reaction: Reaction) => {
  if (isFn(reaction)) {
    const current = ReactionStack[ReactionStack.length - 1]
    if (current) {
      const computes = current._computesSet
      if (computes) {
        computes.add(reaction)
      } else {
        current._computesSet = new Set([reaction])
      }
    }
  }
}

export const suspendComputedReactions = (reaction: Reaction) => {
  const computes = reaction._computesSet
  if (computes) {
    computes.forEach((reaction) => {
      const reactions = getReactionsFromTargetKey(
        reaction._context,
        reaction._property
      )
      if (reactions.length === 0) {
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
    const newKey = Array.isArray(target) ? 'length' : ITERATION_KEY
    runReactions(target, newKey)
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
    executePendingReactions()
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

export const executePendingReactions = () => {
  PendingReactions.forEach((reaction) => {
    PendingReactions.delete(reaction)
    if (isFn(reaction._scheduler)) {
      reaction._scheduler(reaction)
    } else {
      reaction()
    }
  })
}

export const hasDepsChange = (newDeps: any[], oldDeps: any[]) => {
  if (newDeps === oldDeps) return false
  if (newDeps.length !== oldDeps.length) return true
  if (newDeps.some((value, index) => value !== oldDeps[index])) return true
  return false
}

export const disposeEffects = (reaction: Reaction) => {
  if (reaction._effects) {
    try {
      batchStart()
      reaction._effects.queue.forEach((item) => {
        if (!item || !item.dispose) return
        item.dispose()
      })
    } finally {
      batchEnd()
    }
  }
}
