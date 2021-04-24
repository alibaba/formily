import { inject, provide, defineComponent, shallowRef, watch } from 'vue-demi'
import { isFn, isValid } from '@formily/shared'
import { Schema } from '@formily/json-schema'
import { observer } from '@formily/reactive-vue'
import {
  SchemaSymbol,
  SchemaOptionsSymbol,
  SchemaExpressionScopeSymbol,
} from '../shared'
import { IRecursionFieldProps } from '../types'
import { useField } from '../hooks'
import ObjectField from './ObjectField'
import ArrayField from './ArrayField'
import Field from './Field'
import VoidField from './VoidField'
import { h } from '../shared/h'
import { Fragment } from '../shared/fragment'

const RecursionField = observer<IRecursionFieldProps>(defineComponent<IRecursionFieldProps>({
  name: 'RecursionField',
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ({
    schema: {
      required: true
    },
    name: [String, Number],
    basePath: {},
    onlyRenderProperties: {
      type: Boolean,
      default: undefined
    },
    onlyRenderSelf: {
      type: Boolean,
      default: undefined
    },
    mapProperties: {},
    filterProperties: {},
  } as any),
  setup(props: IRecursionFieldProps) {
    // const { track } = useObserver()
    const parentRef = useField()
    const options = inject(SchemaOptionsSymbol)
    const scope = inject(SchemaExpressionScopeSymbol)
    const createSchema = (schemaProp: IRecursionFieldProps['schema']) => new Schema(schemaProp)
    const createFieldSchema = (schema: Schema) => schema.compile?.({
      ...options.scope,
      ...scope,
    })
    const schemaRef = shallowRef(createSchema(props.schema))
    const fieldSchemaRef = shallowRef(createFieldSchema(schemaRef.value))
    watch(() => props.schema, () => {
      schemaRef.value = createSchema(props.schema)
      fieldSchemaRef.value = createFieldSchema(schemaRef.value)
    })

    const getBasePath = () => {
      if (props.onlyRenderProperties) {
        return props.basePath || parentRef?.value?.address?.concat(props.name)
      }
      return props.basePath || parentRef?.value?.address
    }

    provide(SchemaSymbol, fieldSchemaRef)

    return () => {
      
      const basePath = getBasePath()

      const fieldProps = schemaRef.value?.toFieldProps?.(options) as any
      const renderProperties = (field?: Formily.Core.Types.GeneralField) => {
        if (props.onlyRenderSelf) return
        
        const children = fieldSchemaRef.value.mapProperties((item, name, index) => {
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
          return h(RecursionField, {
            key: index,
            attrs: {
              schema,
              name,
              basePath: base
            }
          }, {})
        })

        const content = typeof fieldSchemaRef.value['x-content'] === 'object' ? h(fieldSchemaRef.value['x-content'], {}, {}) : fieldSchemaRef.value['x-content']

        return h(Fragment, {}, {
          default: () => [...children, content]
        })
      }

      const render = () => {
        if (!isValid(props.name)) return renderProperties()
        if (fieldSchemaRef.value.type === 'object') {
          if (props.onlyRenderProperties) return renderProperties()
          return h(ObjectField, {
            attrs: {
              ...fieldProps,
              name: props.name,
              basePath: basePath
            }
          }, {
            default: ({ field }) => [renderProperties(field)]
          })
        } else if (fieldSchemaRef.value.type === 'array') {
          return h(ArrayField, {
            attrs: {
              ...fieldProps,
              name: props.name,
              basePath: basePath
            }
          }, {})
        } else if (fieldSchemaRef.value.type === 'void') {
          if (props.onlyRenderProperties) return renderProperties()
          return h(VoidField, {
            attrs: {
              ...fieldProps,
              name: props.name,
              basePath: basePath
            }
          }, {
            default: ({ field }) => [renderProperties(field)]
          })
        }

        const content = typeof fieldSchemaRef.value['x-content'] === 'object' ? h(fieldSchemaRef.value['x-content'], {}, {}) : fieldSchemaRef.value['x-content']

        return h(Field, {
          attrs: {
            ...fieldProps,
            name: props.name,
            basePath: basePath
          }
        }, {
          default: () => [content]
        })
      }

      if (!fieldSchemaRef.value) return ;

      return render()
    }
  }
}))

export default RecursionField
