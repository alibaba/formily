import { computed, inject, provide, ref } from 'vue-demi'
import { GeneralField, isVoidField } from '@formily/core'
import { FormPath } from '@formily/shared'
import { observer } from '@formily/reactive-vue'
import { toJS } from '@formily/reactive'
import { SchemaOptionsSymbol, FieldSymbol } from '../shared'
import h from '../shared/h'
import { useAttach } from '../hooks/useAttach'
import { Fragment } from '../shared/fragment'

import type {
  IReactiveFieldProps,
  VueComponent,
  VueComponentProps,
  DefineComponent,
} from '../types'
import { useField, useForm } from '..'

function isVueOptions(options: any) {
  if (!options) {
    return false
  }
  return (
    typeof options.template === 'string' ||
    typeof options.render === 'function' ||
    typeof options.setup === 'function'
  )
}

const mergeChildren = (
  field: GeneralField,
  slots: Record<string, any>,
  content: any
) => {
  if (!Object.keys(slots).length && !content) return {}

  const originDefaultSlot = slots.default

  const defaultSlot = () =>
    originDefaultSlot?.({ field, form: field.form }) ?? []

  if (typeof content === 'string') {
    slots['default'] = () => [...defaultSlot(), content]
  } else if (isVueOptions(content) || typeof content === 'function') {
    // scoped slot for class component
    if (isVueOptions(content) && content?.render?.length > 1) {
      slots['default'] = (scopedProps: VueComponentProps<any>) => [
        ...defaultSlot(),
        h(content, { props: scopedProps }, {}),
      ]
    } else {
      slots['default'] = () => [...defaultSlot(), h(content, {}, {})]
    }
  } else if (content && typeof content === 'object') {
    // for named slots
    Object.keys(content).forEach((key) => {
      const child = content[key]
      const slot = slots?.[key] ? slots?.[key]() : []
      if (typeof child === 'string') {
        slots[key] = () => [...slot, child]
      } else if (isVueOptions(child) || typeof child === 'function') {
        // scoped slot for class component
        if (isVueOptions(child) && child?.render?.length > 1) {
          slots[key] = (scopedProps: VueComponentProps<any>) => [
            ...slot,
            h(child, { props: scopedProps }, {}),
          ]
        } else {
          slots[key] = () => [...slot, h(child, {}, {})]
        }
      }
    })
  } else {
    slots['default'] = defaultSlot
  }

  return slots
}

export default observer({
  name: 'ReactiveField',
  props: {
    fieldType: {
      type: String,
      default: 'Field',
    },
    fieldProps: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: IReactiveFieldProps, { slots }) {
    const formRef = useForm()
    const parentRef = useField()
    const optionsRef = inject(SchemaOptionsSymbol, ref(null))
    const key = Math.floor(Date.now() * Math.random()).toString(16)
    const fieldRef = useAttach(
      computed(() =>
        formRef?.value?.[`create${props.fieldType}`]?.({
          ...props.fieldProps,
          basePath: props.fieldProps?.basePath ?? parentRef.value?.address,
        })
      )
    )
    provide(FieldSymbol, fieldRef)

    return () => {
      const field = fieldRef.value
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
            const decorator = (FormPath.getIn(
              optionsRef.value?.components,
              field.decorator[0]
            ) ?? field.decorator[0]) as VueComponent
            const decoratorData = toJS(field.decorator[1]) || {}
            const style = decoratorData?.style
            const classes = decoratorData?.class
            delete decoratorData.style
            delete decoratorData.class
            return {
              default: () =>
                h(
                  decorator,
                  {
                    style,
                    class: classes,
                    attrs: {
                      ...decoratorData,
                    },
                  },
                  {
                    default: () => childNodes,
                  }
                ),
            }
          }
        }

        const renderComponent = () => {
          if (!field?.component?.[0]) {
            return slots.default?.({
              field: field,
              form: field.form,
            })
          }

          const component = (FormPath.getIn(
            optionsRef.value?.components,
            field.component[0]
          ) ?? field.component[0]) as VueComponent
          const originData = toJS(field.component[1]) || {}
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

          const style = originData?.style
          const classes = originData?.class
          delete originData.style
          delete originData.class
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
            attrs,
            style,
            class: classes,
            on: events,
          }

          const componentChildren = mergeChildren(
            field,
            {
              ...slots,
            },
            field.content
          )

          return h(component, componentData, componentChildren)
        }

        children = renderDecorator([renderComponent()])
      }

      return h(Fragment, { key }, children)
    }
  },
} as unknown as DefineComponent<IReactiveFieldProps>)
