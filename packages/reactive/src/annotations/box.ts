import { ProxyRaw, RawProxy } from '../environment'
import { createAnnotation } from '../internals'
import { buildObservableTree } from '../traverse'
import {
  addDependencyForOperation,
  queueReactionsForOperation,
} from '../reaction'

export const box = createAnnotation(({ target, key, value }) => {
  const store = {
    current: value,
  }
  const proxy = {
    set,
    get,
  }
  ProxyRaw.set(proxy, store)
  RawProxy.set(store, proxy)

  buildObservableTree({
    target,
    key,
    value: store,
  })

  function get() {
    addDependencyForOperation({
      target: store,
      key,
      type: 'get',
    })
    return store.current
  }

  function set(value: any) {
    const oldValue = store.current
    store.current = value
    if (oldValue !== value) {
      queueReactionsForOperation({
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
  }
  return proxy
})
