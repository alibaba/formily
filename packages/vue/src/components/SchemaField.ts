import { inject, provide, defineComponent, shallowRef, watch } from 'vue-demi'
import type { DefineComponent } from 'vue-demi'
import { ISchema, Schema, SchemaTypes } from '@formily/json-schema'
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
  required: {
    type: [Boolean, Array, String],
    default: undefined
  },
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

type SchemaFieldComponents<Components extends SchemaComponents> = {
  SchemaField: DefineComponent<ISchemaFieldProps<VueComponent, VueComponent>>,
  SchemaMarkupField: DefineComponent<ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>>,
  SchemaStringField: DefineComponent<ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>>,
  SchemaObjectField: DefineComponent<ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>>,
  SchemaArrayField: DefineComponent<ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>>,
  SchemaBooleanField: DefineComponent<ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>>,
  SchemaDateField: DefineComponent<ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>>,
  SchemaDateTimeField: DefineComponent<ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>>,
  SchemaVoidField: DefineComponent<ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>>,
  SchemaNumberField: DefineComponent<ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>>,
}

export function createSchemaField<Components extends SchemaComponents = SchemaComponents>(
  options: ISchemaFieldFactoryOptions<Components>
): SchemaFieldComponents<Components> {
  const SchemaField = defineComponent<ISchemaFieldProps<VueComponent, VueComponent>>({
    name: 'SchemaField',
    inheritAttrs: false,
    props: ({
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
    } as any),
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

  const MarkupField = defineComponent<ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>>({
    name: 'MarkupField',
    props: Object.assign({}, markupProps, { type: String }) as any,
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

  const SchemaFieldFactory = (type: SchemaTypes, name: string) => {
    return defineComponent<ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>>({
      name: name,
      props: Object.assign({}, markupProps) as any,
      setup (props: ISchemaMarkupFieldProps<Components, ComponentPath<Components>, ComponentPath<Components>>, { slots }) {
        return () => h(MarkupField, { 
          attrs: {
            ...props,
            type: type
          } 
        }, slots)
      }
    })
  }

  return {
    SchemaField,
    SchemaMarkupField: MarkupField,
    SchemaStringField: SchemaFieldFactory('string', 'SchemaStringField'),
    SchemaObjectField: SchemaFieldFactory('object', 'SchemaObjectField'),
    SchemaArrayField: SchemaFieldFactory('array', 'SchemaArrayField'),
    SchemaBooleanField: SchemaFieldFactory('boolean', 'SchemaBooleanField'),
    SchemaDateField: SchemaFieldFactory('date', 'SchemaDateField'),
    SchemaDateTimeField: SchemaFieldFactory('datetime', 'SchemaDatetimeField'),
    SchemaVoidField: SchemaFieldFactory('void', 'SchemaVoidField'),
    SchemaNumberField: SchemaFieldFactory('number', 'SchemaNumberField'),
  } as any
}
