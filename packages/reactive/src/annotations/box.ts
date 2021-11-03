import { ProxyRaw, RawProxy } from '../environment'
import { createAnnotation } from '../internals'
import { buildDataTree } from '../tree'
import {
  bindTargetKeyWithCurrentReaction,
  runReactionsFromTargetKey,
} from '../reaction'

export interface IBox {
  <T>(target: T): { get(): T; set(value: T): void }
}

export const box: IBox = createAnnotation(({ target, key, value }) => {
  const store = {
    value: target ? target[key] : value,
  }

  const proxy = {
    set,
    get,
  }

  ProxyRaw.set(proxy, store)
  RawProxy.set(store, proxy)

  buildDataTree(target, key, store)

  function get() {
    bindTargetKeyWithCurrentReaction({
      target: store,
      key,
      type: 'get',
    })
    return store.value
  }

  function set(value: any) {
    const oldValue = store.value
    store.value = value
    if (oldValue !== value) {
      runReactionsFromTargetKey({
        target: store,
        key,
        type: 'set',
        oldValue,
        value,
      })
    }
  }

  if (target) {
    Object.defineProperty(target, key, {
      value: proxy,
      enumerable: true,
      configurable: false,
      writable: false,
    })
    return target
  }
  return proxy
})
