import { computed, inject, provide, ref } from 'vue-demi'
import { GeneralField, isVoidField } from '@formily/core'
import { FormPath } from '@formily/shared'
import { observer } from '@formily/reactive-vue'
import { toJS } from '@formily/reactive'
import { SchemaOptionsSymbol, FieldSymbol, h, Fragment } from '../shared'
import { useAttach } from '../hooks/useAttach'
import { useField, useForm } from '../hooks'

import type {
  IReactiveFieldProps,
  VueComponentProps,
  DefineComponent,
} from '../types'
import type { VNode } from 'vue'

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

const wrapFragment = (childNodes: VNode[] | VNode): VNode => {
  if (!Array.isArray(childNodes)) {
    return childNodes
  }
  if (childNodes.length >= 1) {
    return h(Fragment, {}, { default: () => childNodes })
  }
  return childNodes[0]
}

const resolveComponent = (children: unknown[], extract: any) => {
  if (typeof extract === 'string') {
    return () => [...children, extract]
  }
  // not component
  if (!isVueOptions(extract) && typeof extract !== 'function') {
    return
  }
  // for scoped slot
  if (extract.length > 1 || extract?.render?.length > 1) {
    return (scopedProps: VueComponentProps<any>) => [
      ...children,
      h(extract, { props: scopedProps }, {}),
    ]
  }
  return () => [...children, h(extract, {}, {})]
}

const mergeSlots = (
  field: GeneralField,
  slots: Record<string, any>,
  content: any
) => {
  if (!Object.keys(slots).length && !content) return h('template', {}, {})

  const originDefaultSlot = slots.default

  const defaultSlot = () =>
    originDefaultSlot?.({ field, form: field.form }) ?? []

  if (content && typeof content === 'object' && !isVueOptions(content)) {
    const newSlots: Record<string, any> = {}
    // for named slots
    Object.keys(content).forEach((key) => {
      const child = content[key]
      const slot = typeof slots?.[key] === 'function' ? slots[key]() : []
      newSlots[key] = resolveComponent(slot, child)
    })
    return newSlots
  }

  return {
    default: resolveComponent(defaultSlot(), content) ?? defaultSlot,
  }
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
      const options = optionsRef.value
      if (!field) {
        return slots.default?.()
      }
      if (field.display !== 'visible') {
        return h('template', {}, {})
      }

      const mergedSlots = mergeSlots(field, slots, field.content)

      const renderDecorator = (childNodes: any[]) => {
        if (!field.decoratorType) {
          return wrapFragment(childNodes)
        }
        const finalComponent =
          FormPath.getIn(options?.components, field.decoratorType as string) ??
          field.decoratorType
        const componentAttrs = toJS(field.decorator[1]) || {}
        const componentData = {
          attrs: componentAttrs,
          style: componentAttrs?.style,
          class: componentAttrs?.class,
        }
        delete componentData.attrs.style
        delete componentData.attrs.class

        return h(finalComponent, componentData, {
          default: () => childNodes,
        })
      }

      const renderComponent = () => {
        if (!field.componentType) return wrapFragment(mergedSlots.default?.())

        const component =
          FormPath.getIn(options?.components, field.componentType as string) ??
          field.componentType

        const originData = toJS(field.component[1]) || {}
        const events = {} as Record<string, any>
        const originChange = originData['@change'] || originData['onChange']
        const originFocus = originData['@focus'] || originData['onFocus']
        const originBlur = originData['@blur'] || originData['onBlur']

        // '@xxx' has higher priority
        Object.keys(originData)
          .filter((key) => key.startsWith('on'))
          .forEach((eventKey) => {
            const eventName = `${eventKey[2].toLowerCase()}${eventKey.slice(3)}`
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

        const componentData = {
          attrs: {
            disabled: !isVoidField(field)
              ? field.pattern === 'disabled' || field.pattern === 'readPretty'
              : undefined,
            readOnly: !isVoidField(field)
              ? field.pattern === 'readOnly'
              : undefined,
            ...originData,
            value: !isVoidField(field) ? field.value : undefined,
          },
          style: originData?.style,
          class: originData?.class,
          on: events,
        }
        delete componentData.attrs.style
        delete componentData.attrs.class

        return h(component, componentData, mergedSlots)
      }

      return renderDecorator([renderComponent()])
    }
  },
} as unknown as DefineComponent<IReactiveFieldProps>)
