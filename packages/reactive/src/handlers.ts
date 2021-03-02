import {
  addDependencyForOperation,
  queueReactionsForOperation,
} from './reaction'
import { ProxyRaw, RawProxy } from './environment'
import { traverseIn } from './traverse'
import { isSupportObservable } from './shared'

const wellKnownSymbols = new Set(
  Object.getOwnPropertyNames(Symbol)
    .map((key) => Symbol[key])
    .filter((value) => typeof value === 'symbol')
)

const hasOwnProperty = Object.prototype.hasOwnProperty

export const handlers: ProxyHandler<any> = {
  get(target, key, receiver) {
    const result = Reflect.get(target, key, receiver)
    if (typeof key === 'symbol' && wellKnownSymbols.has(key)) {
      return result
    }
    addDependencyForOperation({ target, key, receiver, type: 'get' })
    const observableResult = RawProxy.get(result)
    if (isSupportObservable(result)) {
      if (observableResult) {
        return observableResult
      }
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key)
      if (
        !descriptor ||
        !(descriptor.writable === false && descriptor.configurable === false)
      ) {
        return traverseIn(target, key, result)
      }
    }
    return observableResult || result
  },
  has(target, key) {
    const result = Reflect.has(target, key)
    addDependencyForOperation({ target, key, type: 'has' })
    return result
  },
  ownKeys(target) {
    addDependencyForOperation({ target, type: 'iterate' })
    return Reflect.ownKeys(target)
  },
  set(target, key, value, receiver) {
    const hadKey = hasOwnProperty.call(target, key)
    const newValue = traverseIn(target, key, value)
    const oldValue = target[key]
    const result = Reflect.set(target, key, newValue, receiver)
    if (target !== ProxyRaw.get(receiver)) {
      return result
    }
    if (!hadKey) {
      queueReactionsForOperation({
        target,
        key,
        value: newValue,
        receiver,
        type: 'add',
      })
    } else if (value !== oldValue) {
      queueReactionsForOperation({
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
    const res = Reflect.deleteProperty(target, key)
    const oldValue = target[key]
    queueReactionsForOperation({
      target,
      key,
      oldValue,
      type: 'delete',
    })
    return res
  },
}
