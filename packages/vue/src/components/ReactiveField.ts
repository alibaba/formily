import { defineObservableComponent } from '../utils/define-observable-component'
import { isVoidField } from '@formily/core'
import { VNode, Component } from 'vue'
import h from '../utils/compatible-create-element'

interface IReactiveFieldProps {
  field: Formily.Core.Types.GeneralField
}

export default defineObservableComponent({
  name: 'ReactiveField',
  // eslint-disable-next-line vue/require-prop-types
  props: ['field'],
  observableSetup(collect, props: IReactiveFieldProps, { slots }) {
    const field = props.field
    collect({
      field
    })
    return () => {
      if (!field) {
        return h('div', {}, slots)
      }
      if (field.display !== 'visible') {
        return ''
      } else {
        const renderDecorator = (children: VNode[]) => {
          if (!field?.decorator?.[0]) {
            return h('div', {}, {
              default: () => children
            })
          }
          const decorator = field.decorator[0] as Component
          const decoratorData = field.decorator[1] || {}
          return h(
            decorator,
            {
              props: decoratorData
            },
            {
              default: () => children
            }
          )
        }

        const renderComponent = () => {
          if (!field?.component?.[0]) {
            return h('div', {}, {
              default: () => slots.default && slots.default({
                field: props.field,
                form: props.field.form
              })
            })
          }
          const value = !isVoidField(field) ? field.value : undefined
          const onChange = !isVoidField(field) ? field.onInput : undefined
          const onFocus = !isVoidField(field) ? field.onFocus : undefined
          const onBlur = !isVoidField(field) ? field.onBlur : undefined
          const disabled = !isVoidField(field)
            ? field.pattern === 'disabled' || field.pattern === 'readPretty'
            : undefined
          const readOnly = !isVoidField(field)
            ? field.pattern === 'readOnly'
            : undefined
          const component = field.component[0] as Component
          const originData = field.component[1] || {}
          const componentData = {
            ...originData,
            value,
            disabled,
            readOnly
          }
          return h(
            component,
            {
              props: componentData,
              on: {
                change: onChange,
                focus: onFocus,
                blur: onBlur
              }
            },
            {
              default: () => slots.default && slots.default({
                field: props.field,
                form: props.field.form
              })
            }
          )
        }
        return renderDecorator([renderComponent()])
      }
    }
  }
})