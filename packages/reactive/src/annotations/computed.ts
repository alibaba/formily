import { ProxyRaw, RawProxy, ReactionStack } from '../environment'
import { createAnnotation } from '../internals'
import { buildTreeNode } from '../traverse'
import {
  bindTargetKeyWithCurrentReaction,
  batchStart,
  batchEnd,
  runReactionsFromTargetKey,
  setComputedReaction,
  isComputedReaction,
  hasRunningReaction,
} from '../reaction'
import { isFn } from '@formily/shared'

export interface IComputed {
  <T>(compute: () => T): { value: T }
  <T>(compute: { get?: () => T; set?: (value: T) => void }): {
    value: T
  }
}

export const computed: IComputed = createAnnotation(
  ({ target, key, value: params }) => {
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

    function compute(getter: any) {
      if (isFn(getter)) {
        const oldValue = store.value
        store.value = getter.call(context)
        if (oldValue === store.value) return
        runReactionsFromTargetKey({
          target: context,
          key: property,
          oldValue,
          value: store.value,
        })
      } else if (isFn(getter?.get)) {
        compute(getter.get)
      }
    }

    function reaction() {
      try {
        ReactionStack.push(reaction)
        batchStart()
        compute(params)
      } finally {
        batchEnd()
        ReactionStack.pop()
      }
    }

    ProxyRaw.set(proxy, store)
    RawProxy.set(store, proxy)

    buildTreeNode({
      target,
      key,
      value: store,
    })

    function get() {
      if (!isComputedReaction(reaction)) {
        if (hasRunningReaction()) {
          reaction()
          setComputedReaction(reaction)
        } else {
          compute(params)
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
      if (isFn(params.set)) {
        params.set.call(this, value)
      }
    }

    if (target) {
      Object.defineProperty(target, key, {
        get,
        set,
        enumerable: true,
        configurable: false,
      })
    }
    return proxy
  }
)
