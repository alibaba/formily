import {
  bindTargetKeyWithCurrentReaction,
  runReactionsFromTargetKey,
} from './reaction'
import { ProxyRaw, RawProxy } from './environment'
import { isObservable, isSupportObservable } from './externals'
import { createObservable } from './internals'

const wellKnownSymbols = new Set(
  Object.getOwnPropertyNames(Symbol)
    .map((key) => Symbol[key])
    .filter((value) => typeof value === 'symbol')
)

const hasOwnProperty = Object.prototype.hasOwnProperty

function findObservable(target: any, key: PropertyKey, value: any) {
  const observableObj = RawProxy.get(value)
  if (observableObj) {
    return observableObj
  }
  if (!isObservable(value) && isSupportObservable(value)) {
    return createObservable(target, key, value)
  }
  return value
}

function patchIterator(
  target: any,
  key: PropertyKey,
  iterator: IterableIterator<any>,
  isEntries: boolean
) {
  const originalNext = iterator.next
  iterator.next = () => {
    let { done, value } = originalNext.call(iterator)
    if (!done) {
      if (isEntries) {
        value[1] = findObservable(target, key, value[1])
      } else {
        value = findObservable(target, key, value)
      }
    }
    return { done, value }
  }
  return iterator
}

const instrumentations = {
  has(key: PropertyKey) {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as any
    bindTargetKeyWithCurrentReaction({ target, key, type: 'has' })
    return proto.has.apply(target, arguments)
  },
  get(key: PropertyKey) {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as any
    bindTargetKeyWithCurrentReaction({ target, key, type: 'get' })
    return findObservable(target, key, proto.get.apply(target, arguments))
  },
  add(key: PropertyKey) {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as any
    const hadKey = proto.has.call(target, key)
    // forward the operation before queueing reactions
    const result = proto.add.apply(target, arguments)
    if (!hadKey) {
      runReactionsFromTargetKey({ target, key, value: key, type: 'add' })
    }
    return result
  },
  set(key: PropertyKey, value: any) {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as any
    const hadKey = proto.has.call(target, key)
    const oldValue = proto.get.call(target, key)
    // forward the operation before queueing reactions
    const result = proto.set.apply(target, arguments)
    if (!hadKey) {
      runReactionsFromTargetKey({ target, key, value, type: 'add' })
    } else if (value !== oldValue) {
      runReactionsFromTargetKey({ target, key, value, oldValue, type: 'set' })
    }
    return result
  },
  delete(key: PropertyKey) {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as any
    const hadKey = proto.has.call(target, key)
    const oldValue = proto.get ? proto.get.call(target, key) : undefined
    // forward the operation before queueing reactions
    const result = proto.delete.apply(target, arguments)
    if (hadKey) {
      runReactionsFromTargetKey({ target, key, oldValue, type: 'delete' })
    }
    return result
  },
  clear() {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as any
    const hadItems = target.size !== 0
    const oldTarget = target instanceof Map ? new Map(target) : new Set(target)
    // forward the operation before queueing reactions
    const result = proto.clear.apply(target, arguments)
    if (hadItems) {
      runReactionsFromTargetKey({ target, oldTarget, type: 'clear' })
    }
    return result
  },
  forEach(cb: any, ...args: any[]) {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as any
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    // swap out the raw values with their observable pairs
    // before passing them to the callback
    const wrappedCb = (value: any, key: PropertyKey, ...args: any) =>
      cb(findObservable(target, key, value), key, ...args)
    return proto.forEach.call(target, wrappedCb, ...args)
  },
  keys() {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as any
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    return proto.keys.apply(target, arguments)
  },
  values() {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as any
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    const iterator = proto.values.apply(target, arguments)
    return patchIterator(target, '', iterator, false)
  },
  entries() {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this) as any
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    const iterator = proto.entries.apply(target, arguments)
    return patchIterator(target, '', iterator, true)
  },
  [Symbol.iterator]() {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this)
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    const iterator = proto[Symbol.iterator].apply(target, arguments)
    return patchIterator(target, '', iterator, target instanceof Map)
  },
  get size() {
    const target = ProxyRaw.get(this)
    const proto = Reflect.getPrototypeOf(this)
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    return Reflect.get(proto, 'size', target)
  },
}

export const collectionHandlers = {
  get(target: any, key: PropertyKey, receiver: any) {
    // instrument methods and property accessors to be reactive
    target = hasOwnProperty.call(instrumentations, key)
      ? instrumentations
      : target
    return Reflect.get(target, key, receiver)
  },
}

export const baseHandlers: ProxyHandler<any> = {
  get(target, key, receiver) {
    if (!key) return
    const result = target[key] // use Reflect.get is too slow
    if (typeof key === 'symbol' && wellKnownSymbols.has(key)) {
      return result
    }
    bindTargetKeyWithCurrentReaction({ target, key, receiver, type: 'get' })
    const observableResult = RawProxy.get(result)
    if (observableResult) {
      return observableResult
    }
    if (!isObservable(result) && isSupportObservable(result)) {
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key)
      if (
        !descriptor ||
        !(descriptor.writable === false && descriptor.configurable === false)
      ) {
        return createObservable(target, key, result)
      }
    }
    return result
  },
  has(target, key) {
    const result = Reflect.has(target, key)
    bindTargetKeyWithCurrentReaction({ target, key, type: 'has' })
    return result
  },
  ownKeys(target) {
    const keys = Reflect.ownKeys(target)
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    return keys
  },
  set(target, key, value, receiver) {
    const hadKey = hasOwnProperty.call(target, key)
    const newValue = createObservable(target, key, value)
    const oldValue = target[key]
    target[key] = newValue // use Reflect.set is too slow
    if (!hadKey) {
      runReactionsFromTargetKey({
        target,
        key,
        value: newValue,
        oldValue,
        receiver,
        type: 'add',
      })
    } else if (value !== oldValue) {
      runReactionsFromTargetKey({
        target,
        key,
        value: newValue,
        oldValue,
        receiver,
        type: 'set',
      })
    }
    return true
  },
  deleteProperty(target, key) {
    const oldValue = target[key]
    delete target[key]
    runReactionsFromTargetKey({
      target,
      key,
      oldValue,
      type: 'delete',
    })
    return true
  },
}
