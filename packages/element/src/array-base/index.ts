import {
  defineComponent,
  provide,
  InjectionKey,
  Ref,
  inject,
  toRefs,
  ref,
} from '@vue/composition-api'
import { Fragment, useField, useFieldSchema, h } from '@formily/vue'
import { isValid, uid, clone } from '@formily/shared'
import { ArrayField } from '@formily/core'
import { stylePrefix } from '../__builtins__/configs'

import type { Button as ButtonProps } from 'element-ui'
import { Button } from 'element-ui'
import type { Schema } from '@formily/json-schema'
import { HandleDirective } from 'vue-slicksort'
import { composeExport } from '../__builtins__/shared'

export interface IArrayBaseAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift'
  defaultValue?: any
}

export type ArrayBaseMixins = {
  Addition?: typeof ArrayBaseAddition
  Remove?: typeof ArrayBaseRemove
  MoveUp?: typeof ArrayBaseMoveUp
  MoveDown?: typeof ArrayBaseMoveDown
  SortHandle?: typeof ArrayBaseSortHandle
  Index?: typeof ArrayBaseIndex
  useArray?: typeof useArray
  useIndex?: typeof useIndex
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
const ItemSymbol: InjectionKey<Ref<number>> = Symbol('ItemContext')

const useArray = () => {
  return inject(ArrayBaseSymbol, null)
}

const useIndex = (index?: number) => {
  const indexRef = inject(ItemSymbol)
  return indexRef ?? ref(index)
}

const useKey = () => {
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
  if (isValid(defaultValue)) return clone(defaultValue)
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

const ArrayBaseInner = defineComponent({
  name: 'ArrayBase',
  props: ['disabled'],
  setup(props: IArrayBaseProps, { slots, listeners }) {
    const field = useField<ArrayField>()
    const schema = useFieldSchema()

    provide(ArrayBaseSymbol, { field, schema, props, listeners })
    return () => {
      return h(Fragment, {}, slots)
    }
  },
})

const ArrayBaseItem = defineComponent({
  name: 'ArrayBaseItem',
  props: ['index'],
  setup(props: IArrayBaseItemProps, { slots }) {
    const { index } = toRefs(props)
    provide(ItemSymbol, index)
    return () => {
      return h(Fragment, {}, slots)
    }
  },
})

const ArrayBaseSortHandle = defineComponent({
  name: 'ArrayBaseSortHandle',
  props: ['index'],
  directives: {
    handle: HandleDirective,
  },
  setup(props, { attrs }) {
    const array = useArray()
    const prefixCls = `${stylePrefix}-array-base`

    return () => {
      if (!array) return null
      if (array.field.value?.pattern !== 'editable') return null

      return h(
        Button,
        {
          directives: [{ name: 'handle' }],
          class: [`${prefixCls}-sort-handle`],
          attrs: {
            size: 'mini',
            type: 'text',
            icon: 'el-icon-rank',
            ...attrs,
          },
        },
        {}
      )
    }
  },
})

const ArrayBaseIndex = defineComponent({
  name: 'ArrayBaseIndex',
  setup(props, { attrs }) {
    const index = useIndex()
    return () => {
      return h(
        'span',
        {
          attrs,
        },
        {
          default: () => [`#${index.value + 1}.`],
        }
      )
    }
  },
})

const ArrayBaseAddition = defineComponent({
  name: 'ArrayBaseAddition',
  props: ['title', 'method', 'defaultValue'],
  setup(props: IArrayBaseAdditionProps, { listeners }) {
    const self = useField()
    const array = useArray()
    const prefixCls = `${stylePrefix}-array-base`
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

const ArrayBaseRemove = defineComponent<
  ButtonProps & { title?: string; index?: number }
>({
  name: 'ArrayBaseRemove',
  props: ['title', 'index'],
  setup(props, { attrs, listeners }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        Button,
        {
          class: `${prefixCls}-remove`,
          attrs: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-delete',
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

const ArrayBaseMoveDown = defineComponent<
  ButtonProps & { title?: string; index?: number }
>({
  name: 'ArrayBaseMoveDown',
  props: ['title', 'index'],
  setup(props, { attrs, listeners }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        Button,
        {
          class: `${prefixCls}-move-down`,
          attrs: {
            size: 'mini',
            type: 'text',
            icon: 'el-icon-arrow-down',
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

const ArrayBaseMoveUp = defineComponent<
  ButtonProps & { title?: string; index?: number }
>({
  name: 'ArrayBaseMoveUp',
  props: ['title', 'index'],
  setup(props, { attrs, listeners }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        Button,
        {
          class: `${prefixCls}-move-up`,
          attrs: {
            size: 'mini',
            type: 'text',
            icon: 'el-icon-arrow-up',
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

export const ArrayBase = composeExport(ArrayBaseInner, {
  Index: ArrayBaseIndex,
  Item: ArrayBaseItem,
  SortHandle: ArrayBaseSortHandle,
  Addition: ArrayBaseAddition,
  Remove: ArrayBaseRemove,
  MoveDown: ArrayBaseMoveDown,
  MoveUp: ArrayBaseMoveUp,
  useArray: useArray,
  useIndex: useIndex,
  useKey: useKey,
})
