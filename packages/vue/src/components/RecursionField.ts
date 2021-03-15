import { inject, provide } from 'vue-demi'
import { isFn, isValid } from '@formily/shared'
import { Schema } from '@formily/json-schema'
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
import { defineObservableComponent } from '../shared/define-observable-component'
import { h } from '../shared/compatible-create-element'
import { Fragment } from '../shared/fragment-hack'

const RecursionField = defineObservableComponent({
  name: 'RecursionField',
  // eslint-disable-next-line vue/require-prop-types
  props: {
    schema: {
      type: Object,
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
    mapProperties: {
      type: Object
    },
    filterProperties: {
      type: Object
    },
  },
  setup(props: IRecursionFieldProps) {
    const parent = useField()
    const options = inject(SchemaOptionsSymbol)
    const scope = inject(SchemaExpressionScopeSymbol)
    const schema = new Schema(props.schema)
    const fieldSchema = schema.compile?.({
      ...options.scope,
      ...scope,
    })
    const fieldProps = schema?.toFieldProps?.(options) as any
    const getBasePath = () => {
      if (props.onlyRenderProperties) {
        return props.basePath || parent?.address?.concat(props.name)
      }
      return props.basePath || parent?.address
    }
    const basePath = getBasePath()

    provide(SchemaSymbol, fieldSchema)

    return () => {
      const renderProperties = (field?: Formily.Core.Types.GeneralField) => {
        if (props.onlyRenderSelf) return

        const children = fieldSchema.mapProperties((item, name, index) => {
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

        const content = typeof fieldSchema['x-content'] === 'object' ? h(fieldSchema['x-content'], {}, {}) : fieldSchema['x-content']

        return h(Fragment, {}, {
          default: () => [...children, content]
        })
      }

      const render = () => {
        if (!isValid(props.name)) return renderProperties()
        if (fieldSchema.type === 'object') {
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
        } else if (fieldSchema.type === 'array') {
          return h(ArrayField, {
            attrs: {
              ...fieldProps,
              name: props.name,
              basePath: basePath
            }
          }, {})
        } else if (fieldSchema.type === 'void') {
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

        const content = typeof fieldSchema['x-content'] === 'object' ? h(fieldSchema['x-content'], {}, {}) : fieldSchema['x-content']

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

      if (!fieldSchema) return ;

      return render()
    }
  }
})

export default RecursionField
