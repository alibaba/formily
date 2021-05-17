import { inject, provide, defineComponent, shallowRef, watch, DefineComponent } from 'vue-demi'
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

function isVueOptions(options: any) {
  if (!options) { return false }
  return typeof options.template === 'string' || typeof options.render === 'function' || typeof options.setup === 'function'
}

const RecursionField = observer(defineComponent<IRecursionFieldProps>({
  name: 'RecursionField',
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: {
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
  },
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


        const slots = {
          default: () => [...children]
        }

        const xContent = fieldSchemaRef.value['x-content']
        
        if (typeof xContent === 'string') {
          slots['default'] = () => [...children, xContent]
        } else if (isVueOptions(xContent) || typeof xContent === 'function') {
          slots['default'] = () => [...children, h(xContent, {}, {})]
        } else if (xContent && typeof xContent === 'object') {
          Object.keys(xContent).forEach(key => {
            const child = xContent[key]
            if (key === 'default') {
              if (typeof child === 'string') {
                slots[key] = () => [...children, child]
              } else if (isVueOptions(child) || typeof child === 'function') {
                slots[key] = () => [...children, h(child, {}, {})]
              }
            }
            if (typeof child === 'string') {
              slots[key] = () => [child]
            } else if (isVueOptions(child) || typeof child === 'function') {
              slots[key] = () => [h(child, {}, {})]
            }
          })
        }

        return h(Fragment, {}, slots)
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

        const slots = {}

        const xContent = fieldSchemaRef.value['x-content']
        
        if (typeof xContent === 'string') {
          slots['default'] = () => [xContent]
        } else if (isVueOptions(xContent) || typeof xContent === 'function') { // is vue component or functional component
          slots['default'] = () => [h(xContent, {}, {})]
        } else if (xContent && typeof xContent === 'object') { // for named slots
          Object.keys(xContent).forEach(key => {
          const child = xContent[key]
          if (typeof child === 'string') {
              slots[key] = () => [child]
            } else if (isVueOptions(child) || typeof child === 'function') {
              slots[key] = () => [h(child, {}, {})]
            }
          })
        }

        return h(Field, {
          attrs: {
            ...fieldProps,
            name: props.name,
            basePath: basePath
          }
        }, slots)
      }

      if (!fieldSchemaRef.value) return ;

      return render()
    }
  }
}) as unknown as DefineComponent<IRecursionFieldProps>)

export default RecursionField
