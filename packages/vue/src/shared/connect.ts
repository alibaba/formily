import { isVue2, markRaw, defineComponent, getCurrentInstance } from 'vue-demi'
import { isFn, isStr, FormPath, each } from '@formily/shared'
import { isVoidField, GeneralField } from '@formily/core'
import { observer } from '@formily/reactive-vue'

import { useField } from '../hooks/useField'
import h from './h'

import type {
  VueComponent,
  IComponentMapper,
  IStateMapper,
  VueComponentProps,
} from '../types'

export function mapProps<T extends VueComponent = VueComponent>(
  ...args: IStateMapper<VueComponentProps<T>>[]
) {
  const transform = (input: VueComponentProps<T>, field: GeneralField) =>
    args.reduce((props, mapper) => {
      if (isFn(mapper)) {
        props = Object.assign(props, mapper(props, field))
      } else {
        each(mapper, (to, extract) => {
          const extractValue = FormPath.getIn(field, extract)
          const targetValue = isStr(to) ? to : extract
          if (extract === 'value') {
            if (to !== extract) {
              delete props['value']
            }
          }
          FormPath.setIn(props, targetValue, extractValue)
        })
      }
      return props
    }, input)

  return (target: T) => {
    /* istanbul ignore else */
    if (isVue2) {
      return defineComponent<VueComponentProps<T>>({
        functional: true,
        name: target.name ? `Connected${target.name}` : `ConnectedComponent`,
        render(createElement, context) {
          const fieldRef = useField()
          const { data } = context
          const attrs = fieldRef.value
            ? transform(
                { ...data.attrs, ...data.props } as VueComponentProps<T>,
                fieldRef.value
              )
            : { ...data.attrs, ...data.props }
          return createElement(target, { ...data, attrs }, context.children)
        },
      })
    } else {
      return observer(
        defineComponent({
          name: target.name ? `Connected${target.name}` : `ConnectedComponent`,
          setup(props, { attrs, slots }) {
            const fieldRef = useField()
            return () => {
              const newAttrs = fieldRef.value
                ? transform(
                    { ...attrs } as VueComponentProps<T>,
                    fieldRef.value
                  )
                : { ...attrs }
              return h(
                target,
                {
                  attrs: newAttrs,
                },
                slots
              )
            }
          },
        })
      )
    }
  }
}

export function mapReadPretty<T extends VueComponent, C extends VueComponent>(
  component: C,
  readPrettyProps?: Record<string, any>
) {
  return (target: T) => {
    return observer(
      defineComponent({
        name: target.name ? `Read${target.name}` : `ReadComponent`,
        setup(props, { attrs, slots, listeners }: Record<string, any>) {
          const fieldRef = useField()
          return () => {
            const field = fieldRef.value
            return h(
              field && !isVoidField(field) && field.pattern === 'readPretty'
                ? component
                : target,
              {
                attrs: {
                  ...readPrettyProps,
                  ...attrs,
                },
                on: listeners,
              },
              slots
            )
          }
        },
      })
    )
  }
}

export function connect<T extends VueComponent>(
  target: T,
  ...args: IComponentMapper[]
): T {
  const Component = args.reduce((target: VueComponent, mapper) => {
    return mapper(target)
  }, target)
  /* istanbul ignore else */
  if (isVue2) {
    const functionalComponent = defineComponent({
      functional: true,
      name: target.name,
      render(h, context) {
        return h(Component, context.data, context.children)
      },
    })
    return markRaw(functionalComponent) as T
  } else {
    const functionalComponent = defineComponent({
      name: target.name,
      setup(props, { attrs, slots }) {
        return () => {
          return h(Component, { props, attrs }, slots)
        }
      },
    })
    return markRaw(functionalComponent) as T
  }
}
