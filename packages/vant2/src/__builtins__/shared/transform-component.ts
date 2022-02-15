import type { Component } from 'vue'
import { merge } from '@formily/shared'
import { h } from '@formily/vue'
import { isVue2, defineComponent } from 'vue-demi'

type ListenersTransformRules = Record<string, string>

export const transformComponent = <T extends Record<string, any>>(
  tag: any,
  transformRules?: ListenersTransformRules,
  defaultProps?: Partial<T>
): Component<T> | any => {
  if (isVue2) {
    return defineComponent({
      setup(props, { attrs, slots, listeners }) {
        return () => {
          const data = {
            attrs: {
              ...attrs,
            },
            on: {
              ...listeners,
            },
          }

          if (transformRules) {
            const transformListeners = transformRules
            Object.keys(transformListeners).forEach((extract) => {
              if (data.on !== undefined) {
                data.on[transformListeners[extract]] = listeners[extract]
              }
            })
          }
          if (defaultProps) {
            data.attrs = merge(defaultProps, data.attrs)
          }

          return h(tag, data, slots)
        }
      },
    })
  } else {
    return defineComponent({
      setup(props, { attrs, slots }) {
        return () => {
          let data = {
            ...attrs,
          }
          if (transformRules) {
            const listeners = transformRules
            Object.keys(listeners).forEach((extract) => {
              const event = listeners[extract]
              data[`on${event[0].toUpperCase()}${event.slice(1)}`] =
                attrs[`on${extract[0].toUpperCase()}${extract.slice(1)}`]
            })
          }
          if (defaultProps) {
            data = merge(defaultProps, data)
          }
          return h(tag, data, slots)
        }
      },
    })
  }
}
