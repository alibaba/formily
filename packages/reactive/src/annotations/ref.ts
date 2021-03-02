import { ProxyRaw, RawProxy } from '../environment'
import { createAnnotation } from '../internals'
import { buildObservableTree } from '../traverse'
import {
  addDependencyForOperation,
  queueReactionsForOperation,
} from '../reaction'

export const ref = createAnnotation(({ target, key, value }) => {
  const store = {
    value: value,
  }
  const proxy = {
    set value(value) {
      set(value)
    },
    get value() {
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
      key: target ? key : 'value',
      type: 'get',
    })
    return store.value
  }

  function set(value: any) {
    const oldValue = store.value
    store.value = value
    if (oldValue !== value) {
      queueReactionsForOperation({
        target: target ? target : store,
        key: target ? key : 'value',
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
