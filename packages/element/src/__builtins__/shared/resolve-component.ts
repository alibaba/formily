import { h, toRaw } from '@vue/composition-api'
import { Component, VNode } from 'vue'

export const resolveComponent = (
  child?:
    | Component
    | string
    | number
    | boolean
    | ((...args: any[]) => VNode[] | VNode),
  props?: Record<string, any>
) => {
  if (child) {
    if (
      typeof child === 'string' ||
      typeof child === 'number' ||
      typeof child === 'boolean'
    ) {
      return child
    } else if (typeof child === 'function') {
      return (child as Function)(props)
    } else {
      return h(toRaw(child), { props })
    }
  }

  return null
}
