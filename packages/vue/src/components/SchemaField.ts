import { inject, provide } from 'vue-demi'
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
  ISchemaTypeFieldProps,
} from '../types'
import { defineObservableComponent } from '../shared/define-observable-component'
import { h } from '../shared/compatible-create-element'
import { resolveSchemaProps } from '../utils/resolve-schema-props'
import { Fragment } from '../shared/fragment-hack'

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
  const SchemaField = defineObservableComponent({
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
    setup<
      Decorator extends VueComponent,
      Component extends VueComponent
    >(props: ISchemaFieldProps<Decorator, Component>, { slots }) {
      const schema = Schema.isSchemaInstance(props.schema)
        ? props.schema
        : new Schema({
            type: 'object',
            ...props.schema,
          })
      provide(SchemaMarkupSymbol, schema)
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
                schema
              }
            }, {}))
            return children
          }
        })
      }
    }
  })

  const MarkupField = defineObservableComponent({
    name: 'MarkupField',
    props: Object.assign({}, markupProps, { type: String }),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaMarkupFieldProps<Components, Component, Decorator>, { slots }) {
      const parent = inject(SchemaMarkupSymbol)
      const name = props.name || getRandomName()
      const appendArraySchema = (schema: ISchema) => {
        if (parent.items) {
          return parent.addProperty(name, schema)
        } else {
          return parent.setItems(resolveSchemaProps(props))
        }
      }

      if (!parent) return () => h(Fragment, {}, {})

      const renderChildren = () => h(Fragment, {}, {
        default: () => slots.default && slots.default()
      })

      if (parent.type === 'object' || parent.type === 'void') {
        const schema = parent.addProperty(name, resolveSchemaProps(props))
        provide(SchemaMarkupSymbol, schema)
        return renderChildren
      } else if (parent.type === 'array') {
        const schema = appendArraySchema(resolveSchemaProps(props))
        provide(SchemaMarkupSymbol, Array.isArray(schema) ? schema[0] : schema)
        return renderChildren
      } else {
        return renderChildren
      }
    }
  })

  const StringField = defineObservableComponent({
    name: 'StringField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'string'
        } 
      }, slots)
    }
  })

  const ObjectField = defineObservableComponent({
    name: 'ObjectField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'object'
        } 
      }, slots)
    }
  })

  const ArrayField = defineObservableComponent({
    name: 'ArrayField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'array'
        } 
      }, slots)
    }
  })

  const BooleanField = defineObservableComponent({
    name: 'BooleanField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'boolean'
        } 
      }, slots)
    }
  })

  const NumberField = defineObservableComponent({
    name: 'NumberField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'number'
        } 
      }, slots)
    }
  })

  const DateField = defineObservableComponent({
    name: 'DateField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'date'
        } 
      }, slots)
    }
  })

  const DateTimeField = defineObservableComponent({
    name: 'DateTimeField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>, { slots }) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'datetime'
        } 
      }, slots)
    }
  })

  const VoidField = defineObservableComponent({
    name: 'VoidField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>, { slots }) {
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
