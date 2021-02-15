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
import { defineObservableComponent } from '../utils/define-observable-component'
import { h } from '../utils/compatible-create-element'
import { resolveSchemaProps } from '../utils/resolve-schema-props'

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
  readOnly: Boolean,
  writeOnly: Boolean,
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
  uniqueItems: Boolean,
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
  xVisible: Boolean,
  xHidden: Boolean,
  xDisabled: Boolean,
  xEditable: Boolean,
  xReadOnly: Boolean,
  xReadPretty: Boolean,
}

export function createSchemaField<Components extends SchemaComponents>(
  options: ISchemaFieldFactoryOptions<Components>
) {
  const SchemaField = defineObservableComponent({
    name: 'SchemaField',
    props: {
      schema: {
        type: Object,
      },
      scope: {},
      name: [String, Number],
      basePath: {},
      title: {},
      description: {},
      value: {},
      initialValue: {},
      decorator: Array,
      component: Array,
      required: Boolean,
      display: String,
      pattern: String,
      validateFirst: Boolean,
      validator: {},
      reactions: Array,
      hidden: Boolean,
      visible: Boolean,
      editable: Boolean,
      disabled: Boolean,
      readOnly: Boolean,
      readPretty: Boolean,
      dataSource: {},
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

        return h('div', {}, {
          default: () => {
            const children = []
            if (slots.default) {
              children.push(slots.default())
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

      if (!parent) return () => { /* empty */ };

      if (parent.type === 'object' || parent.type === 'void') {
        const schema = parent.addProperty(name, resolveSchemaProps(props))
        provide(SchemaMarkupSymbol, schema)
        return () => slots.default && slots.default()
      } else if (parent.type === 'array') {
        const schema = appendArraySchema(resolveSchemaProps(props))
        provide(SchemaMarkupSymbol, Array.isArray(schema) ? schema[0] : schema)
        return () => slots.default && slots.default()
      } else {
        return () => slots.default && slots.default()
      }
    }
  })

  const StringField = defineObservableComponent({
    name: 'StringField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'string'
        } 
      }, {})
    }
  })

  const ObjectField = defineObservableComponent({
    name: 'ObjectField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'object'
        } 
      }, {})
    }
  })

  const ArrayField = defineObservableComponent({
    name: 'ArrayField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'array'
        } 
      }, {})
    }
  })

  const BooleanField = defineObservableComponent({
    name: 'BooleanField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'boolean'
        } 
      }, {})
    }
  })

  const NumberField = defineObservableComponent({
    name: 'NumberField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'number'
        } 
      }, {})
    }
  })

  const DateField = defineObservableComponent({
    name: 'DateField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'date'
        } 
      }, {})
    }
  })

  const DateTimeField = defineObservableComponent({
    name: 'DateTimeField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'datetime'
        } 
      }, {})
    }
  })

  const VoidField = defineObservableComponent({
    name: 'VoidField',
    props: Object.assign({}, markupProps),
    setup<
      Decorator extends ComponentPath<Components>,
      Component extends ComponentPath<Components>
    >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
      return () => h(MarkupField, { 
        attrs: {
          ...props,
          type: 'void'
        } 
      }, {})
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
