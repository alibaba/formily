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
      const renderProperties = (field?: GeneralField) => {
        if (props.onlyRenderSelf) return
        const properties = Schema.getOrderProperties(fieldSchemaRef.value)
        if (!properties.length) return
        const children = properties.map(
          ({ schema: item, key: name }, index) => {
            const base = field?.address || basePath
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
            return h(
              RecursionField,
              {
                key: `${index}-${name}`,
                attrs: {
                  schema,
                  name,
                  basePath: base,
                },
              },
              {}
            )
          }
        )

        const slots: Record<string, () => any> = {}
        if (children.length > 0) {
          slots.default = () => [...children]
        }

        return h(Fragment, {}, slots)
      }

      const render = () => {
        if (!isValid(props.name)) return renderProperties()
        if (fieldSchemaRef.value.type === 'object') {
          if (props.onlyRenderProperties) return renderProperties()
          return h(
            ObjectField,
            {
              attrs: {
                ...fieldProps,
                name: props.name,
                basePath: basePath,
              },
            },
            {
              default: ({ field }) => [renderProperties(field)],
            }
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
          if (props.onlyRenderProperties) return renderProperties()
          return h(
            VoidField,
            {
              attrs: {
                ...fieldProps,
                name: props.name,
                basePath: basePath,
              },
            },
            {
              default: (...args) => {
                const { field } = args[0]
                return [renderProperties(field)]
              },
            }
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
