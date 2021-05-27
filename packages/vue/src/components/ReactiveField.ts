import { VueComponent } from '../types'
import { defineComponent, DefineComponent } from 'vue-demi'
import { isVoidField } from '@formily/core'
import { clone } from '@formily/shared'
import { observer } from '@formily/reactive-vue'

import h from '../shared/h'
import { Fragment } from '../shared/fragment'

interface IReactiveFieldProps {
  field: Formily.Core.Types.GeneralField
}

export default observer(
  defineComponent<IReactiveFieldProps>({
    name: 'ReactiveField',
    // eslint-disable-next-line vue/require-prop-types
    props: ['field'],
    setup(props: IReactiveFieldProps, { slots }) {
      // const { track } = useObserver()
      const key = Math.floor(Date.now() * Math.random()).toString(16)
      return () => {
        const field = props.field
        let children = {}
        if (!field) {
          children = slots
        } else if (field.display !== 'visible') {
          children = {
            ...slots,
            default: () => [h('template', {}, {})],
          }
        } else {
          const renderDecorator = (childNodes: any[]) => {
            if (!field?.decorator?.[0]) {
              return {
                default: () => childNodes,
              }
            } else {
              const decorator = field.decorator[0] as VueComponent
              const decoratorData = field.decorator[1] || {}
              return {
                default: () =>
                  h(
                    decorator,
                    { attrs: decoratorData },
                    {
                      default: () => childNodes,
                    }
                  ),
              }
            }
          }

          const renderComponent = () => {
            if (!field?.component?.[0]) {
              return h(
                Fragment,
                {},
                {
                  default: () =>
                    slots.default &&
                    slots.default({
                      field: props.field,
                      form: props.field.form,
                    }),
                }
              )
            }

            const component = field.component[0] as VueComponent
            const originData = clone(field.component[1]) || {}
            const events = {} as Record<string, any>
            const originChange = originData['@change'] || originData['onChange']
            const originFocus = originData['@focus'] || originData['onFocus']
            const originBlur = originData['@blur'] || originData['onBlur']

            // '@xxx' has higher priority
            Object.keys(originData)
              .filter((key) => key.startsWith('on'))
              .forEach((eventKey) => {
                const eventName = `${eventKey[2].toLowerCase()}${eventKey.slice(
                  3
                )}`
                events[eventName] = originData[eventKey]
              })

            Object.keys(originData)
              .filter((key) => key.startsWith('@'))
              .forEach((eventKey) => {
                events[eventKey.slice(1)] = originData[eventKey]
                delete originData[eventKey]
              })

            events.change = (...args: any[]) => {
              if (!isVoidField(field)) field.onInput(...args)
              originChange?.(...args)
            }
            events.focus = (...args: any[]) => {
              if (!isVoidField(field)) field.onFocus(...args)
              originFocus?.(...args)
            }
            events.blur = (...args: any[]) => {
              if (!isVoidField(field)) field.onBlur(...args)
              originBlur?.(...args)
            }
            const attrs = {
              disabled: !isVoidField(field)
                ? field.pattern === 'disabled' || field.pattern === 'readPretty'
                : undefined,
              readOnly: !isVoidField(field)
                ? field.pattern === 'readOnly'
                : undefined,
              ...originData,
              value: !isVoidField(field) ? field.value : undefined,
            }
            const componentData = {
              attrs: attrs,
              on: events,
            }
            const children = {
              ...slots,
            }
            if (slots.default) {
              children.default = () =>
                slots.default({
                  field: props.field,
                  form: props.field.form,
                })
            }

            return h(component, componentData, children)
          }

          children = renderDecorator([renderComponent()])
        }

        return h(Fragment, { key }, children)
      }
    },
  }) as unknown as DefineComponent<IReactiveFieldProps>
)
