import { ProxyRaw, RawProxy, ReactionStack } from '../environment'
import { createAnnotation } from '../internals'
import { buildTreeNode } from '../traverse'
import {
  bindTargetKeyWithCurrentReaction,
  runReactionsFromTargetKey,
  bindComputedReactions,
  hasRunningReaction,
  batchStart,
  batchEnd,
  isBatching,
  isScopeBatching,
} from '../reaction'

export interface IComputed {
  <T>(compute: () => T): { value: T }
  <T>(compute: { get?: () => T; set?: (value: T) => void }): {
    value: T
  }
}

export const computed: IComputed = createAnnotation(
  ({ target, key, value }) => {
    const initialValue = Symbol('initialValue')
    const store = {
      value: initialValue,
    }

    const proxy = {
      set value(value: any) {
        set(value)
      },
      get value() {
        return get()
      },
    }

    const context = target ? target : store
    const property = target ? key : 'value'
    const getter = getGetter(context)
    const setter = getSetter(context)

    function getGetter(target: any) {
      if (!target) {
        if (value?.get) return value?.get
        return value
      }
      const descriptor = Object.getOwnPropertyDescriptor(target, property)
      if (descriptor?.get) return descriptor.get
      return getGetter(Object.getPrototypeOf(target))
    }

    function getSetter(target: any) {
      if (!target) {
        if (value?.set) return value?.set
        return
      }
      const descriptor = Object.getOwnPropertyDescriptor(target, property)
      if (descriptor?.set) return descriptor.set
      return getSetter(Object.getPrototypeOf(target))
    }

    function compute() {
      const oldValue = store.value
      store.value = getter?.call?.(context)
      if (oldValue === store.value || oldValue === initialValue) return
      batchStart()
      runReactionsFromTargetKey({
        target: context,
        key: property,
        oldValue,
        value: store.value,
        type: 'set',
      })
      batchEnd()
    }

    function reaction() {
      if (ReactionStack.indexOf(reaction) === -1) {
        try {
          ReactionStack.push(reaction)
          compute()
        } finally {
          ReactionStack.pop()
        }
      }
    }
    reaction._context = context
    reaction._property = property
    reaction._active = false

    ProxyRaw.set(proxy, store)
    RawProxy.set(store, proxy)

    buildTreeNode({
      target,
      key,
      value: store,
    })

    function get() {
      if (!reaction._active) {
        if (hasRunningReaction()) {
          bindComputedReactions(reaction)
          reaction()
          reaction._active = true
        } else {
          compute()
        }
      } else {
        if (hasRunningReaction()) {
          bindComputedReactions(reaction)
        } else if (isBatching() || isScopeBatching()) {
          compute()
        }
      }
      bindTargetKeyWithCurrentReaction({
        target: context,
        key: property,
        type: 'get',
      })
      return store.value
    }

    function set(value: any) {
      try {
        batchStart()
        setter?.call?.(context, value)
      } finally {
        batchEnd()
      }
    }
    if (target) {
      Object.defineProperty(target, key, {
        get,
        set,
        enumerable: true,
        configurable: false,
      })
      return target
    }
    return proxy
  }
)
