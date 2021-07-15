import {
  defineComponent,
  provide,
  InjectionKey,
  Ref,
  inject,
  toRefs,
  ref,
} from 'vue-demi'
import { FragmentComponent, useField, useFieldSchema, h } from '@formily/vue'
import { isValid, uid } from '@formily/shared'
import { ArrayField } from '@formily/core'
import { stylePrefix } from '../__builtins__/configs'

import type { Component } from 'vue'
import type { Button as ButtonProps } from 'element-ui'
import { Button } from 'element-ui'
import type { Schema } from '@formily/json-schema'

export interface IArrayBaseAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift'
  defaultValue?: any
}

export interface IArrayBaseProps {
  disabled?: boolean
}

export interface IArrayBaseItemProps {
  index: number
}

export interface IArrayBaseContext {
  field: Ref<ArrayField>
  schema: Ref<Schema>
  props: IArrayBaseProps
  listeners: {
    [key in string]?: Function
  }
}

const ArrayBaseSymbol: InjectionKey<IArrayBaseContext> =
  Symbol('ArrayBaseContext')
const ItemSymbol: InjectionKey<{
  index: Ref<number>
}> = Symbol('ItemContext')

export const useArray = () => {
  return inject(ArrayBaseSymbol, null)
}

export const useIndex = (index?: number) => {
  const ctx = inject(ItemSymbol, null)
  return ctx ? ctx.index : ref(index)
}

export const useKey = () => {
  const keyMap = new WeakMap()

  return (record: any) => {
    record =
      record === null || typeof record !== 'object' ? Object(record) : record
    if (!keyMap.has(record)) {
      keyMap.set(record, uid())
    }
    return keyMap.get(record)
  }
}

const getDefaultValue = (defaultValue: any, schema: Schema): any => {
  if (isValid(defaultValue)) return defaultValue
  if (Array.isArray(schema?.items))
    return getDefaultValue(defaultValue, schema.items[0])
  if (schema?.items?.type === 'array') return []
  if (schema?.items?.type === 'boolean') return true
  if (schema?.items?.type === 'date') return ''
  if (schema?.items?.type === 'datetime') return ''
  if (schema?.items?.type === 'number') return 0
  if (schema?.items?.type === 'object') return {}
  if (schema?.items?.type === 'string') return ''
  return null
}

export const ArrayBase = defineComponent({
  props: ['disabled'],
  setup(props: IArrayBaseProps, { slots, listeners }) {
    const field = useField<ArrayField>()
    const schema = useFieldSchema()

    provide(ArrayBaseSymbol, { field, schema, props, listeners })
    return () => {
      return h(FragmentComponent as Component, {}, slots)
    }
  },
})

export const ArrayBaseItem = defineComponent({
  props: ['index'],
  setup(props: IArrayBaseItemProps, { slots }) {
    provide(ItemSymbol, toRefs(props))
    return () => {
      return h(FragmentComponent as Component, {}, slots)
    }
  },
})

export const ArrayIndex = defineComponent({
  setup(props, { attrs }) {
    const index = useIndex()
    return () =>
      h(
        'span',
        {
          attrs,
        },
        {
          default: () => [`#${index.value + 1}.`],
        }
      )
  },
})

export const ArrayAddition = defineComponent({
  props: ['title', 'method', 'defaultValue'],
  setup(props: IArrayBaseAdditionProps, { listeners }) {
    const self = useField()
    const array = useArray()
    const prefixCls = `${stylePrefix}-form-array-base`
    return () => {
      if (!array) return null
      if (array?.field.value.pattern !== 'editable') return null
      return h(
        Button,
        {
          class: `${prefixCls}-addition`,
          attrs: {
            type: 'ghost',
            icon: 'qax-icon-Alone-Plus',
            ...props,
          },
          on: {
            ...listeners,
            click: (e) => {
              if (array.props?.disabled) return
              const defaultValue = getDefaultValue(
                props.defaultValue,
                array?.schema.value
              )
              if (props.method === 'unshift') {
                array?.field?.value.unshift(defaultValue)
                array.listeners?.add?.(0)
              } else {
                array?.field?.value.push(defaultValue)
                array.listeners?.add?.(array?.field?.value?.value?.length - 1)
              }
              if (listeners.click) {
                listeners.click(e)
              }
            },
          },
        },
        {
          default: () => [self.value.title || props.title],
        }
      )
    }
  },
})

export const ArrayRemove = defineComponent<
  ButtonProps & { title?: string; index?: number }
>({
  props: ['title', 'index'],
  setup(props, { attrs, listeners }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-form-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        Button,
        {
          class: `${prefixCls}-remove`,
          attrs: {
            type: 'text',
            size: 'mini',
            icon: props.icon ? undefined : 'el-icon-delete',
            ...attrs,
          },
          on: {
            ...listeners,
            click: (e: MouseEvent) => {
              e.stopPropagation()
              base?.field.value.remove(indexRef.value as number)
              base?.listeners?.remove?.(indexRef.value as number)

              if (listeners.click) {
                listeners.click(e)
              }
            },
          },
        },
        {
          default: () => [props.title],
        }
      )
    }
  },
})

export const ArrayMoveDown = defineComponent<
  ButtonProps & { title?: string; index?: number }
>({
  props: ['title', 'index'],
  setup(props, { attrs, listeners }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-form-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        Button,
        {
          class: `${prefixCls}-move-down`,
          attrs: {
            size: 'mini',
            type: 'text',
            icon: props.icon ? undefined : 'el-icon-arrow-down',
            ...attrs,
          },
          on: {
            ...listeners,
            click: (e: MouseEvent) => {
              e.stopPropagation()
              base?.field.value.moveDown(indexRef.value as number)
              base?.listeners?.moveDown?.(indexRef.value as number)

              if (listeners.click) {
                listeners.click(e)
              }
            },
          },
        },
        {
          default: () => [props.title],
        }
      )
    }
  },
})

export const ArrayMoveUp = defineComponent<
  ButtonProps & { title?: string; index?: number }
>({
  props: ['title', 'index'],
  setup(props, { attrs, listeners }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-form-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        Button,
        {
          class: `${prefixCls}-move-up`,
          attrs: {
            size: 'mini',
            type: 'text',
            icon: props.icon ? undefined : 'el-icon-arrow-up',
            ...attrs,
          },
          on: {
            ...listeners,
            click: (e: MouseEvent) => {
              e.stopPropagation()
              base?.field.value.moveUp(indexRef.value as number)
              base?.listeners?.moveUp?.(indexRef.value as number)

              if (listeners.click) {
                listeners.click(e)
              }
            },
          },
        },
        {
          default: () => [props.title],
        }
      )
    }
  },
})
