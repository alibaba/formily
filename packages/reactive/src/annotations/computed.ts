import { ProxyRaw, RawProxy, ReactionStack } from '../environment'
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
} from '../reaction'

interface IValue<T = any> {
  value?: T
}
export interface IComputed {
  <T>(compute: () => T): IValue<T>
  <T>(compute: { get?: () => T; set?: (value: T) => void }): IValue<T>
}

const getDescriptor = Object.getOwnPropertyDescriptor

const getProto = Object.getPrototypeOf

const ClassDescriptorMap = new WeakMap()

function getPropertyDescriptor(obj: any, key: PropertyKey) {
  if (!obj) return
  return getDescriptor(obj, key) || getPropertyDescriptor(getProto(obj), key)
}

function getPropertyDescriptorCache(obj: any, key: PropertyKey) {
  const constructor = obj.constructor
  if (constructor === Object || constructor === Array)
    return getPropertyDescriptor(obj, key)
  const cache = ClassDescriptorMap.get(constructor) || {}
  const descriptor = cache[key]
  if (descriptor) return descriptor
  const newDesc = getPropertyDescriptor(obj, key)
  ClassDescriptorMap.set(constructor, cache)
  cache[key] = newDesc
  return newDesc
}

function getGetterAndSetter(target: any, key: PropertyKey, value: any) {
  if (!target) {
    if (value) {
      if (isFn(value)) {
        return [value]
      } else {
        return [value.get, value.set]
      }
    }
    return []
  }
  const descriptor = getPropertyDescriptorCache(target, key)
  if (descriptor) {
    return [descriptor.get, descriptor.set]
  }
  return []
}

export const computed: IComputed = createAnnotation(
  ({ target, key, value }) => {
    const store: IValue = {}

    const proxy = {}

    const context = target ? target : store
    const property = target ? key : 'value'
    const [getter, setter] = getGetterAndSetter(target, property, value)

    function compute() {
      store.value = getter?.call(context)
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
      reaction._dirty = true
      runReactionsFromTargetKey({
        target: context,
        key: property,
        value: store.value,
        type: 'set',
      })
    }
    reaction._isComputed = true
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
        setter?.call(context, value)
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
      ProxyRaw.set(proxy, store)
      RawProxy.set(store, proxy)
    }
    return proxy
  }
)
