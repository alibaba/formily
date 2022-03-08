import { inject, provide, Ref, ref, shallowRef, watch } from 'vue-demi'
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

function isVueOptions(options: Record<string, unknown>) {
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
  if (childNodes.length > 1) {
    return h(Fragment, {}, { default: () => childNodes })
  }
  return childNodes[0]
}

const resolveComponent = (render: () => unknown[], extra?: any) => {
  if (extra === undefined || extra === null) {
    return render
  }
  if (typeof extra === 'string') {
    return () => [...render(), extra]
  }
  // not component
  if (!isVueOptions(extra) && typeof extra !== 'function') {
    return render
  }
  // for scoped slot
  if (extra.length > 1 || extra?.render?.length > 1) {
    return (scopedProps: VueComponentProps<any>) => [
      ...render(),
      h(extra, { props: scopedProps }, {}),
    ]
  }
  return () => [...render(), h(extra, {}, {})]
}

const mergeSlots = (
  field: GeneralField,
  slots: Record<string, any>,
  content: any
): Record<string, (...args: any) => any[]> => {
  const slotNames = Object.keys(slots)
  if (!slotNames.length) {
    if (!content) {
      return {}
    }
    if (typeof content === 'string') {
      return {
        default: resolveComponent(() => [], content),
      }
    }
  }
  const patchSlot = (slotName: string) => () =>
    slots[slotName]?.({ field, form: field.form }) ?? []
  const patchedSlots: Record<string, (...args: any) => unknown[]> = {}
  slotNames.forEach((name) => {
    patchedSlots[name] = patchSlot(name)
  })

  // for named slots
  if (content && typeof content === 'object' && !isVueOptions(content)) {
    Object.keys(content).forEach((key) => {
      const child = content[key]
      const slot = patchedSlots[key] ?? (() => [])
      patchedSlots[key] = resolveComponent(slot, child)
    })
    return patchedSlots
  }
  // maybe default slot is empty
  patchedSlots['default'] = resolveComponent(
    patchedSlots['default'] ?? (() => []),
    content
  )
  return patchedSlots
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
    const createField = () =>
      formRef?.value?.[`create${props.fieldType}`]?.({
        ...props.fieldProps,
        basePath: props.fieldProps?.basePath ?? parentRef.value?.address,
      })
    const fieldRef = shallowRef(createField()) as Ref<GeneralField>
    watch(
      () => props.fieldProps,
      () => (fieldRef.value = createField())
    )
    useAttach(fieldRef)
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
        if (!field.componentType) return wrapFragment(mergedSlots?.default?.())

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
