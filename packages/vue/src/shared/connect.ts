/* eslint-disable vue/one-component-per-file */
import { FunctionalComponentOptions } from 'vue'
import { isVue2, markRaw, defineComponent } from 'vue-demi'
import { isFn, isStr, FormPath, each } from '@formily/shared'
import { isVoidField } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { VueComponent, IComponentMapper, IStateMapper, VueComponentProps } from '../types'
import { useField } from '../hooks/useField'
import h from './h'

export function mapProps<T extends VueComponent = VueComponent>(...args: IStateMapper<VueComponentProps<T>>[]) {
  return (target: T) => {
    return observer(defineComponent<T>({
      // listeners is needed for vue2
      setup(props: VueComponentProps<T>, { attrs, slots, listeners }) {
        const field = useField()

        const transform = (input: VueComponentProps<T>) => args.reduce(
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
          const newAttrs = transform({ ...props, ...attrs } as VueComponentProps<T>)
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
    return observer(defineComponent({
      setup(props: VueComponentProps<T>, { attrs, slots }) {
        const field = useField()
        return () =>
          h(
            !isVoidField(field) && field.pattern === 'readPretty'
              ? component
              : target,
            {
              attrs: {
                ...attrs,
                ...props
              },
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
        return h(Component, context.data, context.children)
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
