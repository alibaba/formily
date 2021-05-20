import { ProxyRaw, RawProxy, ReactionStack } from '../environment'
import { createAnnotation } from '../internals'
import { buildDataTree } from '../datatree'
import {
  bindTargetKeyWithCurrentReaction,
  runReactionsFromTargetKey,
  bindComputedReactions,
  hasRunningReaction,
  isUntracking,
  batchStart,
  batchEnd,
} from '../reaction'

interface IValue<T = any> {
  value?: T
}
export interface IComputed {
  <T>(compute: () => T): IValue<T>
  <T>(compute: { get?: () => T; set?: (value: T) => void }): IValue<T>
}

export const computed: IComputed = createAnnotation(
  ({ target, key, value }) => {
    const store: IValue = {}

    const proxy = {}

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
      store.value = getter?.call?.(context)
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
    reaction._name = 'ComputedReaction'
    reaction._scheduler = () => {
      reaction._dirty = true
      batchStart()
      runReactionsFromTargetKey({
        target: context,
        key: property,
        value: store.value,
        type: 'set',
      })
      batchEnd()
    }
    reaction._isComputed = true
    reaction._dirty = true
    reaction._context = context
    reaction._property = property

    ProxyRaw.set(proxy, store)
    RawProxy.set(store, proxy)

    buildDataTree(target, key, store)

    function get() {
      if (hasRunningReaction()) {
        bindComputedReactions(reaction)
      }
      if (!isUntracking()) {
        //如果允许untracked过程中收集依赖，那么永远不会存在绑定，因为_dirty已经设置为false
        if (reaction._dirty) {
          reaction()
          reaction._dirty = false
        }
      } else {
        compute()
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
    } else {
      Object.defineProperty(proxy, 'value', {
        set,
        get,
      })
    }
    return proxy
  }
)
