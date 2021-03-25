import { inject, provide, defineComponent, shallowRef, watch } from 'vue-demi'
import { ISchema, Schema } from '@formily/json-schema'
import { RecursionField } from '../components'
import {
  SchemaMarkupSymbol,
  SchemaExpressionScopeSymbol,
  SchemaOptionsSymbol,
} from '../shared'
import {
  ComponentPath,
  VueComponent,
  ISchemaFieldFactoryOptions,
  SchemaComponents,
  ISchemaFieldProps,
  ISchemaMarkupFieldProps,
} from '../types'
import { resolveSchemaProps } from '../utils/resolveSchemaProps'
import { h } from '../shared/h'
import { Fragment } from '../shared/fragment'

const env = {
  nonameId: 0,
}

const getRandomName = () => {
  return `NO_NAME_FIELD_$${env.nonameId++}`
}

const markupProps = {
  version: String,
  name: [String, Number],
  title: {},
  description: {},
  default: {},
  readOnly: {
    type: Boolean,
    default: undefined
  },
  writeOnly: {
    type: Boolean,
    default: undefined
  },
  enum: {},
  const: {},
  multipleOf: Number,
  maximum: Number,
  exclusiveMaximum: Number,
  minimum: Number,
  exclusiveMinimum: Number,
  maxLength: Number,
  minLength: Number,
  pattern: {},
  maxItems: Number,
  minItems: Number,
  uniqueItems: {
    type: Boolean,
    default: undefined
  },
  maxProperties: Number,
  minProperties: Number,
  required: [Array, String, Boolean],
  format: String,
  properties: {},
  items: {},
  additionalItems: {},
  patternProperties: {},
  additionalProperties: {},
  xIndex: Number,
  xPattern: {},
  xDisplay: {},
  xValidator: {},
  xDecorator: {},
  xDecoratorProps: {},
  xComponent: {},
  xComponentProps: {},
  xReactions: {},
  xContent: {},
  xVisible: {
    type: Boolean,
    default: undefined
  },
  xHidden: {
    type: Boolean,
    default: undefined
  },
  xDisabled: {
    type: Boolean,
    default: undefined
  },
  xEditable: {
    type: Boolean,
    default: undefined
  },
  xReadOnly: {
    type: Boolean,
    default: undefined
  },
  xReadPretty: {
    type: Boolean,
    default: undefined
  },
}

export function createSchemaField<Components extends SchemaComponents>(
  options: ISchemaFieldFactoryOptions<Components>
) {
  const SchemaField = defineComponent({
    name: 'SchemaField',
    props: {
      schema: {},
      scope: {},
      basePath: {},
      title: {},
      description: {},
      value: {},
      initialValue: {},
      validator: {},
      dataSource: {},
      name: [String, Number],
      decorator: Array,
      component: Array,
      reactions: Array,
      display: String,
      pattern: String,
      required: {
        type: Boolean,
        default: undefined
      },
      validateFirst: {
        type: Boolean,
        default: undefined
      },
      hidden: {
        type: Boolean,
        default: undefined
      },
      visible: {
        type: Boolean,
        default: undefined
      },
      editable: {
        type: Boolean,
        default: undefined
      },
      disabled: {
        type: Boolean,
        default: undefined
      },
      readOnly: {
        type: Boolean,
        default: undefined
      },
      readPretty: {
        type: Boolean,
        default: undefined
      },
    },
    setup(props: ISchemaFieldProps<VueComponent, VueComponent>, { slots }) {
      const createSchema = (schemaProp: ISchemaFieldProps<VueComponent, VueComponent>['schema']) => Schema.isSchemaInstance(schemaProp)
        ? schemaProp
        : new Schema({
            type: 'object',
            ...schemaProp,
          })
      const schemaRef = shallowRef(createSchema(props.schema))
      watch(() => props.schema, () => {
        schemaRef.value = createSchema(props.schema)
      })
      provide(SchemaMarkupSymbol, schemaRef)
      provide(SchemaOptionsSymbol, options)
      provide(SchemaExpressionScopeSymbol, props.scope)

      return () => {
        env.nonameId = 0

        return h(Fragment, {}, {
          default: () => {
            const children = []
            if (slots.default) {
              children.push(h('template', {}, {
                default: () => slots.default()
              }))
            }
            children.push(h(RecursionField, {
              attrs: {
                ...props,
                schema: schemaRef.value
              }
            }, {}))
            return children
          }
        })
      }
    }
  })

  const MarkupField = defineComponent({
    name: 'MarkupField',
    props: Object.assign({}, markupProps, { type: String }),
    setup (props: ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>, { slots }) {
      const parentRef = inject(SchemaMarkupSymbol, null)
      if (!parentRef || !parentRef.value) return () => h(Fragment, {}, {})

      const name = props.name || getRandomName()
      const appendArraySchema = (schema: ISchema) => {
        if (parentRef.value.items) {
          return parentRef.value.addProperty(name, schema)
        } else {
          return parentRef.value.setItems(resolveSchemaProps(props))
        }
      }

      const schemaRef = shallowRef(null)
      
      watch(parentRef, () => {
        if (parentRef.value.type === 'object' || parentRef.value.type === 'void') {
          schemaRef.value = parentRef.value.addProperty(name, resolveSchemaProps(props))
        } else if (parentRef.value.type === 'array') {
          const schema = appendArraySchema(resolveSchemaProps(props))
          schemaRef.value = Array.isArray(schema) ? schema[0] : schema
        }
      }, { immediate: true })
      provide(SchemaMarkupSymbol, schemaRef)
      
      return () => h(Fragment, {}, {
        default: () => slots.default && slots.default()
      })
    }
  })

  const StringField = defineComponent({
    name: 'StringField',
    props: Object.assign({}, markupProps),
    setup (props: ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'string'
        } 
      }, slots)
    }
  })

  const ObjectField = defineComponent({
    name: 'ObjectField',
    props: Object.assign({}, markupProps),
    setup (props: ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'object'
        } 
      }, slots)
    }
  })

  const ArrayField = defineComponent({
    name: 'ArrayField',
    props: Object.assign({}, markupProps),
    setup (props: ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'array'
        } 
      }, slots)
    }
  })

  const BooleanField = defineComponent({
    name: 'BooleanField',
    props: Object.assign({}, markupProps),
    setup (props: ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'boolean'
        } 
      }, slots)
    }
  })

  const NumberField = defineComponent({
    name: 'NumberField',
    props: Object.assign({}, markupProps),
    setup (props: ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'number'
        } 
      }, slots)
    }
  })

  const DateField = defineComponent({
    name: 'DateField',
    props: Object.assign({}, markupProps),
    setup (props: ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'date'
        } 
      }, slots)
    }
  })

  const DateTimeField = defineComponent({
    name: 'DateTimeField',
    props: Object.assign({}, markupProps),
    setup (props: ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'datetime'
        } 
      }, slots)
    }
  })

  const VoidField = defineComponent({
    name: 'VoidField',
    props: Object.assign({}, markupProps),
    setup (props: ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'void'
        } 
      }, slots)
    }
  })

  return {
    SchemaField,
    SchemaMarkupField: MarkupField,
    SchemaStringField: StringField,
    SchemaObjectField: ObjectField,
    SchemaArrayField: ArrayField,
    SchemaBooleanField: BooleanField,
    SchemaDateField: DateField,
    SchemaDateTimeField: DateTimeField,
    SchemaVoidField: VoidField,
    SchemaNumberField: NumberField,
  }
}
