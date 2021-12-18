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

const markupProps = [
  'version',
  'name',
  'title',
  'description',
  'default',
  'readOnly',
  'writeOnly',
  'enum',
  'const',
  'multipleOf',
  'maximum',
  'exclusiveMaximum',
  'minimum',
  'exclusiveMinimum',
  'maxLength',
  'minLength',
  'pattern',
  'maxItems',
  'minItems',
  'uniqueItems',
  'maxProperties',
  'minProperties',
  'required',
  'format',
  'properties',
  'items',
  'additionalItems',
  'patternProperties',
  'additionalProperties',
  'xIndex',
  'xPattern',
  'xDisplay',
  'xValidator',
  'xDecorator',
  'xDecoratorProps',
  'xComponent',
  'xComponentProps',
  'xReactions',
  'xContent',
  'xVisible',
  'xHidden',
  'xDisabled',
  'xEditable',
  'xReadOnly',
  'xReadPretty',
]

export function createSchemaField<
  Components extends SchemaVueComponents = SchemaVueComponents
>(options: ISchemaFieldVueFactoryOptions<Components>): SchemaFieldComponents {
  const SchemaField = defineComponent({
    name: 'SchemaField',
    inheritAttrs: false,
    props: [
      'schema',
      'components',
      'scope',
      'name',
      'basePath',
      'title',
      'description',
      'value',
      'initialValue',
      'required',
      'display',
      'pattern',
      'hidden',
      'visible',
      'editable',
      'disabled',
      'readOnly',
      'readPretty',
      'dataSource',
      'validateFirst',
      'validator',
      'decorator',
      'component',
      'reactions',
      'content',
      'data',
    ],
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
  })

  const MarkupField = defineComponent({
    name: 'MarkupField',
    props: [...markupProps, 'type'],
    setup(props: ISchemaMarkupFieldProps, { slots }) {
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
    return defineComponent({
      name: name,
      props: [...markupProps],
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
  } as SchemaFieldComponents
}
