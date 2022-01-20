import { inject, provide, computed, shallowRef, watch } from 'vue-demi'
import { ISchema, Schema, SchemaTypes } from '@formily/json-schema'
import { RecursionField } from '../components'
import {
  SchemaMarkupSymbol,
  SchemaExpressionScopeSymbol,
  SchemaOptionsSymbol,
} from '../shared'
import {
  ISchemaFieldVueFactoryOptions,
  SchemaVueComponents,
  ISchemaFieldProps,
  ISchemaMarkupFieldProps,
  ISchemaTypeFieldProps,
} from '../types'
import { resolveSchemaProps } from '../utils/resolveSchemaProps'
import { h } from '../shared/h'
import { Fragment } from '../shared/fragment'
import type { DefineComponent } from '../types'

type SchemaFieldComponents = {
  SchemaField: DefineComponent<ISchemaFieldProps>
  SchemaMarkupField: DefineComponent<ISchemaMarkupFieldProps>
  SchemaStringField: DefineComponent<ISchemaTypeFieldProps>
  SchemaObjectField: DefineComponent<ISchemaTypeFieldProps>
  SchemaArrayField: DefineComponent<ISchemaTypeFieldProps>
  SchemaBooleanField: DefineComponent<ISchemaTypeFieldProps>
  SchemaDateField: DefineComponent<ISchemaTypeFieldProps>
  SchemaDateTimeField: DefineComponent<ISchemaTypeFieldProps>
  SchemaVoidField: DefineComponent<ISchemaTypeFieldProps>
  SchemaNumberField: DefineComponent<ISchemaTypeFieldProps>
}

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
    default: undefined,
  },
  writeOnly: {
    type: Boolean,
    default: undefined,
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
    default: undefined,
  },
  maxProperties: Number,
  minProperties: Number,
  required: {
    type: [Boolean, Array, String],
    default: undefined,
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
    default: undefined,
  },
  xHidden: {
    type: Boolean,
    default: undefined,
  },
  xDisabled: {
    type: Boolean,
    default: undefined,
  },
  xEditable: {
    type: Boolean,
    default: undefined,
  },
  xReadOnly: {
    type: Boolean,
    default: undefined,
  },
  xReadPretty: {
    type: Boolean,
    default: undefined,
  },
}

export function createSchemaField<
  Components extends SchemaVueComponents = SchemaVueComponents
>(options: ISchemaFieldVueFactoryOptions<Components>): SchemaFieldComponents {
  const SchemaField = {
    name: 'SchemaField',
    inheritAttrs: false,
    props: {
      schema: {},
      scope: {},
      components: {},
      name: [String, Number],
      basePath: {},
      onlyRenderProperties: { type: Boolean, default: undefined },
      onlyRenderSelf: { type: Boolean, default: undefined },
      mapProperties: {},
      filterProperties: {},
    },
    setup(props: ISchemaFieldProps, { slots }) {
      const schemaRef = computed(() =>
        Schema.isSchemaInstance(props.schema)
          ? props.schema
          : new Schema({
              type: 'object',
              ...props.schema,
            })
      )

      const scopeRef = computed(() => ({
        ...options.scope,
        ...props.scope,
      }))

      const optionsRef = computed(() => ({
        ...options,
        components: {
          ...options.components,
          ...props.components,
        },
      }))

      provide(SchemaMarkupSymbol, schemaRef)
      provide(SchemaOptionsSymbol, optionsRef)
      provide(SchemaExpressionScopeSymbol, scopeRef)

      return () => {
        env.nonameId = 0

        return h(
          Fragment,
          {},
          {
            default: () => {
              const children = []
              if (slots.default) {
                children.push(
                  h(
                    'template',
                    {},
                    {
                      default: () => slots.default(),
                    }
                  )
                )
              }
              children.push(
                h(
                  RecursionField,
                  {
                    attrs: {
                      ...props,
                      schema: schemaRef.value,
                    },
                  },
                  {}
                )
              )
              return children
            },
          }
        )
      }
    },
  }

  const MarkupField = {
    name: 'MarkupField',
    props: {
      type: String,
      ...markupProps,
    },
    setup(props: ISchemaMarkupFieldProps, { slots }) {
      const parentRef = inject(SchemaMarkupSymbol, null)
      if (!parentRef || !parentRef.value) return () => h('template', {}, {})

      const name = props.name || getRandomName()
      const appendArraySchema = (schema: ISchema) => {
        if (parentRef.value.items) {
          return parentRef.value.addProperty(name, schema)
        } else {
          return parentRef.value.setItems(resolveSchemaProps(props))
        }
      }

      const schemaRef = shallowRef(null)

      watch(
        parentRef,
        () => {
          if (
            parentRef.value.type === 'object' ||
            parentRef.value.type === 'void'
          ) {
            schemaRef.value = parentRef.value.addProperty(
              name,
              resolveSchemaProps(props)
            )
          } else if (parentRef.value.type === 'array') {
            const schema = appendArraySchema(resolveSchemaProps(props))
            schemaRef.value = Array.isArray(schema) ? schema[0] : schema
          }
        },
        { immediate: true }
      )
      provide(SchemaMarkupSymbol, schemaRef)

      return () => {
        return h('div', { style: 'display: none;' }, slots)
      }
    },
  }

  const SchemaFieldFactory = (type: SchemaTypes, name: string) => {
    return {
      name: name,
      props: { ...markupProps },
      setup(props: ISchemaTypeFieldProps, { slots }) {
        return () =>
          h(
            MarkupField,
            {
              attrs: {
                ...props,
                type: type,
              },
            },
            slots
          )
      },
    }
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
  } as unknown as SchemaFieldComponents
}
