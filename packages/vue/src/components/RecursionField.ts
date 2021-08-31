import { inject, provide, watch, defineComponent, shallowRef } from 'vue-demi'
import { GeneralField } from '@formily/core'
import { isFn, isValid } from '@formily/shared'
import { Schema } from '@formily/json-schema'
import { observer } from '@formily/reactive-vue'
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

const RecursionField = observer(
  defineComponent<IRecursionFieldProps>({
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
        new Schema(schemaProp)
      const createFieldSchema = (schema: Schema) =>
        schema.compile?.(scopeRef.value)
      const schemaRef = shallowRef(createSchema(props.schema))
      const fieldSchemaRef = shallowRef(createFieldSchema(schemaRef.value))
      watch([() => props.schema, scopeRef, optionsRef], () => {
        schemaRef.value = createSchema(props.schema)
        fieldSchemaRef.value = createFieldSchema(schemaRef.value)
      })

      const getPropsFromSchema = (schema: Schema) =>
        schema?.toFieldProps?.({ ...optionsRef.value, scope: scopeRef.value })
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
        const xContent = fieldSchemaRef.value['x-content']
        const xContentMap: Record<string, any[]> = {}

        if (typeof xContent === 'string') {
          xContentMap['default'] = [xContent]
        } else if (isVueOptions(xContent) || typeof xContent === 'function') {
          // is vue component or functional component
          xContentMap['default'] = [h(xContent, {}, {})]
        } else if (xContent && typeof xContent === 'object') {
          // for named slots
          Object.keys(xContent).forEach((key) => {
            const child = xContent[key]
            if (typeof child === 'string') {
              xContentMap[key] = [child]
            } else if (isVueOptions(child) || typeof child === 'function') {
              xContentMap[key] = [h(child, {}, {})]
            }
          })
        }

        const getSlots = (children = []) => {
          const slots: Record<string, () => any> = {}

          if (children.length > 0) {
            slots.default = () => [...children]
          }

          Object.keys(xContentMap).forEach((key) => {
            if (key === 'default') {
              slots[key] = () => [...children, ...xContentMap[key]]
            } else {
              slots[key] = () => [...xContentMap[key]]
            }
          })

          return slots
        }

        const renderProperties = (field?: GeneralField) => {
          if (props.onlyRenderSelf) return
          const children = fieldSchemaRef.value.mapProperties(
            (item, name, index) => {
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
                  key: index,
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
          const allSlots = getSlots(children)
          if (allSlots.default) {
            slots.default = allSlots.default
          }

          return h(Fragment, {}, slots)
        }

        const render = () => {
          if (!isValid(props.name)) return renderProperties()
          if (fieldSchemaRef.value.type === 'object') {
            if (props.onlyRenderProperties) return renderProperties()
            const slots = getSlots()
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
                ...slots,
                default: ({ field }) => [renderProperties(field)],
              }
            )
          } else if (fieldSchemaRef.value.type === 'array') {
            const slots = getSlots()
            return h(
              ArrayField,
              {
                attrs: {
                  ...fieldProps,
                  name: props.name,
                  basePath: basePath,
                },
              },
              slots
            )
          } else if (fieldSchemaRef.value.type === 'void') {
            if (props.onlyRenderProperties) return renderProperties()
            const slots = getSlots()
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
                ...slots,
                default: ({ field }) => [renderProperties(field)],
              }
            )
          }

          const slots = getSlots()
          return h(
            Field,
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

        if (!fieldSchemaRef.value) return

        return render()
      }
    },
  }) as unknown as DefineComponent<IRecursionFieldProps>
)

export default RecursionField
