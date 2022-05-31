import { inject, provide, watch, shallowRef, computed, markRaw } from 'vue-demi'
import { GeneralField } from '@formily/core'
import { isFn, isValid } from '@formily/shared'
import { Schema } from '@formily/json-schema'
import {
  SchemaSymbol,
  SchemaOptionsSymbol,
  SchemaExpressionScopeSymbol,
} from '../shared'
import { useField } from '../hooks'
import ObjectField from './ObjectField'
import ArrayField from './ArrayField'
import Field from './Field'
import VoidField from './VoidField'
import { h } from '../shared/h'
import { Fragment } from '../shared/fragment'

import type { IRecursionFieldProps, DefineComponent } from '../types'

const resolveEmptySlot = (slots: Record<any, (...args: any[]) => any[]>) => {
  return Object.keys(slots).length ? h(Fragment, {}, slots) : undefined
}

const RecursionField = {
  name: 'RecursionField',
  inheritAttrs: false,
  props: {
    schema: {
      required: true,
    },
    name: [String, Number],
    basePath: {},
    onlyRenderProperties: {
      type: Boolean,
      default: undefined,
    },
    onlyRenderSelf: {
      type: Boolean,
      default: undefined,
    },
    mapProperties: {},
    filterProperties: {},
  },
  setup(props: IRecursionFieldProps) {
    const parentRef = useField()
    const optionsRef = inject(SchemaOptionsSymbol)
    const scopeRef = inject(SchemaExpressionScopeSymbol)
    const createSchema = (schemaProp: IRecursionFieldProps['schema']) =>
      markRaw(new Schema(schemaProp))
    const fieldSchemaRef = computed(() => createSchema(props.schema))

    const getPropsFromSchema = (schema: Schema) =>
      schema?.toFieldProps?.({
        ...optionsRef.value,
        get scope() {
          return {
            ...optionsRef.value.scope,
            ...scopeRef.value,
          }
        },
      })
    const fieldPropsRef = shallowRef(getPropsFromSchema(fieldSchemaRef.value))

    watch([fieldSchemaRef, optionsRef], () => {
      fieldPropsRef.value = getPropsFromSchema(fieldSchemaRef.value)
    })

    const getBasePath = () => {
      if (props.onlyRenderProperties) {
        return props.basePath || parentRef?.value?.address.concat(props.name)
      }
      return props.basePath || parentRef?.value?.address
    }

    provide(SchemaSymbol, fieldSchemaRef)

    return () => {
      const basePath = getBasePath()
      const fieldProps = fieldPropsRef.value

      const generateSlotsByProperties = (scoped = false) => {
        if (props.onlyRenderSelf) return {}
        const properties = Schema.getOrderProperties(fieldSchemaRef.value)
        if (!properties.length) return {}
        const renderMap: Record<string, ((field?: GeneralField) => unknown)[]> =
          {}
        const setRender = (
          key: string,
          value: (field?: GeneralField) => unknown
        ) => {
          if (!renderMap[key]) {
            renderMap[key] = []
          }
          renderMap[key].push(value)
        }
        properties.forEach(({ schema: item, key: name }, index) => {
          let schema: Schema = item
          if (isFn(props.mapProperties)) {
            const mapped = props.mapProperties(item, name)
            if (mapped) {
              schema = mapped
            }
          }
          if (isFn(props.filterProperties)) {
            if (props.filterProperties(schema, name) === false) {
              return null
            }
          }
          setRender(schema['x-slot'] ?? 'default', (field?: GeneralField) =>
            h(
              RecursionField,
              {
                key: `${index}-${name}`,
                attrs: {
                  schema,
                  name,
                  basePath: field?.address || basePath,
                },
                slot: schema['x-slot'],
              },
              {}
            )
          )
        })
        const slots = {}
        Object.keys(renderMap).forEach((key) => {
          const renderFns = renderMap[key]
          slots[key] = scoped
            ? ({ field }) => renderFns.map((fn) => fn(field))
            : () => renderFns.map((fn) => fn())
        })
        return slots
      }

      const render = () => {
        if (!isValid(props.name))
          return resolveEmptySlot(generateSlotsByProperties())
        if (fieldSchemaRef.value.type === 'object') {
          if (props.onlyRenderProperties)
            return resolveEmptySlot(generateSlotsByProperties())
          return h(
            ObjectField,
            {
              attrs: {
                ...fieldProps,
                name: props.name,
                basePath: basePath,
              },
            },
            generateSlotsByProperties(true)
          )
        } else if (fieldSchemaRef.value.type === 'array') {
          return h(
            ArrayField,
            {
              attrs: {
                ...fieldProps,
                name: props.name,
                basePath: basePath,
              },
            },
            {}
          )
        } else if (fieldSchemaRef.value.type === 'void') {
          if (props.onlyRenderProperties)
            return resolveEmptySlot(generateSlotsByProperties())
          const slots = generateSlotsByProperties(true)
          return h(
            VoidField,
            {
              attrs: {
                ...fieldProps,
                name: props.name,
                basePath: basePath,
              },
            },
            slots
          )
        }

        return h(
          Field,
          {
            attrs: {
              ...fieldProps,
              name: props.name,
              basePath: basePath,
            },
          },
          {}
        )
      }

      if (!fieldSchemaRef.value) return

      return render()
    }
  },
} as unknown as DefineComponent<IRecursionFieldProps>

export default RecursionField
