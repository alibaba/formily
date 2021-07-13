import { Vue2Component } from '../types/vue2'
import { isVue2, markRaw, defineComponent } from 'vue-demi'
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
  DefineComponent,
} from '../types'

export function mapProps<T extends VueComponent = VueComponent>(
  ...args: IStateMapper<VueComponentProps<T>>[]
) {
  return (target: T) => {
    return observer(
      defineComponent<VueComponentProps<T>>({
        // listeners is needed for vue2
        setup(props, { attrs, slots, listeners }: Record<string, any>) {
          const fieldRef = useField()

          const transform = (
            input: VueComponentProps<T>,
            field: GeneralField
          ) =>
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

          return () => {
            const newAttrs = fieldRef.value
              ? transform({ ...attrs } as VueComponentProps<T>, fieldRef.value)
              : { ...attrs }
            return h(
              target,
              {
                attrs: {
                  ...newAttrs,
                },
                on: listeners,
              },
              slots
            )
          }
        },
      }) as unknown as DefineComponent<VueComponentProps<T>>
    )
  }
}

export function mapReadPretty<T extends VueComponent, C extends VueComponent>(
  component: C,
  readPrettyProps?: Record<string, any>
) {
  return (target: T) => {
    return observer(
      defineComponent({
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
      }) as unknown as DefineComponent<VueComponentProps<T>>
    )
  }
}

export function connect<T extends VueComponent>(
  target: T,
  ...args: IComponentMapper[]
) {
  const Component = args.reduce((target: VueComponent, mapper) => {
    return mapper(target)
  }, target)
  /* istanbul ignore else */
  if (isVue2) {
    const functionalComponent = {
      functional: true,
      render(h, context) {
        return h(Component as Vue2Component, context.data, context.children)
      },
    }
    return markRaw(functionalComponent)
  } else {
    const functionalComponent = defineComponent({
      setup(props: VueComponentProps<T>, { attrs, slots }) {
        return () => {
          return h(Component, { props, attrs }, slots)
        }
      },
    })
    return markRaw(functionalComponent)
  }
}
