import {
  inject,
  provide,
  defineComponent,
  computed,
  shallowRef,
  watch,
} from 'vue-demi'
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

export function createSchemaField<
  Components extends SchemaVueComponents = SchemaVueComponents
>(options: ISchemaFieldVueFactoryOptions<Components>): SchemaFieldComponents {
  const SchemaField = defineComponent<
    ISchemaFieldProps<VueComponent, VueComponent>
  >({
    name: 'SchemaField',
    inheritAttrs: false,
    props: {
      schema: {},
      scope: {},
      components: {},
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
        default: undefined,
      },
      validateFirst: {
        type: Boolean,
        default: undefined,
      },
      hidden: {
        type: Boolean,
        default: undefined,
      },
      visible: {
        type: Boolean,
        default: undefined,
      },
      editable: {
        type: Boolean,
        default: undefined,
      },
      disabled: {
        type: Boolean,
        default: undefined,
      },
      readOnly: {
        type: Boolean,
        default: undefined,
      },
      readPretty: {
        type: Boolean,
        default: undefined,
      },
    },
    setup(props: ISchemaFieldProps<VueComponent, VueComponent>, { slots }) {
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
  })

  const MarkupField = defineComponent<
    ISchemaMarkupFieldProps<
      Components,
      ComponentPath<Components>,
      ComponentPath<Components>
    >
  >({
    name: 'MarkupField',
    props: Object.assign({}, markupProps, { type: String }),
    setup(props, { slots }) {
      const parentRef = inject(SchemaMarkupSymbol, null)
      if (!parentRef || !parentRef.value) return () => h(Fragment, {}, {})
      const resolvedProps = resolveSchemaProps(props)

      const name = props.name || getRandomName()
      const appendArraySchema = (schema: ISchema) => {
        if (parentRef.value.items) {
          return parentRef.value.addProperty(name, schema)
        } else {
          return parentRef.value.setItems(resolvedProps)
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
            schemaRef.value = parentRef.value.addProperty(name, resolvedProps)
          } else if (parentRef.value.type === 'array') {
            const schema = appendArraySchema(resolvedProps)
            schemaRef.value = Array.isArray(schema) ? schema[0] : schema
          }
        },
        { immediate: true }
      )
      provide(SchemaMarkupSymbol, schemaRef)

      return () => {
        const children: Record<string, () => any> = {}
        if (slots.default) {
          children.default = () => slots.default()
        }
        return h(Fragment, {}, children)
      }
    },
  })

  const SchemaFieldFactory = (type: SchemaTypes, name: string) => {
    return defineComponent<
      ISchemaMarkupFieldProps<
        Components,
        ComponentPath<Components>,
        ComponentPath<Components>
      >
    >({
      name: name,
      props: Object.assign({}, markupProps),
      setup(
        props: ISchemaMarkupFieldProps<
          Components,
          ComponentPath<Components>,
          ComponentPath<Components>
        >,
        { slots }
      ) {
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
