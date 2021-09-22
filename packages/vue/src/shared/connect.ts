import { Vue2Component } from '../types/vue2'
import { isVue2, markRaw, defineComponent, ref } from 'vue-demi'
import { isFn, isStr, FormPath, each } from '@formily/shared'
import { isVoidField, GeneralField } from '@formily/core'
import { observer } from '@formily/reactive-vue'

import { FieldSymbol } from '../shared/context'
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
    const getNewAttrs = (field, attrs) =>
      field
        ? transform({ ...attrs } as VueComponentProps<T>, field)
        : { ...attrs }

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

    let beObserveredComponent: VueComponent
    /* istanbul ignore next */
    if (isVue2) {
      beObserveredComponent = {
        inject: {
          fieldRef: {
            from: FieldSymbol,
            default: ref(),
          },
        },
        render(h) {
          return h(
            target,
            {
              attrs: {
                ...getNewAttrs(this.fieldRef.value, { ...this.$attrs }),
              },
              on: this.$listeners,
              scopedSlots: this.$scopedSlots,
            },
            this.$slots.default
          )
        },
      } as unknown as Vue2Component
    } else {
      beObserveredComponent = defineComponent({
        setup(props, { attrs, slots, listeners }: Record<string, any>) {
          const fieldRef = useField()
          return () =>
            h(
              target,
              {
                attrs: {
                  ...getNewAttrs(fieldRef.value, { ...attrs }),
                },
                on: listeners,
              },
              slots
            )
        },
      }) as unknown as DefineComponent<VueComponentProps<T>>
    }
    return observer(beObserveredComponent)
  }
}

export function mapReadPretty<T extends VueComponent, C extends VueComponent>(
  component: C,
  readPrettyProps?: Record<string, any>
) {
  return (target: T) => {
    const getComponent = (field, component, target) =>
      field && !isVoidField(field) && field.pattern === 'readPretty'
        ? component
        : target

    let beObserveredComponent: VueComponent
    /* istanbul ignore else */
    if (isVue2) {
      beObserveredComponent = {
        inject: {
          fieldRef: {
            from: FieldSymbol,
            default: ref(),
          },
        },
        render(h) {
          return h(
            getComponent(this.fieldRef.value, component, target),
            {
              attrs: {
                ...readPrettyProps,
                ...this.$attrs,
              },
              on: this.$listeners,
              scopedSlots: this.$scopedSlots,
            },
            this.$slots.default
          )
        },
      } as unknown as Vue2Component
    } else {
      beObserveredComponent = defineComponent({
        setup(props, { attrs, slots, listeners }: Record<string, any>) {
          const fieldRef = useField()
          return () =>
            h(
              getComponent(fieldRef.value, component, target),
              {
                attrs: {
                  ...readPrettyProps,
                  ...attrs,
                },
                on: listeners,
              },
              slots
            )
        },
      }) as unknown as DefineComponent<VueComponentProps<T>>
    }

    return observer(beObserveredComponent)
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
