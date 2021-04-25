/* eslint-disable vue/one-component-per-file */
import { Vue2Component, FunctionalComponentOptions } from '../types/vue2'
import { isVue2, markRaw, defineComponent } from 'vue-demi'
import { isFn, isStr, FormPath, each } from '@formily/shared'
import { isVoidField } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { VueComponent, IComponentMapper, IStateMapper, VueComponentProps } from '../types'
import { useField } from '../hooks/useField'
import h from './h'

export function mapProps<T extends VueComponent = VueComponent>(...args: IStateMapper<VueComponentProps<T>>[]) {
  return (target: T) => {
    return observer<VueComponentProps<T>>(defineComponent<VueComponentProps<T>>({
      // listeners is needed for vue2
      setup(props, { attrs, slots, listeners }: Record<string, any>) {
        const fieldRef = useField()

        const transform = (input: VueComponentProps<T>, field: Formily.Core.Types.GeneralField) => args.reduce(
          (props, mapper) => {
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
          },
          input
        )

        return () => {
          const newAttrs = transform({ ...attrs } as VueComponentProps<T>, fieldRef.value)
          return h(
            target,
            {
              attrs: {
                ...newAttrs
              },
              on: listeners
            },
            slots
          )
        }
      },
    }))
  }
}

export function mapReadPretty<T extends VueComponent, C extends VueComponent>(component: C) {
  return (target: T) => {
    return observer<VueComponentProps<T>>(defineComponent({
      setup(props, { attrs, slots, listeners }: Record<string, any>) {
        const fieldRef = useField()
        return () =>
          h(
            !isVoidField(fieldRef.value) && fieldRef.value.pattern === 'readPretty'
              ? component
              : target,
            {
              attrs: {
                ...attrs,
              },
              on: listeners
            },
            slots
          )
      },
    }))
  }
}

export function connect<T extends VueComponent>(target: T, ...args: IComponentMapper[]) {

  const Component = args.reduce((target: VueComponent, mapper) => {
    return mapper(target)
  }, target)

  if (isVue2) {
    const functionalComponent = {
      functional: true,
      render(h, context) {
        return h((Component as Vue2Component), context.data, context.children)
      }
    } as FunctionalComponentOptions
    return markRaw(functionalComponent)
  }  else {
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
