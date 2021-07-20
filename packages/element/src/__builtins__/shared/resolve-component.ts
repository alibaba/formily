import { h, toRaw } from 'vue-demi'
import { Component, VNode } from 'vue'

export const resolveComponent = (
  child?: Component | string | ((...args: any[]) => VNode[])
) => {
  if (child) {
    if (typeof child === 'string') {
      return child
    } else if (typeof child === 'function') {
      return (child as Function)()
    } else {
      return h(toRaw(child))
    }
  }

  return null
}
