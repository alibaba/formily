import { ProxyRaw, RawProxy } from '../environment'
import { createAnnotation } from '../internals'
import { buildTreeNode } from '../traverse'
import {
  addDependencyForOperation,
  queueReactionsForOperation,
} from '../reaction'

export const box = createAnnotation(({ target, key, value }) => {
  const store = {
    value: value,
  }
  
  const proxy = {
    set,
    get,
  }

  ProxyRaw.set(proxy, store)
  RawProxy.set(store, proxy)

  buildTreeNode({
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
    return store.value
  }

  function set(value: any) {
    const oldValue = store.value
    store.value = value
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
