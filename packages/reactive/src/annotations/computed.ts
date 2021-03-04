import { ProxyRaw, RawProxy, ReactionStack } from '../environment'
import { createAnnotation } from '../internals'
import { buildTreeNode } from '../traverse'
import {
  bindTargetKeyWithCurrentReaction,
  runReactionsFromTargetKey,
  bindComputedReactions,
  hasRunningReaction,
} from '../reaction'

export interface IComputed {
  <T>(compute: () => T): { value: T }
  <T>(compute: { get?: () => T; set?: (value: T) => void }): {
    value: T
  }
}

export const computed: IComputed = createAnnotation(
  ({ target, key, value }) => {
    const store = {
      value: undefined,
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
    const getter = target
      ? Reflect.getOwnPropertyDescriptor(target, key)?.get
      : value
    const setter = target
      ? Reflect.getOwnPropertyDescriptor(target, key)?.set
      : value?.set

    function compute() {
      const oldValue = store.value
      store.value = getter?.call?.(context)
      if (oldValue === store.value) return
      runReactionsFromTargetKey({
        target: context,
        key: property,
        oldValue,
        value: store.value,
      })
    }

    function reaction() {
      try {
        ReactionStack.push(reaction)
        compute()
      } finally {
        ReactionStack.pop()
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
      setter?.call?.(context, value)
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
