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
import { stylePrefix } from '../configs'
import { getComponentByTag } from '../shared'

import type { Component } from 'vue'
import type { Button as ElButtonProps } from 'element-ui'
import type { Schema } from '@formily/json-schema'

const ElButton = getComponentByTag<ElButtonProps>('el-button')

interface AdditionProps extends ElButtonProps {
  title?: string
  method?: 'push' | 'unshift'
}

interface Context {
  field: Ref<Formily.Core.Models.ArrayField>
  schema: Ref<Schema>
  keyMap: WeakMap<any, string | number>
}

interface ItemProps {
  index: number
}

const ArrayBaseSymbol: InjectionKey<Context> = Symbol('ArrayBaseContext')
const ItemSymbol: InjectionKey<{
  index: Ref<number>
}> = Symbol('ItemContext')

export const useArray = () => {
  return inject(ArrayBaseSymbol, null)
}

const useIndex = (index?: number) => {
  const ctx = inject(ItemSymbol, null)
  return ctx ? ctx.index : ref(index)
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
  setup(props, { slots }) {
    const field = useField<Formily.Core.Models.ArrayField>()
    const schema = useFieldSchema()
    const keyMap = new WeakMap()
    provide(ArrayBaseSymbol, { field, schema, keyMap })
    return () => {
      return h(FragmentComponent as Component, {}, slots)
    }
  },
})

export const ArrayBaseItem = defineComponent<ItemProps>({
  props: ['index'],
  setup(props, { slots }) {
    provide(ItemSymbol, toRefs(props))
    return () => {
      return h(FragmentComponent as Component, {}, slots)
    }
  },
})

export const ArrayAddition = defineComponent<AdditionProps>({
  props: ['title', 'method'],
  setup(props, { attrs, listeners }) {
    const self = useField()
    const array = useArray()
    const prefixCls = `${stylePrefix}-form-array-base`
    return () => {
      if (array?.field.value.pattern !== 'editable') return null
      return h(
        ElButton,
        {
          class: `${prefixCls}-addition`,
          attrs: {
            type: 'ghost',
            icon: 'qax-icon-Alone-Plus',
            ...attrs,
          },
          on: {
            ...listeners,
            click: () => {
              const defaultValue = getDefaultValue(
                attrs.defaultValue,
                array?.schema.value
              )
              if (props.method === 'unshift') {
                array?.field?.value.unshift(defaultValue)
              } else {
                array?.field?.value.push(defaultValue)
              }
              array.keyMap.set(defaultValue, uid())
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
  ElButtonProps & { title?: string; index?: number }
>({
  props: ['title', 'index'],
  setup(props, { attrs, listeners }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-form-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        ElButton,
        {
          class: `${prefixCls}-remove`,
          attrs: {
            type: 'text',
            icon: props.title ? undefined : 'qax-icon-Trash',
            ...attrs,
          },
          on: {
            ...listeners,
            click: () => {
              base?.field.value.remove(indexRef.value as number)
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
  ElButtonProps & { title?: string; index?: number }
>({
  props: ['title', 'index'],
  setup(props, { attrs, listeners }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-form-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        ElButton,
        {
          class: `${prefixCls}-move-down`,
          attrs: {
            type: 'text',
            icon: props.title ? undefined : 'qax-icon-Angle-down',
            ...attrs,
          },
          on: {
            ...listeners,
            click: () => {
              base?.field.value.moveDown(indexRef.value as number)
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
  ElButtonProps & { title?: string; index?: number }
>({
  props: ['title', 'index'],
  setup(props, { attrs, listeners }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-form-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        ElButton,
        {
          class: `${prefixCls}-move-up`,
          attrs: {
            type: 'text',
            icon: props.title ? undefined : 'qax-icon-Angle-up',
            ...attrs,
          },
          on: {
            ...listeners,
            click: () => {
              base?.field.value.moveUp(indexRef.value as number)
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
