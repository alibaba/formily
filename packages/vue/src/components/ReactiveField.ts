import { VueComponent } from '../types'
import { defineComponent } from 'vue-demi'
import { isVoidField } from '@formily/core'
import { observer } from '@formily/reactive-vue'

import h from '../shared/h'
import { Fragment } from '../shared/fragment'

interface IReactiveFieldProps {
  field: Formily.Core.Types.GeneralField
}

export default observer<IReactiveFieldProps>(defineComponent<IReactiveFieldProps>({
  name: 'ReactiveField',
  // eslint-disable-next-line vue/require-prop-types
  props: (['field'] as any),
  setup(props: IReactiveFieldProps, { slots }) {
    // const { track } = useObserver()
    const key = Math.floor(Date.now() * Math.random()).toString(16)
    return () => {
      const field = props.field
      let children = {}
      if (!field) {
        children = slots
      } else if (field.display !== 'visible') {
        children = { default: () => [h('template', {}, {})] }
      } else {
        const renderDecorator = (childNodes: any[]) => {
          if (!field?.decorator?.[0]) {
            return {
              default: () => childNodes
            }
          } else {
            const decorator = field.decorator[0] as VueComponent
            const decoratorData = field.decorator[1] || {}
            return {
              default: () => h( decorator, { attrs: decoratorData },
                {
                  default: () => childNodes
                }
              )
            }
          }
        }

        const renderComponent = () => {
          if (!field?.component?.[0]) {
            return h(Fragment, {}, {
              default: () => slots.default && slots.default({
                field: props.field,
                form: props.field.form
              })
            })
          }
          const events = {} as Record<string, any>
          events.change = (...args: any[]) => {
            if (!isVoidField(field)) field.onInput(...args)
            field.component[1]?.onChange?.(...args)
          }
          events.focus = (...args: any[]) => {
            if (!isVoidField(field)) field.onFocus(...args)
            field.component[1]?.onFocus?.(...args)
          }
          events.blur = (...args: any[]) => {
            if (!isVoidField(field)) field.onBlur(...args)
            field.component[1]?.onBlur?.(...args)
          }
          const component = field.component[0] as VueComponent
          const originData = field.component[1] || {}
          const componentData =  {
            disabled: !isVoidField(field)
              ? field.pattern === 'disabled' || field.pattern === 'readPretty'
              : undefined,
            readOnly: !isVoidField(field)
              ? field.pattern === 'readOnly'
              : undefined,
            ...originData,
            value: !isVoidField(field) ? field.value : undefined,
          }
          return h(
            component,
            {
              attrs: componentData,
              on: events
            },
            {
              default: () => slots.default && slots.default({
                field: props.field,
                form: props.field.form
              })
            }
          )
        }

        children = renderDecorator([renderComponent()])
      }

      return h(Fragment, { key }, children)
    }
  }
}))
