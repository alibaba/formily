import type { Component } from 'vue'
import { merge } from '@formily/shared'
import { h } from '@formily/vue'
import { isVue2 } from 'vue-demi'

type ListenersTransformRules = Record<string, string>

export const getComponentByTag = <T extends Record<string, any>>(
  tag: any,
  transformRules?: ListenersTransformRules,
  defaultProps?: Partial<T>
): Component<T> | any => {
  if (isVue2) {
    return {
      functional: true,
      render(h, context) {
        const data = context.data
        if (transformRules) {
          const listeners = transformRules
          Object.keys(listeners).forEach((extract) => {
            if (data.on !== undefined) {
              data.on[listeners[extract]] = context.listeners[extract]
            }
          })
        }
        if (defaultProps) {
          data.props = merge(defaultProps, data.props)
        }
        return h(tag, data, context.children)
      },
    }
  } else {
    return {
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
          return h(tag, attrs, slots)
        }
      },
    }
  }
}
