import {
  ObModelSymbol,
  PendingComputedReactions,
  PendingScopeComputedReactions,
  ReactionStack,
} from '../environment'
import { createAnnotation } from '../internals'
import { buildDataTree } from '../tree'
import { isFn } from '../checkers'
import {
  bindTargetKeyWithCurrentReaction,
  runReactionsFromTargetKey,
  bindComputedReactions,
  hasRunningReaction,
  isUntracking,
  batchStart,
  batchEnd,
  releaseBindingReactions,
  getReactionsFromTargetKey,
} from '../reaction'
import { Reaction } from '../types'

interface IValue<T = any> {
  value?: T
}
export interface IComputed {
  <T>(compute: () => T): IValue<T>
  <T>(compute: { get?: () => T; set?: (value: T) => void }): IValue<T>
}

const getDescriptor = Object.getOwnPropertyDescriptor

const getProto = Object.getPrototypeOf

const ClassDescriptorSymbol = Symbol('ClassDescriptorSymbol')

function getPropertyDescriptor(obj: any, key: PropertyKey) {
  if (!obj) return
  return getDescriptor(obj, key) || getPropertyDescriptor(getProto(obj), key)
}

function getPropertyDescriptorCache(obj: any, key: PropertyKey) {
  const constructor = obj.constructor
  if (constructor === Object || constructor === Array)
    return getPropertyDescriptor(obj, key)
  const cache = constructor[ClassDescriptorSymbol] || {}
  const descriptor = cache[key]
  if (descriptor) return descriptor
  const newDesc = getPropertyDescriptor(obj, key)
  constructor[ClassDescriptorSymbol] = cache
  cache[key] = newDesc
  return newDesc
}

function getPrototypeDescriptor(
  target: any,
  key: PropertyKey,
  value: any
): PropertyDescriptor {
  if (!target) {
    if (value) {
      if (isFn(value)) {
        return { get: value }
      } else {
        return value
      }
    }
    return {}
  }
  const descriptor = getPropertyDescriptorCache(target, key)
  if (descriptor) {
    return descriptor
  }
  return {}
}

const isAllComputedDeps = (reaction: Reaction) => {
  if (!reaction._isComputed) return false
  const deps = getReactionsFromTargetKey(reaction._context, reaction._property)
  if (!deps.length) return true
  return deps.every((dep) => isAllComputedDeps(dep))
}

export const computed: IComputed = createAnnotation(
  ({ target, key, value }) => {
    const store: IValue = {}

    const proxy = {}

    const context = target ? target : store
    const property = target ? key : 'value'
    const descriptor = getPrototypeDescriptor(target, property, value)

    function compute() {
      store.value = descriptor.get?.call(context)
    }
    function reaction() {
      if (ReactionStack.indexOf(reaction) === -1) {
        releaseBindingReactions(reaction)
        try {
          ReactionStack.push(reaction)
          compute()
        } finally {
          ReactionStack.pop()
        }
      }
    }

    reaction._name = 'ComputedReaction'
    reaction._scheduler = () => {
      if (!reaction._dirty) {
        runReactionsFromTargetKey({
          target: context,
          key: property,
          value: store.value,
          type: 'set',
        })
        return
      }

      const deps = getReactionsFromTargetKey(context, property)

      if (!deps.length) return

      if (deps.every((dep) => isAllComputedDeps(dep))) {
        // all deps are computed reactions, so should dirty the upstream computed reactions
        runReactionsFromTargetKey({
          target: context,
          key: property,
          value: store.value,
          type: 'set',
        })
        return
      }

      const currentValue = store.value
      reaction()
      reaction._dirty = false
      const newValue = store.value
      if (newValue !== currentValue) {
        runReactionsFromTargetKey({
          target: context,
          key: property,
          value: store.value,
          type: 'set',
        })
      }
    }

    reaction._isComputed = true
    // is need to re calculate
    reaction._dirty = true
    reaction._context = context
    reaction._property = property

    function get() {
      if (hasRunningReaction()) {
        bindComputedReactions(reaction)
      }
      if (!isUntracking()) {
        //如果允许untracked过程中收集依赖，那么永远不会存在绑定，因为_dirty已经设置为false
        if (reaction._dirty) {
          // if the value is used in batch function, it will directly execute and set dirty to false
          const currentValue = store.value
          reaction()
          reaction._dirty = false
          const newValue = store.value
          if (newValue !== currentValue) {
            // if the value is changed, it should be scheduled
            PendingComputedReactions.update(reaction)
            PendingScopeComputedReactions.update(reaction)
          }
        }
        bindTargetKeyWithCurrentReaction({
          target: context,
          key: property,
          type: 'get',
        })
        return store.value
      }

      return descriptor.get?.call(context)
    }

    function set(value: any) {
      try {
        batchStart()
        descriptor.set?.call(context, value)
      } finally {
        batchEnd()
      }
    }
    if (target) {
      Object.defineProperty(target, key, {
        get,
        set,
        enumerable: true,
      })
      return target
    } else {
      Object.defineProperty(proxy, 'value', {
        set,
        get,
      })
      buildDataTree(target, key, store)
      proxy[ObModelSymbol] = store
    }
    return proxy
  }
)
