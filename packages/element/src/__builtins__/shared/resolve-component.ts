import { h, toRaw } from 'vue-demi'
import { Component } from 'vue'

export const resolveComponent = (child?: Component | string) => {
  if (child) {
    return typeof child === 'string' ? child : h(toRaw(child))
  }
}
