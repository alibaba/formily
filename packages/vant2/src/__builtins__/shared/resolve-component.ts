import { Component } from 'vue'
import { h, toRaw } from '@vue/composition-api'
import { SlotTypes } from '.'
import { isVnode } from './utils'

export const resolveComponent = (
  child?: SlotTypes,
  props?: Record<string, any>
) => {
  if (child) {
    if (typeof child === 'string' || typeof child === 'number') {
      return child
    } else if (typeof child === 'function') {
      return (child as Function)(props)
    } else if (isVnode(child)) {
      return child
    } else {
      return h(toRaw(child as Component), { props })
    }
  }

  return null
}
