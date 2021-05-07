import { setProxyRaw, setRawNode } from '../environment'
import { createAnnotation } from '../internals'
import { buildTreeNode } from '../traverse'
import {
  bindTargetKeyWithCurrentReaction,
  runReactionsFromTargetKey,
} from '../reaction'

export interface IRef {
  <T>(target: T): { value: T }
}

export const ref: IRef = createAnnotation(({ target, key, value }) => {
  const store = {
    value: target ? target[key] : value,
  }

  const proxy = {}

  const context = target ? target : store
  const property = target ? key : 'value'

  buildTreeNode({
    target,
    key,
    value: store,
  })

  setProxyRaw(proxy, store)
  setRawNode(store, (node) => {
    node.proxy = proxy
  })

  function get() {
    bindTargetKeyWithCurrentReaction({
      target: context,
      key: property,
      type: 'get',
    })
    return store.value
  }

  function set(value: any) {
    const oldValue = store.value
    store.value = value
    if (oldValue !== value) {
      runReactionsFromTargetKey({
        target: context,
        key: property,
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
    return target
  } else {
    Object.defineProperty(proxy, 'value', {
      set,
      get,
    })
  }
  return proxy
})
