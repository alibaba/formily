import {
  bindTargetKeyWithCurrentReaction,
  runReactionsFromTargetKey,
} from './reaction'
import { getProxyRaw, getRawNode } from './environment'
import { traverseIn } from './traverse'
import { isSupportObservable } from './externals'

const wellKnownSymbols = new Set(
  Object.getOwnPropertyNames(Symbol)
    .map((key) => Symbol[key])
    .filter((value) => typeof value === 'symbol')
)

const hasOwnProperty = Object.prototype.hasOwnProperty

function findObservable(target: any, key: PropertyKey, value: any) {
  const node = getRawNode(value)
  if (isSupportObservable(value)) {
    if (node?.proxy) {
      return node.proxy
    }
    return traverseIn(target, key, value)
  }
  return node?.proxy || value
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
    const target = getProxyRaw(this)
    const proto = Reflect.getPrototypeOf(this) as any
    bindTargetKeyWithCurrentReaction({ target, key, type: 'has' })
    return proto.has.apply(target, arguments)
  },
  get(key: PropertyKey) {
    const target = getProxyRaw(this)
    const proto = Reflect.getPrototypeOf(this) as any
    bindTargetKeyWithCurrentReaction({ target, key, type: 'get' })
    return findObservable(target, key, proto.get.apply(target, arguments))
  },
  add(key: PropertyKey) {
    const target = getProxyRaw(this)
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
    const target = getProxyRaw(this)
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
    const target = getProxyRaw(this)
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
    const target = getProxyRaw(this)
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
    const target = getProxyRaw(this)
    const proto = Reflect.getPrototypeOf(this) as any
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    // swap out the raw values with their observable pairs
    // before passing them to the callback
    const wrappedCb = (value: any, key: PropertyKey, ...args: any) =>
      cb(findObservable(target, key, value), key, ...args)
    return proto.forEach.call(target, wrappedCb, ...args)
  },
  keys() {
    const target = getProxyRaw(this)
    const proto = Reflect.getPrototypeOf(this) as any
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    return proto.keys.apply(target, arguments)
  },
  values() {
    const target = getProxyRaw(this)
    const proto = Reflect.getPrototypeOf(this) as any
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    const iterator = proto.values.apply(target, arguments)
    return patchIterator(target, '', iterator, false)
  },
  entries() {
    const target = getProxyRaw(this)
    const proto = Reflect.getPrototypeOf(this) as any
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    const iterator = proto.entries.apply(target, arguments)
    return patchIterator(target, '', iterator, true)
  },
  [Symbol.iterator]() {
    const target = getProxyRaw(this)
    const proto = Reflect.getPrototypeOf(this)
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    const iterator = proto[Symbol.iterator].apply(target, arguments)
    return patchIterator(target, '', iterator, target instanceof Map)
  },
  get size() {
    const target = getProxyRaw(this)
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
    const result = Reflect.get(target, key, receiver)
    if (typeof key === 'symbol' && wellKnownSymbols.has(key)) {
      return result
    }
    bindTargetKeyWithCurrentReaction({ target, key, receiver, type: 'get' })
    const node = getRawNode(result)
    if (isSupportObservable(result)) {
      if (node?.proxy) {
        return node.proxy
      }
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key)
      if (
        !descriptor ||
        !(descriptor.writable === false && descriptor.configurable === false)
      ) {
        return traverseIn(target, key, result)
      }
    }
    return node?.proxy || result
  },
  has(target, key) {
    const result = Reflect.has(target, key)
    bindTargetKeyWithCurrentReaction({ target, key, type: 'has' })
    return result
  },
  ownKeys(target) {
    bindTargetKeyWithCurrentReaction({ target, type: 'iterate' })
    return Reflect.ownKeys(target)
  },
  set(target, key, value, receiver) {
    const hadKey = hasOwnProperty.call(target, key)
    const newValue = traverseIn(target, key, value)
    const oldValue = target[key]
    const result = Reflect.set(target, key, newValue, receiver)
    if (target !== getProxyRaw(receiver)) {
      return result
    }
    if (!hadKey) {
      runReactionsFromTargetKey({
        target,
        key,
        value: newValue,
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
    return result
  },
  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key)
    const oldValue = target[key]
    runReactionsFromTargetKey({
      target,
      key,
      oldValue,
      type: 'delete',
    })
    return result
  },
}
