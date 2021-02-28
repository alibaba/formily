import { ProxyRaw, RawProxy } from '../environment'
import { createAnnotation } from '../internals'
import { buildObservableTree } from '../traverse'
import {
  addDependencyForOperation,
  queueReactionsForOperation,
} from '../reaction'

export const ref = createAnnotation(({ target, key, value }) => {
  const store = {
    current: value,
  }
  const proxy = {
    set current(value) {
      set(value)
    },
    get current() {
      return get()
    },
  }

  buildObservableTree({
    target,
    key,
    value: store,
  })

  ProxyRaw.set(proxy, store)
  RawProxy.set(store, proxy)

  function get() {
    addDependencyForOperation({
      target: target ? target : store,
      key: target ? key : 'current',
      type: 'get',
    })
    return store.current
  }

  function set(value: any) {
    const oldValue = store.current
    store.current = value
    if (oldValue !== value) {
      queueReactionsForOperation({
        target: target ? target : store,
        key: target ? key : 'current',
        type: 'set',
        oldValue,
        value,
      })
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
})
